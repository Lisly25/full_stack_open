import {
  ALL_BOOKS_DETAILED,
  GET_ALL_GENRES,
  FILTER_BOOKS_BY_GENRE,
} from "../queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const Books = (props) => {
  const booksDetailed = useQuery(ALL_BOOKS_DETAILED);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const bookGenres = useQuery(GET_ALL_GENRES);
  const filteredBooks = useQuery(FILTER_BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre },
  });

  if (!props.show) {
    return null;
  } else if (bookGenres.loading || filteredBooks.loading) {
    return <div>Loading books...</div>;
  } else {
    const genres = bookGenres.data.allGenres;
    let books = booksDetailed.data.allBooks;

    if (selectedGenre === null) {
      books = booksDetailed.data.allBooks;
    } else {
      books = filteredBooks.data.allBooks;
    }

    return (
      <div>
        <h2>books</h2>
        {!selectedGenre && <h3>of all genres</h3>}
        {selectedGenre && (
          <h3>
            in genre <i>{selectedGenre}</i>
          </h3>
        )}

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {genres.map((genre) => (
            <button
              type="button"
              key={genre}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
          <button type="button" onClick={() => setSelectedGenre(null)}>
            all genres
          </button>
        </div>
      </div>
    );
  }
};

export default Books;
