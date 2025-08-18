import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../services/Firebase'

function AddChapter({ bookId }) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [order, setOrder] = useState(1)

    const handleSubmit = async () => {
        const chaptersRef = collection(db, "books", bookId, "chapters")
        await addDoc(chaptersRef, {title, content, order})
    }
  return (
    <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Chapter Title' />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder='Content' />
        <input type="number" value={order} onChange={e => setOrder(+e.target.value)}/>
        <button type='submit'>Add Chapter</button>

    </form>
  )
}

export default AddChapter