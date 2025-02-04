import React, { useCallback, useEffect, useState } from "react";
import { API } from "../../Constents/Constents";
import axios from "axios";
import Theme from "../../Components/Theme";
import Newses from "../../Components/Newses";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [categoryOption, setCategoryOption] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdowns, setShowDropdowns] = useState(false);

  const CATEGORIES_OPTIONS = ["politics", "technology", "sports", "business"];
  const SORT_OPTIONS = ["Newest to Oldest", "Oldest to Newest", "Trending", "Default"];

  const handleSortChange = (option) => {
    setSortOption(option);
    setShowDropdown(false);

    if (option === "Trending") {
      setCategory("trending");
    } else if (option === "Default") {
      setCategory("general");
    } else {
      const sortedNews = [...news].sort((a, b) =>
        option === "Oldest to Newest"
          ? new Date(a.published) - new Date(b.published)
          : new Date(b.published) - new Date(a.published)
      );
      setNews(sortedNews);
    }
  };

  const handleCategoryChange = (option) => {
    setCategory(option);
    setCategoryOption(option);
    setShowDropdowns(false);
  };

 
  const fetchNews = useCallback(() => {
    setLoading(true);
    axios
      .get(`https://api.currentsapi.services/v1/search?category=${category}&keywords=${searchQuery}&apiKey=${API}`)
      .then((response) => {
        console.log("Fetched News:", response.data.news);
        setNews(response.data.news || []);
      })
      .catch((error) => console.error("Error fetching news:", error))
      .finally(() => setLoading(false));
  }, [category, searchQuery]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <div className="bg-[#d1d1d1] dark:bg-black min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <Theme />
        <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">Latest News</h1>
        
        <div className="flex flex-wrap gap-4 items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md md:flex-nowrap">
  <input
    type="search"
    placeholder="Search news..."
    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white w-full sm:w-auto"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />

  <div className="relative w-full sm:w-auto">
    <button
      className="w-full sm:w-auto px-4 py-2 border rounded-lg bg-black text-white font-semibold flex items-center justify-between dark:border-none dark:bg-indigo-600"
      onClick={() => setShowDropdowns(!showDropdowns)}
    >
      <span>{categoryOption || "Categories"}</span>
      <svg
        className="w-4 h-4 ml-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
    {showDropdowns && (
      <div className="absolute left-0 top-full mt-2 bg-white dark:text-white dark:bg-neutral-700 border rounded-md shadow-md w-full sm:w-44 z-50">
        <ul className="py-2">
          {CATEGORIES_OPTIONS.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              onClick={() => handleCategoryChange(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

  <div className="relative w-full sm:w-auto">
    <button
      className="w-full sm:w-auto px-4 py-2 border rounded-lg bg-black text-white font-semibold flex items-center justify-between dark:border-none dark:bg-indigo-600"
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <span>{sortOption || "Sort By"}</span>
      <svg
        className="w-4 h-4 ml-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
    {showDropdown && (
      <div className="absolute left-0 top-full mt-2 bg-white dark:text-white dark:bg-neutral-700 border rounded-md shadow-md w-full sm:w-44 z-50">
        <ul className="py-2">
          {SORT_OPTIONS.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              onClick={() => handleSortChange(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
</div>


        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="w-20 h-20 border-8 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : news.length === 0 ? (
          <p className="text-center text-lg text-gray-500 dark:text-gray-300">No news available.</p>
        ) : (
          <Newses show={news} />
        )}
      </div>
    </div>
  );
}

export default News;
