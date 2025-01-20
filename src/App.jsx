import { useState } from 'react';
import './App.css';
import Header from './components/header/header';
import Button from './components/button/Button';
import Input from './components/input/Input';
import ListItem from './components/listItem/ListItem';

function App() {
  const [data, setDate] = useState([]);
  const [showDate, setShowDate] = useState([]);
  const [value, setValue] = useState('');
  const [valueSearch, setValueSearch] = useState('');
  const [showAll, setShowAll] = useState(true);

  function handleChange(value) {
    setValue(value);
  }

  function handleSearchTodo(value) {
    setValueSearch(value);
    setShowDate(data.filter((item) => item.text.includes(value)));
  }

  function handleClickAdd() {
    if (value === '') return;
    const todos = {
      text: value,
      id: Date.now(),
      isCompleted: false,
      isActive: false,
      timeAdded: new Date(),
    };
    setDate([...data, todos]);
    setValue('');
  }
  function handleShowDeletToDo() {
    setShowAll(false);
    setShowDate(data.filter((item) => item.isCompleted === true));
  }
  function handleShowCompletedData() {
    setShowAll(false);
    setShowDate(data.filter((item) => item.isActive === true));
  }
  function handleshowAllToDo() {
    setShowAll(false);
    setShowDate(data);
  }
  function handleCompleteItem(id) {
    const showFilterDelete = data.filter((item) => item.id !== id);
    const isDeleteData = data.find((item) => item.id === id);
    if (isDeleteData) {
      isDeleteData.isCompleted = !isDeleteData.isCompleted;
      if (isDeleteData.isActive) {
        isDeleteData.isActive = !isDeleteData.isActive;
      }
    }
    setDate([...showFilterDelete, isDeleteData]);
  }

  function hanldeDeleteItem(id) {
    // console.log(data);
    // console.log(id);
    setDate(data.filter((item) => item.id !== id));
    setShowAll(data);
  }
  const handleChangeActive = (id) => {
    const showFilterActive = data.filter((item) => item.id !== id);
    const isActiveData = data.find((item) => item.id === id);
    if (isActiveData) {
      isActiveData.isActive = !isActiveData.isActive;
      if (isActiveData.isCompleted) {
        isActiveData.isCompleted = !isActiveData.isCompleted;
      }
    }
    setDate([...showFilterActive, isActiveData]);
  };

  return (
    <div>
      <Header />
      <h1>Hello world!!!</h1>
      <div className="main">
        <Input value={value} onChange={(e) => handleChange(e.target.value)} />
        <div className="main-btn">
          <Button text="Добавить" onClick={handleClickAdd} />
          <Button text="Активные" onClick={handleShowCompletedData} />
          <Button text="Завершенные" onClick={handleShowDeletToDo} />
          <Button text="All" onClick={handleshowAllToDo} />
        </div>
      </div>
      <main>
        <ul>
          {showAll ? (
            data.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                onCompleted={handleCompleteItem}
                onDelete={hanldeDeleteItem}
                onChangeActive={handleChangeActive}
              />
            ))
          ) : showDate.length > 0 ? (
            showDate.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                onCompleted={handleCompleteItem}
                onDelete={hanldeDeleteItem}
                onChangeActive={handleChangeActive}
              />
            ))
          ) : (
            <p className="ampty-string">Здесь пока ни чего нЭЭЭЭЭЭту!!!</p>
          )}
        </ul>

        <div className="searcInput">
          <h3>Поиск</h3>
          <Input value={valueSearch} onChange={(e) => handleSearchTodo(e.target.value)} />
        </div>
      </main>
    </div>
  );
}

export default App;
