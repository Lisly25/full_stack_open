const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");

const { GraphQLError } = require("graphql");
//const { v1: uuid } = require("uuid");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

/* let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]; */

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

/* let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
]; */

// First version of the resolver for the initial exercises where the database existed only in memory

/* const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (args.author && !args.genre) {
        const booksByAuthor = books.filter(
          (book) => book.author === args.author
        );
        return booksByAuthor;
      } else if (args.genre && !args.author) {
        const booksByGenre = books.filter((book) =>
          book.genres.includes(args.genre)
        );
        return booksByGenre;
      } else if (args.genre && args.author) {
        const booksByGenreAndAuthor = books.filter(
          (book) =>
            book.genres.includes(args.genre) && book.author === args.author
        );
        return booksByGenreAndAuthor;
      } else {
        console.log("allBooks called without args");
        return books;
      }
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (root) => {
      const booksWritten = books.filter((book) => book.author === root.name);
      return booksWritten.length;
    },
  },
  Mutation: {
    addBook: (root, args) => {
      if (!authors.find((a) => a.name === args.author)) {
        authors = authors.concat({ name: args.author, id: uuid() });
      }
      const book = { ...args, id: uuid() };
      books = books.concat(book);
      return book;
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name);
      if (!author) {
        return null;
      }

      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((a) =>
        a.name === updatedAuthor.name ? updatedAuthor : a
      );
      return updatedAuthor;
    },
  },
}; */

// Second version of database that uses MongoDB

const addAuthorHelper = async (args) => {
  let author = await Author.findOne({ name: args.author });
  const newAuthor = new Author({ name: args.author });
  if (!author) {
    try {
      await newAuthor.save();
      author = newAuthor;
    } catch (error) {
      throw new GraphQLError(
        "Adding new book failed to author data being invalid",
        {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
            error,
          },
        }
      );
    }
  }
  return author;
};

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && !args.genre) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          return null;
        }
        return Book.find({ author: author._id }).populate("author", {
          name: 1,
        });
      } else if (args.genre && !args.author) {
        return Book.find({ genres: args.genre }).populate("author", {
          name: 1,
        });
      } else if (args.genre && args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          return null;
        }
        return Book.find({ author: author._id, genres: args.genre }).populate(
          "author",
          {
            name: 1,
          }
        );
      } else {
        return Book.find({}).populate("author", { name: 1 });
      }
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: async (root, args, context) => {
      return context.currentUser;
    },
    allGenres: async () => {
      const books = await Book.find({});
      const genres = books.map((book) => book.genres);
      const bookGenresFinal = _.union(...genres);
      return bookGenresFinal;
    },
    favoriteGenreBooks: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError(
          "Need to be logged in to receive book recommendations",
          {
            extensions: {
              code: "UNAUTHORIZED",
            },
          }
        );
      }
      const genre = context.currentUser.favoriteGenre;
      return Book.find({ genres: genre }).populate("author", {
        name: 1,
      });
    },
    favoriteGenre: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError(
          "Need to be logged in to retrieve favorite genre info",
          {
            extensions: {
              code: "UNAUTHORIZED",
            },
          }
        );
      }
      return context.currentUser.favoriteGenre;
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id });
      return books.length;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Need to be logged in to add book", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      const author = await addAuthorHelper(args);
      const book = new Book({
        author: author,
        title: args.title,
        published: args.published,
        genres: args.genres,
      });
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Adding new book failed due to invalid data", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Need to be logged in to edit author data", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        throw new GraphQLError("Cannot edit author - author not in database", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Editing author birth date failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.setBornTo,
            error,
          },
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
