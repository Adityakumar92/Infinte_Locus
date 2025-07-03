import React from 'react';

const ReviewCard = ({ review }) => {
  const { user, rating, comment, photo } = review;

  return (
    <div className="border rounded-md shadow-sm p-4 bg-white">
      <p className="font-semibold text-gray-800">{user?.name || 'Anonymous'}</p>
      
      <p className="text-sm text-gray-600 mt-1">
        Quality: <span className="font-medium">{rating.quality}</span> |{' '}
        Service: <span className="font-medium">{rating.service}</span> |{' '}
        Value: <span className="font-medium">{rating.value}</span>
      </p>
      
      <p className="mt-2 text-gray-700">{comment}</p>

      {photo && (
        <img
          src={`http://localhost:5000/uploads/${photo}`}
          alt="Review"
          className="mt-3 w-40 rounded-md border"
        />
      )}
    </div>
  );
};

export default ReviewCard;
