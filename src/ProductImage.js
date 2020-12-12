import React, { useState, useEffect } from 'react'
import { storage } from './firebase'

export const ProductImage = ({ imageUrl }) => {

    const [url, setUrl] = useState()

    useEffect(() => {
        storage.ref(`${imageUrl}`).getDownloadURL().then(url => setUrl(url))
        console.log(url)
    }, [])

    return (
        <>
            <img src={url} />
        </>
    )
}
