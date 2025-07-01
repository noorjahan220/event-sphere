import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";



const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      alert(response.data.message);
      login(response.data.user);
      form.reset();
      navigate("/"); 
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content w-full flex justify-center px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Login</h1>
            <form onSubmit={handleLogin}>
              <div>
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="btn btn-neutral w-full mt-4" type="submit">
                Login
              </button>
              <Link to="/register" className="text-center block mt-4">
                  Create an account!
                </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
