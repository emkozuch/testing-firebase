import React, { useState } from 'react'
import { db, storage } from './firebase'

export const Form = () => {

    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        unit: '',
        value: '',
        image: '',
        childrenCount: 0
    })
    const [childrenCount, setChildrenCount] = useState(0)


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

    async function sendData(data) {
        const { description, amount, unit, value, image } = data
        const productsArr = []

        await db.ref("/products").once('value', snapshot => {
            snapshot.forEach(child => productsArr.push(child))
        })

        const nextId = productsArr.length + 1
        const imageUrl = `image-${productsArr.length}`

        await db.ref("/products").push({
            description,
            id: nextId,
            price: {
                amount,
                unit,
                value
            },
            image_url: imageUrl
        })
        await storage.ref(`/${imageUrl}`).put(image)
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
