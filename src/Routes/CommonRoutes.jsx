import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../Pages/CommonPages/Home';

function CommonRoutes() {
  return (
    <div>
        <Router>
     
      
     <Routes>
     <Route path="/" element={<Home />} />
   
   
      
     </Routes>
   
 </Router>
    </div>
  )
}

export default CommonRoutes