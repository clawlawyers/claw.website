import React, { useState } from 'react'
import Style from './Register.module.css'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/icons/logo.png'

function Register() {
    const [lawyer, setLawyer] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState(null)
    const [location, setLocation] = useState("")
    const [graduation, setGraduation] = useState(null)
    const [experience, setExperience] = useState(null)
    const navigate = useNavigate()
    const selected = {
        backgroundColor: '#8940FF',
        color: 'white'
    }

    const isValidMobile = (mobile) => {
        const mobileNumber = mobile.toString();
        return /^\d{10}$/.test(mobileNumber);
    };

    function submit(e) {
        e.preventDefault();
        if (name.length == 0) {
            alert("plase enter name")
        } else if (email.length == 0) {
            alert("plase enter email")
        } else if (mobile === null) {
            alert("plase enter mobile number")
        } else if (!isValidMobile(mobile)) {
            alert(" please enter 10 digits mobile number!")
        } else if (location.length == 0) {
            alert("plase enter location")
        } else if (lawyer && graduation === null) {
            alert("plase enter graduation year")
        } else if (!lawyer && experience === null) {
            alert("plase enter experience")
        } else {
            localStorage.setItem("registereduser", name)
            navigate('/')
        }
    }
    return (
        <div className={Style.main}>
            <div className={Style.register}>
                <h3>Register</h3>
            </div>
            <div className={Style.selectorContainer}>
                <div className={Style.selector}>
                    <div onClick={() => { setLawyer(true) }} className={Style.lawyer} style={lawyer ? selected : {}}>Lawyer</div>
                    <div onClick={() => { setLawyer(false) }} className={Style.accountant} style={!lawyer ? selected : {}}>Charted Accountant</div>
                </div>
            </div>
            <div className={Style.form}>
                <form>
                    <div className={Style.inputItem}>
                        <label>Username</label>
                        <input placeholder='e.g-Joe' type='text' onChange={(e) => setName(e.target.value)}></input>
                    </div>

                    <div className={Style.inputItem}>
                        <label>Email-I'd</label>
                        <input placeholder='e.g-Joe@gmail.com' type='email' onChange={(e) => setEmail(e.target.value)}></input>
                    </div>

                    <div className={Style.inputItem}>
                        <label>Phone Number</label>
                        <input placeholder='e.g-12345' type='number' onChange={(e) => setMobile(e.target.value)}></input>
                    </div>

                    <div className={Style.inputItem}>
                        <label>Location</label>
                        <input placeholder='e.g-your location here' type='text' onChange={(e) => setLocation(e.target.value)}></input>
                    </div>

                    {lawyer ? <div className={Style.inputItem}>
                        <label>Graduated in Year</label>
                        <input placeholder='e.g-2005' type='number' onChange={(e) => setGraduation(e.target.value)}></input>
                    </div>
                        :
                        <div className={Style.inputItem}>
                            <label>Experience in years</label>
                            <input placeholder='e.g-5 yrs' type='number' onChange={(e) => setExperience(e.target.value)}></input>
                        </div>}



                    <div className={Style.registerButton}>
                        <button onClick={submit}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register