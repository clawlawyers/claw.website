import React, { useState } from 'react'
import Style from './Testimonials.module.css'
import starInvertedComma from '../assets/images/startInvertedComma.png'
import endComma from '../assets/images/endComma.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Testimonials() {
    const [itemNumber, setItemNumber] = useState(0)
    const [testimonials, setTestimonials] = useState([{ msg: "Join Claw to be in the legal market which will prevail & advance in the AI advanced technological era", user: 'aditya' }, { msg: "Join the Vibrant community! It helped me to find my leads and grow professionally", user: 'rahul' }, { msg: "Its a great community of like minded people,can get lot of exposure to opportunities!", user: 'Vishnu' }])

    return (
        <div className={Style.main}>
            <div className={Style.title}>What They Say</div>
            <h3 className={Style.header}>What Our Customers Say About us?</h3>
            <div className={Style.allTestimonials}>
                <div className={Style.eachTestimonial}>
                    <div className={Style.userTestimonial}>
                        <span><img src={starInvertedComma} /></span>
                        <div className={Style.testimonialMessage}>{testimonials[itemNumber].msg}</div>  <div className={Style.endInvertedComma}><img src={endComma} /></div>
                        <p>~{testimonials[itemNumber].user}</p>
                    </div>
                    <div className={Style.buttonsContainer}>
                        <div>
                            <button onClick={() => {
                                if (itemNumber > 0) {
                                    setItemNumber(itemNumber - 1)
                                }
                            }} className={Style.prev}><FontAwesomeIcon icon={faArrowLeft} color='black' /></button><span>Prev</span>
                        </div>
                        <div>
                            <span>Next</span>
                            <button onClick={() => {
                                if (itemNumber < testimonials.length - 1) {
                                    setItemNumber(itemNumber + 1)
                                }
                            }} className={Style.next}><FontAwesomeIcon icon={faArrowRight} color='black' /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials