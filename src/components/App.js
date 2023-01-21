import { useEffect, useState } from 'react';

import styles from '../styles/App.module.css';
import ItemCard from './ItemCard';

function App() {
  // useState hooks to update our products list
  const [products, setProducts] = useState([]);
  
  /** fetch data form api */
  const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    /** set products list using setProducts(argument) method */ 
    setProducts(data.products);
  }

  /** useEffect hooks to help call the fetch function and re-render the app when dependencies changed */
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles.app}>
      {
        products.map((item, index) => {
          return <ItemCard thumbnail={item.thumbnail} title={item.title} key={`${index}ade`} />
        })
      }
    </div>
  );
}

export default App;
