import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NeighborhoodSelection from "./pages/NeighborhoodSelection";
import Notifications from "./pages/Notifications";
import Legislation from "./pages/Legislation";
import LegislationDetail from "./pages/LegislationDetail";
import FeedbackForm from "./pages/FeedbackForm";
import UserProfile from "./pages/UserProfile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/neighborhoods"
            element={
              <PrivateRoute>
                <NeighborhoodSelection />
              </PrivateRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <Notifications />
              </PrivateRoute>
            }
          />

          <Route
            path="/legislation"
            element={
              <PrivateRoute>
                <Legislation />
              </PrivateRoute>
            }
          />

          <Route
            path="/legislation/:id"
            element={
              <PrivateRoute>
                <LegislationDetail />
              </PrivateRoute>
            }
          />

          <Route
            path="/feedback/:representativeId"
            element={
              <PrivateRoute>
                <FeedbackForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
