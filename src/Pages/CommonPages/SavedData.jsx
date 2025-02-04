import React, { useEffect, useState } from 'react';

function SavedData() {
    const [savedArticles, setSavedArticles] = useState([]);

    useEffect(() => {
        const articles = JSON.parse(localStorage.getItem("savedArticles")) || [];
        setSavedArticles(articles);
    }, []);

    return (
        <div className="dark:bg-black bg-amber-300 dark:text-white min-h-screen text-black p-8">
            <h2 className="text-2xl font-bold mb-6">Saved Articles</h2>
            {savedArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {savedArticles.map((article, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <img className="w-full h-40 object-cover rounded-lg" src={article.image} alt="News" />
                            <p className="text-gray-500 mt-2">{article.published ? article.published.split(" ").slice(0, 2).join(" ") : "No Date Available"}</p>
                            <h4 className="text-lg font-semibold mt-3">{article.title}</h4>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">{article.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center">No saved articles found.</p>
            )}
        </div>
    );
}

export default SavedData;
