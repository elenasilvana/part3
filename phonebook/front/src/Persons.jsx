export const PersonsTable = ({ personsList, handleDelete }) => {
  const renderPersons = () => {
    return personsList.map((person) => (
      <tr style={{ color: "#93cccf" }} key={person.name}>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td>
          <button onClick={() => handleDelete(person._id)}>Delete</button>
        </td>
      </tr>
    ));
  };

  return (
    <table style={{ padding: 10, maxWidth: 600 }}>
      <thead>
        <tr style={{ color: "#86c6c9" }}>
          <th>Name</th>
          <th>Number</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{renderPersons()}</tbody>
    </table>
  );
};
