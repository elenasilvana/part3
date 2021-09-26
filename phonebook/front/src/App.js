import React, { useEffect, useState } from 'react';
import { Filter } from './Filter';
import { PersonForm } from './PersonForm';
import { PersonsTable } from './Persons';
import { ReactComponent as AddPerson } from './icons/person-add-icon.svg';
import services from './services';
import './App.css';

const AlertMessage = ({ message, type, handleDisplay, hasCloseButton }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={`${type} notification`}>
      {message}
      {hasCloseButton && <button onClick={handleDisplay}>X</button>}
    </div>
  );
};

const isPersonExistent = (newName, personsList) => {
  if (newName && personsList.length) {
    return personsList.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [alertMesage, setAlertMesage] = useState({ message: '', type: '' });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    services
      .getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => {
        setAlertMesage({
          message: error.response.data.error,
          type: 'error',
        });
      });
  }, []);

  useEffect(() => {
    if (alertMesage.message) {
      setShowAlert(true);
      setTimeout(() => {
        setAlertMesage({ message: '', type: '' });
        setShowAlert(false);
      }, 5000);
    }
  }, [alertMesage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newPhone,
    };

    const personExist = isPersonExistent(newName, persons);

    if (personExist) {
      services
        .update(personExist._id, { number: newPhone, name: personExist.name })
        .then((response) => {
          setPersons((currentPersons) => {
            const updatePersons = currentPersons.filter(
              (person) => person.id !== personExist.id
            );
            return updatePersons.concat(response);
          });
          setAlertMesage({
            message: `${personExist.name} information has been successfully modified`,
            type: 'success',
          });
        })
        .catch((error) => {
          setAlertMesage({
            message: error.response.data.error,
            type: 'error',
          });
        });
    } else {
      services
        .create(newPerson)
        .then((response) => {
          setAlertMesage({
            message: `${newPerson.name} has been succesfully added`,
            type: 'success',
          });
          console.log('%c response added', 'color: blue;', response);
          setPersons(persons.concat(response));
        })

        .catch((error) => {
          setAlertMesage({
            message: error.response.data.error,
            type: 'error',
          });
        });
    }

    setNewName('');
    setNewPhone('');
    setIsAddingNew(false);
  };

  const handleNameChange = (e) => {
    const newPerson = e.target.value;
    setNewName(newPerson);
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setNewPhone(newPhone);
  };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setFilter(filterValue);
  };

  const handleCancel = () => {
    setNewName('');
    setNewPhone('');
    setIsAddingNew(false);
  };

  const handleDelete = (id) => {
    services
      .remove(id)
      .then((response) => {
        if (response.status === 204) {
          const updatePersonsList = persons.filter(
            (person) => person._id !== id
          );
          console.log(
            '%c removing person from list',
            'color: hotpink;',
            updatePersonsList
          );
          setPersons(updatePersonsList);
          setAlertMesage({
            message: 'contact has been removed',
            type: 'success',
          });
        }
      })
      .catch((error) => {
        setAlertMesage({
          message: error.response.data.error,
          type: 'error',
        });
      });
  };

  const handleDisplayAlert = () => {
    setShowAlert(false);
  };

  const displayPersons = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div className='App app-container'>
      <h2 className='title'>Phonebook</h2>

      {showAlert && (
        <AlertMessage
          message={alertMesage.message}
          type={alertMesage.type}
          handleDisplay={handleDisplayAlert}
        />
      )}
      <Filter filterValue={filter} handleFilterChange={handleFilterChange} />

      <div className='contacts-container'>
        <div>
          {!isAddingNew && (
            <span className='contacts-option'>
              My contacts:
              <AddPerson
                className='add-person-icon'
                onClick={() => setIsAddingNew(true)}
              />
            </span>
          )}
        </div>

        {isAddingNew ? (
          <PersonForm
            handleSubmit={handleSubmit}
            newName={newName}
            handleNameChange={handleNameChange}
            newPhone={newPhone}
            handlePhoneChange={handlePhoneChange}
            personsList={persons}
            handleCancel={handleCancel}
          />
        ) : (
          <PersonsTable
            personsList={displayPersons}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default App;
