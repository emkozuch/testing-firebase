import React, { useState } from 'react'
import { db, storage } from './firebase'

export const Form = () => {

    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        unit: '',
        value: '',
        image: '',
    })


    function handleSubmit(e) {
        e.preventDefault()
        sendData(formData)
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    function sendData(data) {
        const { description, amount, unit, value, image } = data
        let lastProductID = 0

        db.ref("/products").limitToLast(1).once('value', snapshot => {
            if (snapshot.val() !== null) {
                const lastProductData = Object.entries(snapshot.val())[0][1]
                lastProductID = lastProductData.id
            } else {
                lastProductID = 0
            }
        })

        const nextId = lastProductID + 1
        const imageUrl = `image-${nextId}`

        db.ref("/products").push({
            description,
            price: {
                amount,
                unit,
                value
            },
            id: nextId,
            image_url: imageUrl
        })
        storage.ref(`/${imageUrl}`).put(image)
    }

    function handleFileInput(e) {
        e.preventDefault()
        setFormData({
            ...formData,
            image: e.target.files[0]
        })
    }
    return (
        <div >
            <form style={{ margin: '50px', display: 'flex', flexDirection: 'column', height: '100%', width: '50%' }}>
                <input value={formData.description} onChange={handleChange} style={{ marginBottom: '20px' }} name="description" type="text" placeholder="first" />

                <input value={formData.amount} onChange={handleChange} style={{ marginBottom: '20px' }} name="amount" type="number" placeholder="amount" />

                <input value={formData.unit} onChange={handleChange} style={{ marginBottom: '20px' }} name="unit" type="text" placeholder="unit" />

                <input value={formData.value} onChange={handleChange} style={{ marginBottom: '20px' }} name="value" type="number" placeholder="value" />

                <input name="image" onChange={handleFileInput} style={{ marginBottom: '20px', height: '100px' }} type="file" placeholder="first" />
                <button onClick={handleSubmit}>submit</button>
            </form>
        </div>
    )
}
