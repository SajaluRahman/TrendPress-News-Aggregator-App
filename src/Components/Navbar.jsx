import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faBars} from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white w-full p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Trend Press</Link>
        
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faBars} />}
          </button>
        </div>
        
        <div className={`md:flex md:items-center space-x-6 absolute md:static bg-gray-900 md:bg-transparent w-full left-0 md:w-auto transition-transform duration-300 ease-in-out ${isOpen ? 'top-15 z-20' : '-top-60'}`}>
          <Link to='/ '  className="block px-4 py-2 hover:text-gray-400">Home</Link>
          <Link to='/news' className="block px-4 py-2 hover:text-gray-400">News</Link>
          <Link to='/saved' className="block px-4 py-2 hover:text-gray-400">Saved News</Link>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;