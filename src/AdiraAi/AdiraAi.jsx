import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ADIRA_ENDPOINT } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

const AdiraAi = () => {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.user);
  console.log(currentUser)
  var user = currentUser
  const auth = useSelector((state) => state.auth); // Assuming `auth` is an object
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  // if(!currentUser){
  //   console.log("jo")
  //   navigate("/login")
  // }
 // Run this effect whenever auth changes
 const setAuthData = async(currentUser) => {
 
  sleep(400)
    // Example auth data you want to send to the child iframe
    const authData = {
      token: "auth",
      user: JSON.stringify(currentUser)
    };

    const iframeEl = document.getElementById("iframe-id");
    if (iframeEl) {
      console.log(currentUser)
      // Send the auth data to the iframe
      await iframeEl.contentWindow.postMessage(
        { msg: 'set-localstorage', data: authData },
        ADIRA_ENDPOINT // Target origin of the iframe
      );

      // console.log("hi")
    } 

  };
  setAuthData(currentUser);
  const handleLoad= (currentUser)=>{
    console.log(currentUser)
    setAuthData(currentUser);

  }


  // useEffect(() => {
  //   // Optionally, call setAuthData when needed
    
  //   console.log(currentUser)
  //   setAuthData(currentUser);
  // }, []);
  return (
    <div className='h-[100vh]'>
         {/* <button className='hidden' onClick={setAuthData}>Set Auth Data in Iframe</button> */}
      <iframe 
        id="iframe-id" // Set the ID for the iframe
        className='h-full w-full' 
        src={ADIRA_ENDPOINT }
        onLoad={()=>handleLoad(currentUser)}
      ></iframe>
    </div>
  );
}

export default AdiraAi;

