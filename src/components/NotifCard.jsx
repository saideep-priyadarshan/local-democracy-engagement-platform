import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

function NotificationCard({ notification }) {
  const formattedDate = notification.createdAt
    ? formatDistanceToNow(notification.createdAt.toDate(), { addSuffix: true })
    : "recently";

  return (
    <div className="notification-card">
      <div className="notification-header">
        <span className={`notification-type ${notification.type}`}>
          {notification.type}
        </span>
        <span className="notification-time">{formattedDate}</span>
      </div>

      <h3 className="notification-title">{notification.title}</h3>

      <p className="notification-content">{notification.content}</p>

      {notification.legislationId && (
        <Link
          to={`/legislation/${notification.legislationId}`}
          className="notification-link"
        >
          View Legislation
        </Link>
      )}

      {notification.eventId && (
        <Link
          to={`/events/${notification.eventId}`}
          className="notification-link"
        >
          View Event Details
        </Link>
      )}

      <div className="notification-neighborhood">
        <i className="fas fa-map-marker-alt"></i>
        {notification.neighborhoodName}
      </div>
    </div>
  );
}

export default NotificationCard;
