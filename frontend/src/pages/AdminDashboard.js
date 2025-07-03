import React, { useContext, useEffect, useState } from 'react';
import API from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import ReviewCard from '../components/ReviewCard';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Redirect if user is not admin
  useEffect(() => {
    if (!user) return;
    if (user.role !== 'admin') {
      navigate('/');
    } else {
      fetchPendingReviews();
    }
  }, [user]);

  const fetchPendingReviews = async () => {
    try {
      const res = await API.get('/reviews/all'); // Admin-only route
      const filtered = res.data.filter((review) => review.status === 'pending');
      setPendingReviews(filtered);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setMessage('Failed to load pending reviews.');
    }
  };

  const handleApprove = async (id) => {
    try {
      await API.patch(`/reviews/${id}/approve`);
      setPendingReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error('Error approving review:', err);
    }
  };

  const handleReject = async (id) => {
    try {
      await API.patch(`/reviews/${id}/reject`);
      setPendingReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error('Error rejecting review:', err);
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {message && <p className="text-center text-red-600">{message}</p>}

      {pendingReviews.length === 0 ? (
        <p className="text-center text-gray-500">No pending reviews.</p>
      ) : (
        <div className="space-y-6">
          {pendingReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-md rounded-lg p-4 space-y-3 border"
            >
              <ReviewCard review={review} />
              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(review._id)}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(review._id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
