import React from 'react'

import styles from '../styles/ItemCard.module.css';

function ItemCard(props) {
   const {title, thumbnail, price, description} = props;
   return (
      <div className={styles.item__card}>
         <span className={styles.title}>{title}</span>
         <span className={styles.description}>{description}</span>
         <img className={styles.img} src={thumbnail}  alt={title}/>
         <span className={styles.price}>{price}</span>
      </div>
   )
}

export default ItemCard;
