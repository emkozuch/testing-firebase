import React, { useEffect } from 'react'
import { db, storage } from './firebase'

export const Products = () => {


    // async function getProducts() {
    //     db.ref('/products').on('value', (snapshot) => {
    //         return snapshot.val()
    //     });
    // }

    // const products = db.ref('/products').on('value', (snapshot) => {
    //     return snapshot.val()
    // });


    const dupa = db.ref('/products').on('value', (snapshot) => {
        const data = snapshot.val();
        return data
    });

    console.log(dupa)


    return (
        <div>

            {/* <p>{description}</p>
            <p>{price.amount}</p>
            <p>{price.value}</p>
            <p>{price.unit}</p> */}
        </div>
    )
}
