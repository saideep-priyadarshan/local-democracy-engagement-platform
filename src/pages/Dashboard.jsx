import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { subscribeToNotifications } from "../services/notifService";
import { getLegislationSummaries } from "../services/legisService";
import NotificationCard from "../components/NotifCard";
import LegislationCard from "../components/LegisCard";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { currentUser, userProfile } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [legislation, setLegislation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};

    const fetchDashboardData = async () => {
      try {
        if (
          userProfile &&
          userProfile.neighborhoods &&
          userProfile.neighborhoods.length > 0
        ) {
          unsubscribe = subscribeToNotifications(
            currentUser.uid,
            userProfile.neighborhoods,
            (newNotifications) => {
              setNotifications(newNotifications);
            }
          );

          const legislationData = await getLegislationSummaries(
            userProfile.neighborhoods,
            1,
            5
          );
          setLegislation(legislationData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();

    return () => {
      unsubscribe();
    };
  }, [currentUser, userProfile]);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Welcome, {userProfile?.displayName || "Citizen"}</h1>

          {(!userProfile?.neighborhoods ||
            userProfile.neighborhoods.length === 0) && (
            <div className="onboarding-message">
              <p>Start by selecting your neighborhoods to receive updates.</p>
              <Link to="/neighborhoods" className="btn btn-primary">
                Choose Neighborhoods
              </Link>
            </div>
          )}
        </header>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Recent Notifications</h2>
            <Link to="/notifications">View All</Link>
          </div>

          <div className="notifications-container">
            {notifications.length > 0 ? (
              notifications
                .slice(0, 3)
                .map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                  />
                ))
            ) : (
              <p>No new notifications.</p>
            )}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Recent Legislation</h2>
            <Link to="/legislation">View All</Link>
          </div>

          <div className="legislation-container">
            {legislation.length > 0 ? (
              legislation.map((item) => (
                <LegislationCard key={item.id} legislation={item} />
              ))
            ) : (
              <p>No legislation updates for your neighborhoods.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
