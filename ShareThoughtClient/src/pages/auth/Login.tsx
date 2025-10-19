import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { logo } from '../../assets/logo/logo';

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


const LoginPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState<string>(selectedCountry.code);
  useEffect(() => {
    setPhoneNumber(selectedCountry.code);
  }, [selectedCountry]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryName = event.target.value;
    const country = countries.find(c => c.name === countryName);
    if (country) {
      setSelectedCountry(country);
    }
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.startsWith(selectedCountry.code)) {
      setPhoneNumber(value);
    } else {
      setPhoneNumber(selectedCountry.code);
    }
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Logging in with: ${phoneNumber}`);
    // Example: alert(`Logging in with phone number: ${phoneNumber}`);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lime-50  font-sans">

      <header className="absolute top-10 mb-6">
        <div className="text-3xl font-medium text-green-600 flex items-center gap-3">
          <Link to="/">
                <img src={logo} alt="" className="w-60 " />
              </Link>
        </div>
      </header>

      <main className="w-full max-w-lg">

        <section className="p-8 bg-white shadow-lg rounded-xl flex flex-col items-center text-center">
          <h2 className="text-3xl text-gray-800">Enter phone number</h2>
          <p className="text-gray-600 mt-2 mb-6">
            Select a country and enter your phone number.
          </p>

          <form className="w-full max-w-sm flex flex-col gap-4" onSubmit={handleSubmit}>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span role="img" aria-label={`${selectedCountry.name} flag`}>{selectedCountry.flag}</span>
              </div>
              <select
                value={selectedCountry.name}
                onChange={handleCountryChange}
                className="w-full border border-gray-300 rounded-lg p-3 pl-10 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer"
              >
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="text-gray-500 text-xl" />
              </div>
            </div>
            
            {/* Phone Number Input */}
            <div className="relative">
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                aria-label="Phone number"
              />
            </div>
             <div className="relative">
              <input
                type="password"
            
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                aria-label="Password"
              />
            </div>


            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-full font-medium text-lg hover:bg-green-700 transition-colors mt-2"
            >
              Login
            </button>
          </form>
           <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <button 
            onClick={() => onNavigate('login')} 
            className="font-medium text-green-600 hover:underline"
          >
            Register
          </button>
        </p>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
