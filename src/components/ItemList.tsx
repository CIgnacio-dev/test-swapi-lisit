import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/apiService';

interface ItemListProps {
  endpoint: string;
}

const ItemList: React.FC<ItemListProps> = ({ endpoint }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData(endpoint);
      setItems(data.results);
    };
    loadData();
  }, [endpoint]);

  return (
    <ul>
      {items.map((item: any) => (
        <li key={item.name}>{item.name}</li>
      ))}
    </ul>
  );
};

export default ItemList;
