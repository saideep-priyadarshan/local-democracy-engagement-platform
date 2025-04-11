import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

function LegislationCard({ legislation }) {
  const formattedDate = legislation.dateProposed
    ? formatDistanceToNow(legislation.dateProposed.toDate(), {
        addSuffix: true,
      })
    : "recently";

  return (
    <div className="legislation-card">
      <div className="legislation-status">
        <span className={`status-badge status-${legislation.status}`}>
          {legislation.status}
        </span>
        <span className="legislation-date">{formattedDate}</span>
      </div>

      <h3 className="legislation-title">{legislation.title}</h3>

      <p className="legislation-summary">
        {legislation.plainLanguageSummary.substring(0, 150)}
        {legislation.plainLanguageSummary.length > 150 ? "..." : ""}
      </p>

      <div className="legislation-impact">
        <span className="impact-label">Impact:</span>
        <span className={`impact-value impact-${legislation.impactLevel}`}>
          {legislation.impactLevel}
        </span>
      </div>

      <div className="legislation-actions">
        <Link to={`/legislation/${legislation.id}`} className="btn btn-primary">
          Read More
        </Link>
        {legislation.representativeId && (
          <Link
            to={`/feedback/${legislation.representativeId}?topic=${legislation.id}`}
            className="btn btn-outline"
          >
            Give Feedback
          </Link>
        )}
      </div>
    </div>
  );
}

export default LegislationCard;
