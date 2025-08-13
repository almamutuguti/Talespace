import { deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { db } from "/firebase"



export async function addFavorite(userId, book) {
    const ref = doc(db, "users", userId, "favorites", book.id);
    await setDoc(ref, {
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        genre: book.genre
    })
}

export async function removeFavorite(userId, bookId) {
    const ref = doc(db, "users", userId, "favorites", bookId)
    await deleteDoc(ref);
}

export async function setReadingStatus(userId, bookId, status) {
    const ref = doc(db, "users", userId, "readingStatus", bookId)
    await setDoc(ref, { status })
}