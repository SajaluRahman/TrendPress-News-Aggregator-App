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
    <div><button className="p-2 bg-gray-800  fixed top-20 right-4 text-white rounded-lg shadow-md hover:bg-gray-700 transition" onClick={()=>setTheme(theme==='dark'?'light':'dark')} >
        {theme === 'dark'?'Light Mode':'Dark mode'}</button></div>
  )
}

export default Theme