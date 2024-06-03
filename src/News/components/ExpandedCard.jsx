import "./ExpendedCard.css";

export function ExpandedCard({ newsData }) {
  const newsItem = newsData[1];

  return (
    <div className="container">
      <div className="image-container">
        <img src={newsItem?.image_url} alt="Interview" className="image" />
      </div>
      <div className="text-container">
        <h1>{newsItem?.title}</h1>
        <p>{newsItem?.description.substring(0, 60)}........</p>
        <p className="category">Movies • 4 min read</p>
      </div>
    </div>
  );
}
