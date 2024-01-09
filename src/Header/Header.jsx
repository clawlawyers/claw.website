import React, { useEffect, useState } from 'react'
import Style from './Header.module.css'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const [user, setUser] = useState("")
    useEffect(() => {
        const user = localStorage.getItem("registereduser")
        if (user) {
            setUser(user)
        }
    })
    return (
        <div className={Style.header}>
            <div className={Style.title}>CLAW</div>
            <div className={Style.categories}><span>Home </span> |<span> How it works </span>|<span > Testimonials</span></div>
            <div className={Style.register}>
                {user?.length <= 0 ? <div>
                    <button onClick={() => {
                        navigate('/register')
                    }}>Register as a CA/Lawyer</button>
                </div>

                    : <div className={Style.user}>Welcome {user}! </div>}
            </div>
        </div >
    )
}

export default Header