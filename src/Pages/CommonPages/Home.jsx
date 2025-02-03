import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API } from '../../Constents/Constents';
import Navbar from '../../Components/Navbar';
import Theme from '../../Components/Theme';
import img from '../../assets/pexels-pixabay-158651.jpg';

function Home() {
    const [show, setShow] = useState(null);
 
  useEffect(() => {
    axios.get(`https://api.currentsapi.services/v1/latest-news?category=technology&apiKey=${API}`).then((response) => {
        console.log(response.data.news);

        setShow(response.data.results)
      });
  }, []);

  return (
    <div className='dark:bg-black bg-amber-300 dark:text-white min-h-screen  text-black'>
      <Navbar />
      <Theme />
      <section>
        <div
          className="h-[50vh] bg-cover bg-center flex items-center justify-start px-10"
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className='dark:bg-black bg-[#39ccc0] bg-opacity-50 p-6 rounded-lg text-white max-w-lg'>
            <h2 className='text-5xl font-bold mb-4'>Sajalu's News</h2>
            <p className='text-lg'>Get the latest news from trusted sources, all in one place. From breaking headlines to in-depth analysis, explore trending stories across politics, technology, sports, entertainment, and more.</p>
          </div>
        </div>
      </section>
      
      <section className='py-10 px-8 lg:flex lg:gap-10'>
        <div className='lg:w-2/3'>
          <div className='space-y-8'>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
              <img src={img} alt="" className='w-full h-60 object-cover rounded-lg' />
              <h4 className='text-xl font-semibold mt-4'>This is a W3C standards compliant free website template.</h4>
              <p className='text-gray-600 dark:text-gray-300 mt-2'>This template is distributed using a Website Template Licence, which allows you to use and modify the template for both personal and commercial use when you keep the provided credit links in the footer.</p>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {[1, 2, 3].map((_, index) => (
                <div key={index} className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center'>
                  <img className='w-full h-40 object-cover rounded-lg' src={img} alt="" />
                  <p className='mt-3 text-gray-600 dark:text-gray-300'>Nullamlacus dui ipsum conseqlo borttis non euisque morbipen.</p>
                  <button className='mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Read More</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className='lg:w-1/3 space-y-6 mt-10 lg:mt-0'>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div key={index} className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center'>
              <img src={img} alt="" className='w-24 h-24 object-cover rounded-lg' />
              <div className='ml-4'>
                <h3 className='text-lg font-semibold'>Indonectetus facilis leo.</h3>
                <p className='text-gray-600 dark:text-gray-300 text-sm'>Nullamlacus dui ipsum cons eque lobor ttis non euisque morbi penas dapi bulum.</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  ); 
}

export default Home;
