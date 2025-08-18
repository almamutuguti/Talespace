import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../services/Firebase';

function Comments({ bookId, chapterId }) {
    const [comments, setComments] = useState([])
    const [text, setText] = useState("");

    useEffect(() => {
        const q = query(collection(db, "comments"), where("bookId", "==", bookId));
        // eslint-disable-next-line no-const-assign
        if (chapterId) q = query(q, where("chapterId", "==", chapterId));
        onSnapshot(q, snapshot => {
            setComments(snapshot.docs.map(doc => doc.data()))
        })
    }, [bookId, chapterId])

    const handleSubmit = async () => {
        await addDoc(collection(db, "comments"), {
            bookId, 
            chapterId: chapterId || null,
            text,
            userId: auth.currentUser.uid,
            timestamp: serverTimestamp()
        });
        setText("")
    }

  return (
    <div>
       {comments.map((c, i) => <p key={i}>{c.text}</p>)}
       <textarea value={text} onChange={e => setText(e.target.value)} /> 
        <button onClick={handleSubmit}>Comment</button>
    </div>
  )
}

export default Comments