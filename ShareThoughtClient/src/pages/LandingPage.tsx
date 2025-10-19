import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">Welcome to ShareThought</h1>
      <p className="text-xl text-gray-700 mb-8">The best place to share your thoughts.</p>
      <div>
        <Link to="/login" >
          <Button text="Log in" variant="outline" onClick={() => console.log('Login')} />
        </Link>
        <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
