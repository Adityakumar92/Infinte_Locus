import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import ReviewCard from '../components/ReviewCard';

const BusinessDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    quality: '',
    service: '',
    value: '',
    comment: '',
    photo: null
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusiness();
    fetchReviews();
  }, [id]);

  const fetchBusiness = async () => {
    try {
      const res = await API.get(`/businesses/${id}`);
      setBusiness(res.data);
    } catch (err) {
      console.error('Error fetching business:', err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/reviews/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const form = new FormData();
    form.append('quality', formData.quality);
    form.append('service', formData.service);
    form.append('value', formData.value);
    form.append('comment', formData.comment);
    if (formData.photo) form.append('photo', formData.photo);

    try {
      await API.post(`/reviews/${id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage('Review submitted successfully. Awaiting admin approval.');
      setFormData({ quality: '', service: '', value: '', comment: '', photo: null });
    } catch (err) {
      console.error('Error submitting review:', err);
      setMessage('Failed to submit review.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {loading ? (
        <p className="text-center">Loading business details...</p>
      ) : business ? (
        <>
          {/* Business Info */}
          <h2 className="text-2xl font-bold mb-2">{business.name}</h2>
          <p className="text-gray-600 mb-1">{business.category} • {business.location}</p>
          <p className="text-yellow-600 font-medium mb-4">
            ⭐ {business.averageRating || 'N/A'}
          </p>
          <p className="mb-6 text-gray-700">{business.description}</p>

          {/* Reviews */}
          <h3 className="text-xl font-semibold mb-3">Approved Reviews</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <div className="space-y-4 mb-10">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          )}

          {/* Review Form */}
          {user ? (
            <>
              <h3 className="text-xl font-semibold mb-3">Submit Your Review</h3>
              {message && <p className="text-blue-600 mb-2">{message}</p>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="number"
                    name="quality"
                    placeholder="Quality (1-5)"
                    value={formData.quality}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded-md w-full"
                    min="1" max="5"
                  />
                  <input
                    type="number"
                    name="service"
                    placeholder="Service (1-5)"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded-md w-full"
                    min="1" max="5"
                  />
                  <input
                    type="number"
                    name="value"
                    placeholder="Value (1-5)"
                    value={formData.value}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded-md w-full"
                    min="1" max="5"
                  />
                </div>
                <textarea
                  name="comment"
                  placeholder="Your review..."
                  value={formData.comment}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded-md"
                />
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit Review
                </button>
              </form>
            </>
          ) : (
            <p className="text-center text-sm text-gray-600 mt-4">
              <a href="/login" className="text-blue-600 hover:underline">Login</a> to submit a review.
            </p>
          )}
        </>
      ) : (
        <p className="text-center text-red-600">Business not found.</p>
      )}
    </div>
  );
};

export default BusinessDetail;
