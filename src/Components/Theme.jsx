import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'

function Theme() {
    const [theme, setTheme] = useState(
        localStorage.currentTheme === "light" ?"light":"dark"
    );
    useEffect(() => {
      if(theme === 'light'){
               document.documentElement.classList.remove("dark");
               localStorage.currentTheme="light";
      }else{
        document.documentElement.classList.add('dark');
        localStorage.currentTheme="dark";
      }
    
      
    }, [theme])
    
    
  return (
    <div><button className="p-2 bg-gray-800  z-50 fixed top-20 right-0 text-white rounded-ss-2xl rounded-es-2xl shadow-md hover:bg-gray-700 transition" onClick={()=>setTheme(theme==='dark'?'light':'dark')} >
        {theme === 'dark'?<FontAwesomeIcon className='text-2xl' icon={faSun} />:<FontAwesomeIcon className='text-2xl' icon={faMoon} />}</button></div>
  )
}

export default Theme