import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getUserStats } from '../services/Firestore';

function Profile() {
    const { user, logout } = useAuth();
    const [stats, setStats] = useState({ read: 0, favorites: 0 })

    useEffect(() => {
        if (user) {
            getUserStats(user).then(setStats)
        }
    }, [user])
  return (
    <div>
        <h2>My Profile</h2>
        <p><strong>Email:</strong>{user?.email}</p>
        <p><strong>Books Read:</strong>{stats.read}</p>
        <p><strong>Email:</strong>{stats.favorites}</p>
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Profile