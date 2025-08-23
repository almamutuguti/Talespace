import { deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { db } from "./Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";




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

export const getAllBooks = async () => {
    const snapshot = await getDocs(collection(db, "books"))
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const getUserStats = async (uid) => {
    const favSnap = await getDocs(query(collection(db, "favorites")))
    const readSnap = await getDocs(query(collection(db, "readingStatus"), where("userId", "==", uid), where("status", "==", "completed")))
    return {
        favorites : favSnap.size,
        read: readSnap.size
    }
}