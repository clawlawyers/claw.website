import React, { useState } from 'react'
import Style from './GigForm.module.css'

function GigForm() {
    const [country, setCountry] = useState("country")
    const [profession, setProfession] = useState("profession")
    const [jobtitle, setJobTitle] = useState('');
    const [jobdescription, setJobDescription] = useState('');
    const [pricerange, setPrice] = useState("")
    const [pincode, setPincode] = useState("")

    function postgig(e) {
        e.preventDefault();
        console.log(country, profession, jobtitle, jobdescription, pricerange, pincode)
    }
    return (
        <div className={Style.main}>
            <div className={Style.header}>
                <h2>Find Your Business Ally in Laws & Finance</h2>
                <p>Post your job gig below and get matched with experienced lawyers ans CA's ready to assist you!</p>
            </div>
            <div className={Style.formContainer}>
                <form>
                    <div className={Style.formItem}>
                        <label>Job title:</label>
                        <input onChange={(e) => { setJobTitle(e.target.value) }} type='text' placeholder='Enter your job title' />
                    </div>
                    <div className={Style.formItem}>
                        <label>Job Description:</label>
                        <input onChange={(e) => { setJobDescription(e.target.value) }} type='text' placeholder='Enter your job Description' />
                    </div>
                    <div className={Style.formItem}>
                        <label>Price Range:</label>
                        <input onChange={(e) => { setPrice(e.target.value) }} type='text' placeholder='Enter the price for your project' />
                    </div>
                    <div className={Style.formItem}>
                        <div className={Style.country_pincode}>
                            <div className={Style.countryContainer}>
                                <label>Country </label>
                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                >
                                    <option defult hidden value={'country'}>I'm from</option>
                                    <option value={"india"}>India</option>
                                    <option value={"USA"}>USA</option>
                                    <option value={"UK"}>UK</option>
                                    <option value={"Japan"}>Japan</option>
                                </select>

                                {/* <input type='text' placeholder='Im from' /> */}
                            </div>
                            <div className={Style.pincodeContainer}>
                                <label>Pincode:</label>
                                <input onChange={(e) => { setPincode(e.target.value) }} type='number' placeholder='Enter your pincode' />
                            </div>
                        </div>
                    </div>
                    <div className={Style.formItem}>
                        <label>Profession:</label>
                        <select
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                        >
                            <option defult hidden value={'profession'}>I need a</option>
                            <option value={"Lawyer"}>Lawyer</option>
                            <option value={"ChartedAccountant"}>ChartedAccountant</option>
                        </select>
                    </div>
                    <div className={Style.postGig}>
                        <button onClick={postgig}>Post Gig</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default GigForm