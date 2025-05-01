import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

const SetAuthorBirthYear = ({ authors }) => {
  // const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const [updateBirthYear, result] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log("Failed to update author birthyear");
      setError("Failed to update author birthyear");
      setTimeout(() => setError(""), 5000);
    }
  }, [result.data]);

  // This is for the exercise 8.11 version
  //
  // const handleYearUpdate = async (event) => {
  //   event.preventDefault();

  //   updateBirthYear({
  //     variables: { name, setBornTo: Number(year) },
  //   });

  //   setName("");
  //   setYear("");
  // };

  const handleYearUpdate = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    updateBirthYear({
      variables: { name: formJson.selectedAuthor, setBornTo: Number(year) },
    });

    setYear("");
  };

  const errorStyle = {
    color: "red",
    padding: 10,
  };

  // This is the exercise 8.11 version:
  //
  // return (
  //   <div>
  //     <div style={errorStyle}>{error}</div>
  //     <h3>Set birthyear</h3>
  //     <form onSubmit={handleYearUpdate}>
  //       <div>
  //         name
  //         <input
  //           value={name}
  //           onChange={({ target }) => setName(target.value)}
  //         />
  //       </div>
  //       <div>
  //         born
  //         <input
  //           type="number"
  //           value={year}
  //           onChange={({ target }) => setYear(target.value)}
  //         />
  //       </div>
  //       <button type="submit">update author</button>
  //     </form>
  //   </div>
  // );

  return (
    <div>
      <h3>Set birthyear</h3>
      <div style={errorStyle}>{error}</div>
      <form onSubmit={handleYearUpdate}>
        <label>
          Select an author:
          <select name="selectedAuthor">
            {authors.data.allAuthors.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <div>
          born
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  } else if (authors.loading) {
    return <div>Loading authors...</div>;
  } else {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <SetAuthorBirthYear authors={authors} />
      </div>
    );
  }
};

export default Authors;
