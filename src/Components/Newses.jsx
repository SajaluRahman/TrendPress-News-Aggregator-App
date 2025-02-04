import React from "react";
import { useNavigate } from "react-router-dom";

function Newses({ show }) {
  const navigate = useNavigate();

  const handleViewMore = (article) => {
    navigate("/viewmore", { state: { article } }); 
  };

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
      {show.map((article, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <img
            src={article.image || "https://via.placeholder.com/400x250"}
            alt={article.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold dark:text-white">{article.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {article.description ? article.description.slice(0, 100) + "..." : "No description available"}
            </p>
            <button
              onClick={() => handleViewMore(article)}
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              View More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Newses;
