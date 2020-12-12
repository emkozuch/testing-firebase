import React, { Fragment, useEffect, useState } from 'react'
import { db, storage } from './firebase'
import { ProductImage } from './ProductImage'

export const Products = () => {

    const [products, setProducts] = useState({ products: [] })

    function getProducts() {
        db.ref('/products').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setProducts({
                    products: Array.from(Object.entries(data))
                })
            }
        });
    }

    useEffect(() => {
        getProducts()
        console.log(products)
    }, [])

    return (

        <div>
            {console.log(products.products)}
            {products.products.map(product => {
                return (
                    <>
                        <ProductImage imageUrl={product[1].image_url} />
                        <p>{product[1].description}</p>
                    </>
                )
            })}
        </div>
    )
}
