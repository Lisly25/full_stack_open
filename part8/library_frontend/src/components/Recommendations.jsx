import { FAVORITE_GENRE_BOOKS, FAVORITE_GENRE } from "../queries";
import { useQuery } from "@apollo/client";

const Recommendations = ({ show }) => {
  const favoriteGenreBooks = useQuery(FAVORITE_GENRE_BOOKS);
  const favGenre = useQuery(FAVORITE_GENRE);

  if (!show) {
    return null;
  } else if (favoriteGenreBooks.loading || favGenre.loading) {
    return <div>recommendations loading...</div>;
  } else {
    return (
      <div>
        <h2>
          Book recommendations based on your favorite genre{" "}
          {favGenre.data.favoriteGenre}
        </h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {favoriteGenreBooks.data.favoriteGenreBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Recommendations;
