import React, { useEffect, useState } from 'react'
import Style from './GigForm.module.css'

function GigForm() {
    const [country, setCountry] = useState("country")
    const [profession, setProfession] = useState("profession")
    const [jobtitle, setJobTitle] = useState('');
    const [jobdescription, setJobDescription] = useState('');
    const [pricerange, setPrice] = useState(null)
    const [pincode, setPincode] = useState(null)
    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        setJobTitle("");
        setJobDescription('');
        setCountry("country");
        setPincode(null);
        setPrice(null);
        setProfession('profession');
        setSubmit(false)
    }, [submit])

    function postgig(e) {
        e.preventDefault();
        if (jobtitle.length == 0) {
            alert("Please enter job title")
        } else if (jobdescription.length == 0) {
            alert("Please enter job description")
        } else if (pricerange == null) {
            alert("Please enter price range")
        } else if (country == 'country') {
            alert("Please select your country")
        } else if (pincode == null) {
            alert("Please enter pincode")
        } else if (profession == 'profession') {
            alert("Please select your profession")
        } else {
            alert(jobtitle + " " + jobdescription + " " + pricerange + " " + " " + country + " " + pincode + " " + profession)
            setSubmit(true)
        }
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
                    <div className={Style.formElements}>
                        <div className={Style.formItem}>
                            <label>Job title:</label>
                            <input value={jobtitle} onChange={(e) => { setJobTitle(e.target.value) }} type='text' placeholder='Enter your job title' />
                        </div>
                        <div className={Style.formItem}>
                            <label>Job Description:</label>
                            <input value={jobdescription} onChange={(e) => { setJobDescription(e.target.value) }} type='textarea' placeholder='Enter your job Description' />
                        </div>
                        <div className={Style.formItem}>
                            <label>Price Range:</label>
                            <input value={pricerange || ''} onChange={(e) => { setPrice(e.target.value) }} type='text' placeholder='Enter the price for your project' />
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
                                    <input value={pincode || ''} onChange={(e) => { setPincode(e.target.value) }} type='number' placeholder='Enter your pincode' />
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
                    </div>
                </form>
            </div>
        </div>

    )
}

export default GigForm