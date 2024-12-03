// src/News.js
import React, { useEffect, useState } from "react";
import { ExpandedCard } from "./components/ExpandedCard";
import { CollapsedCard } from "./components/CollapsedCard";
import axios from "axios";
import "./index.css";
import { Helmet } from "react-helmet";

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [totalNew, setTotalNew] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://newsdata.io/api/1/latest?apikey=pub_4527828ee4963221b617518847599dcd37752&q=indian law&country=in"
      );
      const result = await response.json();
      setTotalNew(result.results);
      console.log(result.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://newsdata.io/api/1/latest?apikey=pub_4527828ee4963221b617518847599dcd37752&q=indian law&country=in"
      )
      .then((response) => {
        setNewsData(response.data.results);
        console.log(response.data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
    fetchData();
  }, []);

  const newsItems = totalNew && Array.isArray(totalNew) ? totalNew : [];

  return (
    <div className="news-container">
      <Helmet>
        <title>Legal Industry Updates and Insights </title>
        <meta
          name="description"
          content="Our news section provides you with the latest legal industry news and insights, all conveniently located in one place."
        />
        <meta
          name="keywords"
          content="provides, you, privacy policies, business law services, news, legal compliance, law firm automation, legal, insights, industry"
        />
      </Helmet>
      <div>
        <ExpandedCard newsData={newsData} />
      </div>
      <div>
        <h2>Legal News</h2>
        <div className="articles">
          {newsItems.map((newsData) => (
            <CollapsedCard key={newsData.id} newsData={newsData} />
          ))}
        </div>
      </div>
    </div>
  );
}
