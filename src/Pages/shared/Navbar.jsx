import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ added
import { AuthContext } from './../../Provider/AuthProvider';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ hook for navigation

  const handleLogout = () => {
    logout();
    navigate("/"); // ✅ redirect to home after logout
  };

  const links = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/events">Events</Link></li>
      <li><Link to="/add-event">Add Event</Link></li>
      <li><Link to="/my-event">My Event</Link></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        {/* ... unchanged code ... */}
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        {!user ? (
          <Link to="/login" className="btn btn-neutral btn-sm">Sign In</Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.image} alt="profile" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li><span className="text-center">{user.name}</span></li>
              <li><button onClick={handleLogout}>Logout</button></li> 
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
