import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../services/Firebase';

function BookReader({ bookId }) {
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        const chaptersRef = collection(db, "books", bookId, "chapters")
        const q = query(chaptersRef, orderBy("order"));
        onSnapshot(q, (snapshot) => {
            setChapters(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        })
    }, [bookId])
  return (
    <div>
       {chapters.map(ch => {
        <div key={ch.id}>
            <h3>{ch.title}</h3>
            <p>{ch.content}</p>
        </div>
       })} 
    </div>
  )
}

export default BookReader