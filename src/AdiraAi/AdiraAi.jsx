import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ADIRA_ENDPOINT } from '../utils/utils';

const AdiraAi = () => {
  const auth = useSelector((state) => state.auth); // Assuming `auth` is an object
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
 // Run this effect whenever auth changes
 const setAuthData = async() => {
  await sleep(4000)
    // Example auth data you want to send to the child iframe
    const authData = {
      token: "auth",
      user: JSON.stringify(auth)
    };

    const iframeEl = document.getElementById("iframe-id");
    if (iframeEl) {
      // Send the auth data to the iframe
      await iframeEl.contentWindow.postMessage(
        { msg: 'set-localstorage', data: authData },
        ADIRA_ENDPOINT // Target origin of the iframe
      );

      console.log("hi")
    } 
  };

  useEffect(() => {
    // Optionally, call setAuthData when needed
    
    setAuthData();
  }, []);
  return (
    <div className='h-[100vh]'>
         {/* <button className='hidden' onClick={setAuthData}>Set Auth Data in Iframe</button> */}
      <iframe 
        id="iframe-id" // Set the ID for the iframe
        className='h-full w-full' 
        src={ADIRA_ENDPOINT }
      ></iframe>
    </div>
  );
}

export default AdiraAi;

