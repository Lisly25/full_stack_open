import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const ALL_BOOKS_DETAILED = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const UPDATE_BIRTHYEAR = gql`
  mutation updateBirthyear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
      id
    }
  }
`;

export const LOGIN = gql`
  mutation login_user($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const FILTER_BOOKS_BY_GENRE = gql`
  query filter_book_by_genre($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
    }
  }
`;

export const GET_ALL_GENRES = gql`
  query {
    allGenres
  }
`;

export const FAVORITE_GENRE_BOOKS = gql`
  query {
    favoriteGenreBooks {
      title
      published
      author {
        name
      }
    }
  }
`;

export const FAVORITE_GENRE = gql`
  query {
    favoriteGenre
  }
`;
