import React, { useEffect, useState } from 'react'
import Style from './Header.module.css'
import { useNavigate } from 'react-router-dom'
import clawLogo from '../assets/icons/clawlogo.jpg'

function Header({ home, howItworks, testimonial }) {
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
            <div className={Style.title}>C<span>L</span>A<span>W</span></div>
            <div className={Style.categories}><span onClick={home}>Home </span> |<span onClick={howItworks}> How it works </span>|<span onClick={testimonial}> Testimonials</span></div>
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