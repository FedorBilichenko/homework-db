import { useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';

const list = [
  {
  id: 1,
  title: '1. Посмотреть список авторов'
  },
  {
    id: 2,
    title: '2. Посмотреть список дисков'
  },
  {
    id: 3,
    title: '3. Посмотреть список менеджеров'
  },
  {
    id: 4,
    title: '4. Посмотреть список менеджеров с заказами'
  },
  {
    id: 5,
    title: '5. Посмотреть список заказов'
  },
  {
    id: 6,
    title: '6. Найти диск по id'
  },
  {
    id: 7,
    title: '7. Найти диски по названию'
  },
  {
    id: 8,
    title: '8. Найти диски по названию, доступным деньгам и автору'
  }
]

function App() {
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState('');
  const [diskId, setDiskId] = useState('');
  const [diskName, setDiskName] = useState('');
  const [price, setPrice] = useState('');
  const [authorId, setAuthorId] = useState('');
  
  const click = useCallback(async () => {
    if (selected === 1) {
      const data = await axios.get('http://localhost:3001/api/author/list');
      
      setData(JSON.stringify(data.data, null, 4));
    }
    if (selected === 2) {
      const data = await axios.get('http://localhost:3001/api/disk/list');
    
      setData(JSON.stringify(data.data, null, 4));
    }
    if (selected === 3) {
      const data = await axios.get('http://localhost:3001/api/manager/list');
    
      setData(JSON.stringify(data.data, null, 4));
    }
    if (selected === 4) {
      const data = await axios.get('http://localhost:3001/api/manager/list_with_orders');
    
      setData(JSON.stringify(data.data, null, 4));
    }
    if (selected === 5) {
      const data = await axios.get('http://localhost:3001/api/order/list');
    
      setData(JSON.stringify(data.data, null, 4));
    }
    if (selected === 6) {
      const data = await axios({ method: 'post', url: `http://localhost:3001/api/disk/get`, data: {
          id: diskId
        },
        headers: {
          "Content-Type": "application/json"
        }});
    
      setData(JSON.stringify(data.data, null, 4));
    }
    if (selected === 7) {
      const data = await axios({ method: 'post', url: `http://localhost:3001/api/disk/get_by_name`, data: {
          name: diskName
        },
        headers: {
          "Content-Type": "application/json"
        }});
    
      setData(JSON.stringify(data.data, null, 4));
    }
    if (selected === 8) {
      const data = await axios({ method: 'post', url: `http://localhost:3001/api/disk/get_by_params`, data: {
          name: diskName,
          price,
          authorId
        },
        headers: {
          "Content-Type": "application/json"
        }});
    
      setData(JSON.stringify(data.data, null, 4));
    }
  }, [selected, diskId, diskName, price, authorId]);
  
  return (
    <div className="App">
      Выбери действие:
      {list.map(item => <div className={`Item${selected === item.id ? ' Item_selected' : ''}`} onClick={() => {
        setSelected(item.id);
        setData('');
      }} key={item.id}>{item.title}</div>)}
      
      {selected === 6 && <div className="Input-container">Id диска <input className="Input" value={diskId} onChange={event => setDiskId(event.target.value)}/></div>}
      {selected === 7 && <div className="Input-container">Название диска <input className="Input" value={diskName} onChange={event => setDiskName(event.target.value)}/></div>}
      {selected === 8 && <>
        <div className="Input-container">Название диска <input className="Input" value={diskName} onChange={event => setDiskName(event.target.value)}/></div>
        <div className="Input-container">Доступные деньги<input className="Input" value={price} onChange={event => setPrice(event.target.value)}/></div>
        <div className="Input-container">Id автора<input className="Input" value={authorId} onChange={event => setAuthorId(event.target.value)}/></div>
      </>}
      {selected !== null && <div className="Button" onClick={click}>Отправить запрос</div>}
      <div className="Data">{data}</div>
    </div>
  );
}

export default App;
