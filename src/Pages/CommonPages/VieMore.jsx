import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Theme from "../../Components/Theme";

function ViewMore() {
  const location = useLocation();
  const article = location.state?.article || {};
  const [savedArticles, setSavedArticles] = useState([]);

  
  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];
    setSavedArticles(storedArticles);
  }, []);

  const handleSaveArticle = () => {
    let savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];

 
    if (!savedArticles.some((saved) => saved.id === article.id)) {
      savedArticles.push(article);
      localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
      setSavedArticles(savedArticles);
      alert("Article saved successfully!");
    } else {
      alert("Article is already saved!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 px-4 py-10">
      <Theme />
      <div className="max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full">
        <img
          src={article.image || "https://via.placeholder.com/800x400"}
          alt={article.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{article.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{article.description || "No description available."}</p>

          <div className="flex mt-6">
            <button
              onClick={handleSaveArticle} 
              className="mt-2 py-1 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMore;
