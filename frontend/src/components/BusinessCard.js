import React from 'react';
import { Link } from 'react-router-dom';

const BusinessCard = ({ business }) => {
  return (
    <Link
      to={`/business/${business._id}`}
      className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200"
    >
      <h3 className="text-xl font-bold mb-1">{business.name}</h3>
      <p className="text-gray-600 text-sm mb-1">
        {business.category} • {business.location}
      </p>
      <p className="text-yellow-600 font-medium text-sm">
        ⭐ {business.averageRating || 'N/A'}
      </p>
    </Link>
  );
};

export default BusinessCard;
