import React, { Suspense, useEffect, useState } from "react";
import { ExpandedCard } from "./components/ExpandedCard";
import { CollapsedCard } from "./components/CollapsedCard";
// import { CardsGroupGrid, CardsGroupSkeleton } from "../components/CardsGroup";
import axios from "axios";

export default function News() {
  const [newsData, setNewsData] = useState([]);

  const [totalNew, setTotalNew] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://newsdata.io/api/1/latest?apikey=pub_4527828ee4963221b617518847599dcd37752&q=law&country=in"
        );
        const result = await response.json();
        setTotalNew(result.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://newsdata.io/api/1/latest?apikey=pub_4527828ee4963221b617518847599dcd37752&q=law&country=in"
      )
      .then((response) => {
        setNewsData(response.data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // Ensure data exists and is an array
  const newsItems = totalNew && Array.isArray(totalNew) ? totalNew : [];

  return (
    <div
      style={{ position: "inherit", zIndex: 2, width: "80%", margin: "auto" }}
    >
      <div>
        <ExpandedCard newsData={newsData} />
      </div>
      <div>
        <h2>Latest News</h2>
        <div className="articles">
          {newsItems.map((newsData) => (
            <CollapsedCard key={newsData.id} newsData={newsData} />
          ))}
        </div>
      </div>
    </div>
  );
}
