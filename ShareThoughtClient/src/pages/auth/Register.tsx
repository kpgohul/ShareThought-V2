import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { logo } from '../../assets/logo/logo';

// --- Helper Data and Types ---
interface Country {
  name: string;
  code: string;
  flag: string;
}

const countries: Country[] = [
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
];

// --- Register Page Component ---
// Added `onNavigate` prop to handle switching back to the login page
const RegisterPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  // --- State from Login Page ---
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState<string>(selectedCountry.code);

  // --- New State for Register Page ---
  const [email, setEmail] = useState(''); // Optional
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // --- Effects ---
  // Update the phone number prefix whenever the selected country changes.
  useEffect(() => {
    setPhoneNumber(selectedCountry.code);
  }, [selectedCountry]);
  
  // --- Event Handlers ---
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryName = event.target.value;
    const country = countries.find(c => c.name === countryName);
    if (country) {
      setSelectedCountry(country);
    }
  };
  
  // Prevent the user from deleting the country code prefix.
  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.startsWith(selectedCountry.code)) {
      setPhoneNumber(value);
    } else {
      setPhoneNumber(selectedCountry.code);
    }
  };

  // Updated submit handler for registration
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 1. Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return; // Stop the submission
    }
    
    // 2. Clear any previous errors
    setError('');

    // 3. In a real app, you would handle registration logic here
    console.log('Registering with', {
      country: selectedCountry.name,
      phoneNumber,
      email: email || 'Not provided', // Handle optional email
      password,
    });

    // 4. Navigate to the login page on successful registration
    alert('Registration successful! Redirecting to login...');
    onNavigate('login'); // Use the onNavigate prop
  };

  return (
    // Using the same background as the login page
    <div className="flex flex-col items-center justify-center min-h-screen bg-lime-50 p-6 font-sans">
      <header className="absolute top-50 mb-6">
        <div className="text-3xl font-medium text-green-600 flex items-center gap-3">
          <Link to="/">
                <img src={logo} alt="" className="w-60 " />
              </Link>
        </div>
      </header>
      {/* Using the same card style */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <div className="flex flex-col items-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">Create an Account</h1>
            <p className="text-gray-500">Join us and start sharing your thoughts!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* --- Country and Phone Fields (from Login) --- */}
          <div className="relative">
             <label className="block text-sm font-medium text-gray-700 mb-1">Country/Region</label>
             <div className="absolute inset-y-0 left-0 top-7 flex items-center pl-3 pointer-events-none">
                <span role="img" aria-label={`${selectedCountry.name} flag`}>{selectedCountry.flag}</span>
              </div>
            <select
              value={selectedCountry.name}
              onChange={handleCountryChange}
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer"
            >
              {countries.map((country) => (
                <option key={country.name} value={country.name}>{country.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 top-7 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="text-gray-500 text-xl" />
            </div>
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* --- New Fields for Register --- */}

          {/* Email Input (Optional) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (Optional)</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Error Message Display */}
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
            >
              Register
            </button>
          </div>
        </form>
        
        {/* Link back to Login Page */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <button 
            onClick={() => onNavigate('/login')} 
            className="font-medium text-green-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;