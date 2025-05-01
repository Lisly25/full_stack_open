import { ALL_BOOKS_DETAILED } from "../queries";
import { useQuery } from "@apollo/client";

const Books = (props) => {
  const booksDetailed = useQuery(ALL_BOOKS_DETAILED);
  console.log(booksDetailed);

  if (!props.show) {
    return null;
  } else if (booksDetailed.loading) {
    return <div>Loading books...</div>;
  } else {
    const books = booksDetailed.data.allBooks;
    console.log("Books:", books);

    return (
      <div>
        <h2>books</h2>

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
      </div>
    );
  }
};

export default Books;
