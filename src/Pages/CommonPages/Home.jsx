import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API } from '../../Constents/Constents';
import Navbar from '../../Components/Navbar';
import Theme from '../../Components/Theme';
import img from '../../assets/pexels-pixabay-158651.jpg';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    const [show, setShow] = useState([]);
    const [shows, setShows] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);
    
    useEffect(() => {
        if (show && show.length > 0) {
            const interval = setInterval(() => {
                setFade(true);
                setTimeout(() => {
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % show.length);
                    setFade(false);
                }, 500);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [show]);
    
    useEffect(() => {
        axios.get(`https://api.currentsapi.services/v1/latest-news?category=technology&apiKey=${API}`)
            .then((response) => {
                setShow(response.data.news || []);
            })
            .catch(error => console.error("Error fetching technology news:", error));
    }, []);

    useEffect(() => {
        axios.get(`https://api.currentsapi.services/v1/latest-news?category=politics&apiKey=${API}`)
            .then((response) => {
                setShows(response.data.news || []);
            })
            .catch(error => console.error("Error fetching politics news:", error));
    }, []);
 
    const navigate = useNavigate();

    const handleViewMore = (article) => {
        navigate("/viewmore", { state: { article } });
    };

    return (
        <div className='dark:bg-black bg-amber-300 dark:text-white min-h-screen text-black'>
            <Navbar />
            <Theme />
            
            <section>
                <div
                    className="h-[50vh] bg-cover bg-center md:flex items-center justify-start md:px-10"
                    style={{ backgroundImage: `url(${img})` }}
                >
                    <div className='dark:bg-black bg-[#39ccc0] bg-opacity-50 p-6 rounded-lg text-white max-w-lg'>
                        <h2 className='mb:text-5xl text-2xl font-bold mb-4'>Trend Press</h2>
                        <p className='mb:text-lg'>
                            Get the latest news from trusted sources, all in one place. From breaking headlines to in-depth analysis, explore trending stories across politics, technology, sports, entertainment, and more.
                        </p>
                    </div>
                </div>
            </section>

            <section className='py-10 px-8 lg:flex lg:gap-10'>
                <div className='lg:w-2/3'>
                    <div className='space-y-8'>
                        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
                            {show.length > 5 ? (
                                <div className={` transition-opacity duration-1000 ${fade ? "opacity-0" : "opacity-100"}`}>
                                    <p>{show && show[currentIndex] ? show[currentIndex].author : ""}</p>
                                    <img 
                                        src={show && show[currentIndex] ? show[currentIndex].image : ""} 
                                        alt="News" 
                                        className={`w-full h-60 object-cover rounded-lg transition-all duration-1000 ${fade ? "opacity-0" : "opacity-100"}`} 
                                    />
                                    <p className={`text-gray-500 mt-2 ${fade ? "opacity-0" : "opacity-100"}`}> 
                                        {show && show[currentIndex] ? show[currentIndex].published.split(" ").slice(0,2).join(" ") : "No Date Available"} 
                                    </p>
                                    <h4 className={`text-xl font-semibold mt-4 ${fade ? "opacity-0" : "opacity-100"}`}>
                                        {show && show[currentIndex] ? show[currentIndex].title : "Loading..."}
                                    </h4>
                                    <p className={`text-gray-600 dark:text-gray-300 mt-2 ${fade ? "opacity-0" : "opacity-100"}`}>
                                        {show && show[currentIndex] ? show[currentIndex].description : "No description available"}   
                                    </p>
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center">Loading news...</p>
                            )}
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            {show.length > 3 ? show.slice(1, 4).map((item, index) => (
                                <div key={index} className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center '>
                                    <p>{item.author}</p>
                                    <img 
                                        className='w-full h-40 object-cover rounded-lg' 
                                        src={item?.image || img} 
                                        alt="News"
                                    />
                                    <p className='text-gray-500 mt-2'>{item?.published ? item.published.split(" ").slice(0,2).join(" ") : "No Date Available"}</p>
                                    <p className='mt-3 text-gray-600 dark:text-gray-300'>{item?.title || "No Title"}</p>
                                    <button onClick={() => handleViewMore(item)} className='mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
                                        Read More
                                    </button>
                                </div>
                            )) : (
                                <p className="text-gray-500 text-center col-span-3">Loading news...</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className='lg:w-1/3 space-y-6 mt-10 lg:mt-0'>
                    {shows.length > 0 ? (
                        shows.slice(0, 5).map((item, index) => (
                            <div key={index} className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center'>
                                <img 
                                    src={item?.image} 
                                    alt="News" 
                                    className='w-24 h-24 object-cover rounded-lg' 
                                />
                                <div className='ml-4'>
                                    <p className='text-gray-500 mt-2'>{item?.published ? item.published.split(" ").slice(0,2).join(" ") : "No Date Available"}</p>
                                    <h3 className='text-lg font-semibold'>{item?.title || "No Title"}</h3>
                                    <p className='text-gray-600 dark:text-gray-300 text-sm'>
                                        {item?.description ? (
                                            <>
                                                {item.description.split(" ").slice(0, 8).join(" ")} 
                                                <Link to='/viewmore' state={{ article: item }} className='text-red-400'>...Read more</Link>
                                            </>
                                        ) : (
                                            "No Description Available"
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">Loading news...</p>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Home;
