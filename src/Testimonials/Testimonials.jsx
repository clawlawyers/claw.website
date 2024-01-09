import React, { useState } from 'react'
import Style from './Testimonials.module.css'

function Testimonials() {
    const [itemNumber, setItemNumber] = useState(0)
    const [testimonials, setTestimonials] = useState([{ msg: "Join Claw to be in the legal market which will prevail & advance in the AI advanced technological era", user: 'aditya' }, { msg: "Join the Vibrant community! It helped me to find my leads and grow professionally", user: 'rahul' }, { msg: "Its a great community of like minded people", user: 'Vishnu' }])

    return (
        <div className={Style.main}>
            <div className={Style.title}>What They Say</div>
            <h3 className={Style.header}>What Our Customers Say About us?</h3>
            <div className={Style.allTestimonials}>
                <div className={Style.eachTestimonial}>
                    <div className={Style.userTestimonial}>
                        <h4><span>"</span>{testimonials[itemNumber].msg}<span>"</span></h4>
                        <p>~{testimonials[itemNumber].user}</p>
                    </div>
                    <div className={Style.buttons}>
                        <button onClick={() => {
                            if (itemNumber > 0) {
                                setItemNumber(itemNumber - 1)
                            }
                        }} className={Style.prev}>prev</button>
                        <button onClick={() => {
                            if (itemNumber < testimonials.length - 1) {
                                setItemNumber(itemNumber + 1)
                            }
                        }} className={Style.next}>next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials