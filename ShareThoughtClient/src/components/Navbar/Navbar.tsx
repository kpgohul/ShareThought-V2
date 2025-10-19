import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { logo } from '../../assets/logo/logo';

const Navbar = () => {
     const { isAuthenticated, logout } = useAuth();
  return (
   <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold text-gray-900">
              <Link to="/">
                <img src={logo} alt="" className="w-40 " />
              </Link>
            </h1>
            <nav>
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      text="Log in"
                      variant="outline"
                      onClick={() => console.log("Login")}
                    />
                  </Link>
                  <Link
                    to="/register"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>
  )
}

export default Navbar