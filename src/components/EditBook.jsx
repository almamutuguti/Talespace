import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../services/Firebase';

function EditBook({ bookId }) {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    useEffect(() => {
        const fetchBook = async () => {
            const ref = doc(db, "books", bookId)
            const snapshot = await getDoc(ref)
            if (snapshot.exists()) {
                const data = snapshot.data()
                setTitle(data.title);
                setAuthor(data.author)
            }
        }
        fetchBook()
    }, [bookId]);

    const handleUpdate = async () => {
        const ref = doc(db, "books", bookId)
        await updateDoc(ref, { title, author })
    }

  return (
    <form onSubmit={(e) => { e. preventDefault() ; handleUpdate(); }}>
        <input type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Book Title'
        
        />
        <input type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder='Author Name'
        
        />

        <button type='submit'>Update Book</button>
    </form>
  )
}

export default EditBook