import { useEffect, useState } from 'react';

import styles from '../styles/App.module.css';
import ItemCard from './ItemCard';

function App() {
  // useState hooks to update our products list
  const [products, setProducts] = useState([]);
  
  /** fetch data form api */
  const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products/?limit=100');
    const data = await res.json();
    /** set products list using setProducts(argument) method */ 
    if(data && data.products){
      setProducts(data.products);
    }
  }

  /** useEffect hooks to help call the fetch function and re-render app when dependencies[] changed */
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      {/* Product list section */}
      <section className={styles.products}>
        {
          products.map((item, index) => {
            const {thumbnail, title, description, price} = item;
            return (
            <ItemCard 
              key={`${index}ade`} 
              thumbnail={thumbnail} 
              title={title} 
              description={description}
              price={price}
            />)
          })
        }
      </section>

      {/* pagination  */}
      <section className={styles.pagination}>
        <span >◀</span> 
        <span>1</span>
        <span>2</span>
        <span>3</span>   
        <span>▶</span>    
      </section>
      
    </div>
  );
}

export default App;
