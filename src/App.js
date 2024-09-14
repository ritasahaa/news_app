import React, { useState, useEffect } from 'react';
import ArticleCard from './components/ArticleCard';
import FilterForm from './components/FilterForm';
import './App.css';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [queryParams, setQueryParams] = useState({
    q: 'sports',
    country: 'india',
    sortby: 'publishedAt',
    max: 10,
  });

  const apiKey = 'b99a90b50a8eb281bde3d79221755c09';

  // Read the environment variable to disable API calls
  const disableApiCall = process.env.REACT_APP_DISABLE_API_CALL === 'true';

  // Function to build the API URL based on query parameters
  const buildApiUrl = (params) => {
    const { q, country, sortby, max } = params;
    return `https://gnews.io/api/v4/search?q=${q}&lang=en&country=${country}&max=${max}&apikey=${apiKey}&sortby=${sortby}`;
  };

  // Function to fetch data from the API
  const fetchData = async (params) => {
    // Skip the API call if the disableApiCall variable is true
    if (disableApiCall) {
      console.log('API call is disabled by environment variable.');
      return;
    }

    console.log('Fetching data with parameters:', params); // Debug log

    try {
      const response = await fetch(buildApiUrl(params));
      const data = await response.json();
      if (data.articles) {
        setArticles(data.articles);
        console.log('Articles fetched:', data.articles); // Debug log
      } else {
        setArticles([]);
        console.log('No articles found'); // Debug log
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setArticles([]);
    }
  };

  // Initial data fetch when component mounts
  useEffect(() => {
    fetchData(queryParams);
    // Empty dependency array means this useEffect runs only once on mount
  }, []);

  // Function to update queryParams and fetch data
  const updateQueryParams = (params) => {
    const newParams = {
      ...queryParams,
      ...params,
    };

    // Update state first, then fetch with the new params
    setQueryParams(newParams);
    fetchData(newParams); // Pass the updated params directly
  };

  return (
    <div className="app">
      <h1 className="app-title">Latest News</h1>
      <FilterForm queryParams={queryParams} updateQueryParams={updateQueryParams} />
      <div className="articles-container">
        {articles.length > 0 ? (
          articles.map((article, index) => <ArticleCard key={index} article={article} />)
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
