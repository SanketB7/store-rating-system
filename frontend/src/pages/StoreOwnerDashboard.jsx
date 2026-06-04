import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import '../styles/Dashboard.css';

export const StoreOwnerDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    if (!user || user.role !== 'STORE_OWNER') {
      navigate('/login');
      return;
    }
    fetchStoreRatings();
  }, [page]);

  const fetchStoreRatings = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/ratings/store/${user.id}`, {
        params: { page, limit: 10 },
      });
      setRatings(response.data.ratings);
      setAverageRating(response.data.averageRating);
    } catch (err) {
      setError('Failed to fetch ratings');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/update-password', passwordData);
      alert('Password updated successfully');
      setShowPasswordForm(false);
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h1>Store Owner Dashboard</h1>
        <div className="user-info">
          <span>{user?.email}</span>
          <button onClick={() => setShowPasswordForm(!showPasswordForm)} className="update-pwd-btn">
            Update Password
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {showPasswordForm && (
        <form onSubmit={handleUpdatePassword} className="password-form">
          <input
            type="password"
            placeholder="Current Password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="New Password (8-16 chars, uppercase + special)"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            required
          />
          <button type="submit">Update Password</button>
          <button type="button" onClick={() => setShowPasswordForm(false)}>
            Cancel
          </button>
        </form>
      )}

      <div className="store-owner-content">
        {error && <div className="error-message">{error}</div>}

        <div className="rating-summary">
          <h2>Your Store Ratings Summary</h2>
          <div className="summary-card">
            <h3>Average Rating</h3>
            <p className="avg-rating">{averageRating.toFixed(2)} ⭐</p>
          </div>
        </div>

        <div className="ratings-list">
          <h2>User Ratings for Your Store</h2>
          {loading ? (
            <p>Loading ratings...</p>
          ) : ratings.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Rating</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {ratings.map((rating) => (
                  <tr key={rating.id}>
                    <td>{rating.user.name}</td>
                    <td>{rating.user.email}</td>
                    <td>{rating.rating} ⭐</td>
                    <td>{new Date(rating.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No ratings yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
