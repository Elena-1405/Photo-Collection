import React, { useState, useEffect } from 'react';
import './index.scss';
import {Collection} from './Collection'


const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];

function App() {
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : ''

    fetch(
      `https://6562128cdcd355c0832487c7.mockapi.io/photo-collection?page=${
        page
      }&limit=2&${
        category
      }`,
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json)
        //console.log(json)
      })
      .catch(err => {
        console.warn(err);
        alert ('Failed to connect')
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, index) => (
              <li 
                onClick={() => setCategoryId(index)}
                className = {categoryId === index ? 'active' : ''} 
                key={obj.name}>
                {obj.name}
              </li>
            ))}
        </ul>
        <input 
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        className="search-input" 
        placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading ...</h2>
        ) : (
          collections
              .filter(obj => {
                return obj.name.toLowerCase().includes(searchValue.toLowerCase());
              })
            .map((obj, index) => (
              <Collection name={obj.name} images={obj.photos} key={index}/>
              ))
            )}
      </div>
      <ul className="pagination">
        {
          [...Array(4)].map((_, index) => (
            <li 
              key={index} 
              className={page === index + 1 ? 'active' : ''}
              onClick={(() => setPage(index + 1))}>
                {index+1}
              </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
