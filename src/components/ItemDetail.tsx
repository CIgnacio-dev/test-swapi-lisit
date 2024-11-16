import React, { useEffect, useState } from 'react';

interface Item {
  name: string;
  [key: string]: any; 
}

const ItemDetail: React.FC<{ endpoint: string }> = ({ endpoint }) => {
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };
    loadData();
  }, [endpoint]);

  if (!item) return <div>Cargando...</div>;

  return (
    <div>
      <h2>{item.name}</h2>
      <pre>{JSON.stringify(item, null, 2)}</pre>
    </div>
  );
};

export default ItemDetail;
