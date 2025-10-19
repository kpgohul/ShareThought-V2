import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const Layout: React.FC = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideNavbar && <Navbar />}
      <main >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
