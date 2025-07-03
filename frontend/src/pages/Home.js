import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import BusinessCard from '../components/BusinessCard';

const Home = () => {
  const [businesses, setBusinesses] = useState([]);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinesses();
  }, [category, location]);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      let url = '/businesses';
      const params = [];

      if (category) params.push(`category=${category}`);
      if (location) params.push(`location=${location}`);
      if (params.length) url += `?${params.join('&')}`;

      const res = await API.get(url);
      setBusinesses(res.data);
    } catch (err) {
      console.error('Failed to fetch businesses:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Local Businesses</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Filter by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded-md w-full md:w-64"
        />
        <input
          type="text"
          placeholder="Filter by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded-md w-full md:w-64"
        />
      </div>

      {/* Business List */}
      {loading ? (
        <p className="text-center text-gray-500">Loading businesses...</p>
      ) : businesses.length === 0 ? (
        <p className="text-center text-gray-500">No businesses found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((biz) => (
            <BusinessCard key={biz._id} business={biz} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
