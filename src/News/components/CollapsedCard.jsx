import "./index.css";

export function CollapsedCard({ newsData }) {
  console.log(newsData?.image_url);

  return (
    <div className="card" key={newsData?.id}>
      {newsData.image_url ? (
        <img src={newsData?.image_url} alt={newsData?.title} />
      ) : (
        <div className="placeholder">
          <span>{newsData?.title}</span>
        </div>
      )}
      <div className="card-content">
        <div className="card-header">
          <span className="read-time">{newsData?.readTime}</span>
        </div>
        <h3>{newsData?.title}</h3>
        <p>{newsData?.description?.substring(0, 100)}.........</p>
      </div>
    </div>
  );
}
