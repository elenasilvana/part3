import "./PersonForm.css";

export const PersonForm = ({
  handleSubmit,
  newName,
  handleNameChange,
  newPhone,
  handlePhoneChange,
  personsList,
  handleCancel,
}) => {
  const isPersonExistent = () => {
    if (newName && personsList.length) {
      return personsList.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      );
    }
  };

  const isInvalidPhone = () =>
    newPhone && newPhone.length > 8 && newPhone.length > 10;

  return (
    <>
      <h2>Add new</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div className="form-fields">
          Phone:
          <input
            style={{ border: isInvalidPhone() ? "2px solid red" : "" }}
            value={newPhone}
            onChange={handlePhoneChange}
          />
        </div>
        <div className="form-fields">
          <button
            disabled={!newName || !newPhone || isInvalidPhone()}
            type="submit"
          >
            add
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
};
