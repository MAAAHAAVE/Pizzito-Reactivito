import React from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://682dc0774fae188947576122.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        console.error('Error fetching pizza:', error);
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return (
      <div className="container">
        <h2>Загрузка...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
