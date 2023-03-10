import { useEffect, useState } from 'react';

import styles from '../styles/App.module.css';
import ItemCard from './ItemCard';
import Navbar from './Navbar';

function App() {
  // useState hooks to update our products list
  const [products, setProducts] = useState([]);
  /** specific page number render */
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  
  /** fetch data form api */
  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products/?limit=10&&skip=${page*10-10}`);
    const data = await res.json();
    /** set products list using setProducts(argument) method */ 
    if(data && data.products){
      setProducts(data.products);
      setTotal(data.total);
    }
  }

  /** useEffect hooks to help call the fetch function and re-render app when dependencies[] changed */
  useEffect(() => {
    fetchProducts();
    setPage(page);
  }, [page]);

  /** Function for handle when page has been selected */
  const selectedPageHandler = (page) => {
    setPage(page);
    return;
  }

  /** Function for handle showPrevPage() event from pagination */
  const showPrevPage = () => {
    page > 1 && 
    setPage(page -1);
    return;
  }

  /** Function for handle showNextPage() event from pagination */
  const  showNextPage = () => {
    page < (total/10) && 
    setPage(page + 1);
    return;
  }

  return (
    <div className={styles.container}>
      <Navbar className={styles.sticky}/>
      {/* Product list section */}
      <section className={styles.products}>
        {/* {
          products.length > 0 &&
          products.slice(page*10-10, page*10 ).map((item, index) => {
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
        } */}
        {
          products.length > 0 &&
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

      {/* pagination logic */}
      <section className={styles.pagination}>
        {/* condition to show and hide prev arrow */}
        {
          page === 1
          ? null
          : <span 
              className={`${styles.btn} ${styles.pagination__span}`}
              onClick={() => showPrevPage()} 
            >???</span> 
        }
        {
          // create new empty array of size and spread so each element assign undefined by default.
          // [...Array(products.length/10)].map((item, index) => {
            [...Array(total/10)].map((item, index) => {
            return (
              <span 
                key={`${index}index`}
                onClick={() => selectedPageHandler(index+1)}
                // we can write condition inside class attribute value as well
                className={ page === index + 1 ? `${styles.active} ${styles.pagination__span}`: `${styles.pagination__span}`}
              >{index + 1} </span>
            )
          })
        }
        {/* condition to show and hide next arrow */}
        {
          page <10
          ? <span 
              className={`${styles.btn} ${styles.pagination__span}`}
              onClick={() => {showNextPage()}}
            >???</span>   
          : null
        } 
      </section> 
    </div>
  );
}

export default App;
