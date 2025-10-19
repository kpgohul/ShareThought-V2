import React from 'react';
import { useAuth } from '../providers/AuthProvider';

const Home: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">Main Page</h1>
      <p className="text-xl text-gray-700 mb-8">Welcome to ShareThought!</p>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
