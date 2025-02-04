import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../Pages/CommonPages/Home';
import News from '../Pages/CommonPages/News';
import ViewMore from '../Pages/CommonPages/VieMore';
import SavedData from '../Pages/CommonPages/SavedData';

function CommonRoutes() {
  return (
    <div>
        <Router>
     
      
     <Routes>
     <Route path="/" element={<Home />} />


     <Route path="/news" element={<News />} />
     <Route path="/viewmore" element={<ViewMore />} />
     <Route path="/saved" element={<SavedData />} />
       
   
      
     </Routes>
   
 </Router>
    </div>
  )
}

export default CommonRoutes