import { deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { db } from "./Firebase";




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

export async function setReadingStatus(userId, bookId, status, book) {
    const ref = doc(db, "users", userId, "readingStatus", bookId)
    await setDoc(ref, { 
        status,
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        genre: book.genre
    })
}

export async function updateReadingStatus(userId, bookId, newStatus, bookData) {
    const ref = doc(db, "users", userId, "readingStatus", bookId)
    await setDoc(ref, {status: newStatus, ...bookData}, {merge: true});
}

export async function removeReadingStatus(userId, bookId) {
    const ref = doc(db, "users", userId, "readingStatus", bookId)
    await deleteDoc(ref);
}