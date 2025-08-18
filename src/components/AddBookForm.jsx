import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../services/Firebase';

function AddBookForm() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const handleSubmit = async () => {
        await addDoc(collection(db, 'books'), {title, author, createdAt: serverTimestamp()})
    }
  return (
    <form onSubmit={handleSubmit}>
        <input type={title} onChange={e => setTitle(e.target.value)} placeholder='Title'/>
        <input type={author} onChange={e => setAuthor(e.target.value)} placeholder='Author'/>
        <button type='submit'>Add Book</button>
    </form>
  )
}

export default AddBookForm