import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import '../styles/Dashboard.css';

export const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'NORMAL_USER',
  });
  const [newStore, setNewStore] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    address: '',
    role: '',
  });

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/login');
      return;
    }
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/users/dashboard/stats');
      setStats(response.data);
    } catch (err) {
      setError('Failed to fetch dashboard stats');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users', {
        params: {
          page: 1,
          limit: 100,
          ...filters,
        },
      });
      setUsers(response.data.data);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  const fetchStores = async () => {
    try {
      const response = await api.get('/stores', {
        params: {
          page: 1,
          limit: 100,
          ...filters,
        },
      });
      setStores(response.data.data);
    } catch (err) {
      setError('Failed to fetch stores');
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/users', newUser);
      setNewUser({
        name: '',
        email: '',
        password: '',
        address: '',
        role: 'NORMAL_USER',
      });
      fetchUsers();
      alert('User created successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/stores', newStore);
      setNewStore({
        name: '',
        email: '',
        address: '',
      });
      fetchStores();
      alert('Store created successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create store');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h1>Admin Dashboard</h1>
        <div className="user-info">
          <span>{user?.email}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="sidebar">
          <button
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => {
              setActiveTab('users');
              fetchUsers();
            }}
          >
            Users
          </button>
          <button
            className={activeTab === 'stores' ? 'active' : ''}
            onClick={() => {
              setActiveTab('stores');
              fetchStores();
            }}
          >
            Stores
          </button>
        </div>

        <div className="main-content">
          {error && <div className="error-message">{error}</div>}

          {activeTab === 'dashboard' && stats && (
            <div className="dashboard-stats">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Users</h3>
                  <p className="stat-value">{stats.totalUsers}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Stores</h3>
                  <p className="stat-value">{stats.totalStores || 0}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Ratings</h3>
                  <p className="stat-value">{stats.totalRatings || 0}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="tab-content">
              <h2>Users Management</h2>
              <form onSubmit={handleAddUser} className="form-container">
                <h3>Add New User</h3>
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Name (20-60 chars)"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    required
                    minLength="20"
                    maxLength="60"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password (8-16 chars, uppercase + special)"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={newUser.address}
                    onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                    required
                  />
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  >
                    <option value="NORMAL_USER">Normal User</option>
                    <option value="ADMIN">Admin</option>
                    <option value="STORE_OWNER">Store Owner</option>
                  </select>
                </div>
                <button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Add User'}
                </button>
              </form>

              <div className="users-list">
                <h3>Users List</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.address}</td>
                        <td>{u.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'stores' && (
            <div className="tab-content">
              <h2>Stores Management</h2>
              <form onSubmit={handleAddStore} className="form-container">
                <h3>Add New Store</h3>
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Store Name (20-60 chars)"
                    value={newStore.name}
                    onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                    required
                    minLength="20"
                    maxLength="60"
                  />
                  <input
                    type="email"
                    placeholder="Store Email"
                    value={newStore.email}
                    onChange={(e) => setNewStore({ ...newStore, email: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={newStore.address}
                    onChange={(e) => setNewStore({ ...newStore, address: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Add Store'}
                </button>
              </form>

              <div className="stores-list">
                <h3>Stores List</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stores.map((store) => (
                      <tr key={store.id}>
                        <td>{store.name}</td>
                        <td>{store.email}</td>
                        <td>{store.address}</td>
                        <td>{store.averageRating?.toFixed(2) || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
