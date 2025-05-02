'use client';

import React from 'react';

const ErrorPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Something went wrong!</h1>
      <p className="mt-4">We encountered an error while processing your request. Please try again later.</p>
    </div>
  );
};

export default ErrorPage;
