import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import '../styles/Dashboard.css';

export const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ratings, setRatings] = useState({});
  const [showRatingForm, setShowRatingForm] = useState({});

  useEffect(() => {
    if (!user || user.role !== 'NORMAL_USER') {
      navigate('/login');
      return;
    }
    fetchStores();
  }, [sortBy, sortOrder]);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const params = {
        page: 1,
        limit: 100,
        sortBy,
        sortOrder,
      };

      if (searchTerm) {
        if (searchTerm.includes('@')) {
          params.email = searchTerm;
        } else if (searchTerm.length < 20) {
          params.name = searchTerm;
        } else {
          params.address = searchTerm;
        }
      }

      const response = await api.get('/stores', { params });
      setStores(response.data.data);

      // Fetch current user's ratings for each store
      response.data.data.forEach(async (store) => {
        const ratingResponse = await api.get(`/ratings/my-rating/${store.id}`);
        if (ratingResponse.data) {
          setRatings((prev) => ({ ...prev, [store.id]: ratingResponse.data }));
        }
      });
    } catch (err) {
      setError('Failed to fetch stores');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStores();
  };

  const handleSubmitRating = async (storeId, ratingValue) => {
    try {
      await api.post('/ratings', {
        rating: ratingValue,
        storeId,
      });
      setShowRatingForm({ ...showRatingForm, [storeId]: false });
      fetchStores();
      alert('Rating submitted successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit rating');
    }
  };

  const handleUpdateRating = async (storeId, newRating) => {
    try {
      await api.patch(`/ratings/${storeId}`, {
        rating: newRating,
      });
      setShowRatingForm({ ...showRatingForm, [storeId]: false });
      fetchStores();
      alert('Rating updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update rating');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h1>Store Ratings</h1>
        <div className="user-info">
          <span>{user?.email}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <div className="stores-dashboard">
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search by Name or Address"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="sort-section">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Sort by Name</option>
              <option value="address">Sort by Address</option>
            </select>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="stores-grid">
          {loading ? (
            <p>Loading stores...</p>
          ) : stores.length > 0 ? (
            stores.map((store) => (
              <div key={store.id} className="store-card">
                <h3>{store.name}</h3>
                <p className="store-email">
                  <strong>Email:</strong> {store.email}
                </p>
                <p className="store-address">
                  <strong>Address:</strong> {store.address}
                </p>
                <p className="store-rating">
                  <strong>Overall Rating:</strong> {parseFloat(store.averageRating || 0).toFixed(1) || 'N/A'} ⭐
                </p>
                {ratings[store.id] && (
                  <p className="user-rating">
                    <strong>Your Rating:</strong> {ratings[store.id].rating} ⭐
                  </p>
                )}

                {!ratings[store.id] ? (
                  <div>
                    {showRatingForm[store.id] ? (
                      <div className="rating-form">
                        <select
                          id={`rating-${store.id}`}
                          defaultValue="5"
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            handleSubmitRating(store.id, value);
                          }}
                        >
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </select>
                      </div>
                    ) : (
                      <button onClick={() => setShowRatingForm({ ...showRatingForm, [store.id]: true })}>
                        Submit Rating
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    {showRatingForm[store.id] ? (
                      <div className="rating-form">
                        <select
                          id={`update-rating-${store.id}`}
                          defaultValue={ratings[store.id].rating}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            handleUpdateRating(store.id, value);
                          }}
                        >
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </select>
                      </div>
                    ) : (
                      <button onClick={() => setShowRatingForm({ ...showRatingForm, [store.id]: true })}>
                        Modify Rating
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No stores found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
