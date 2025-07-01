import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const Register = () => {
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const image = form.image.value;
    const password = form.password.value;

    try {
      const response = await axios.post("https://event-sphere-server-9srdzaeyd-noorjahan-akters-projects.vercel.app/register", {
        name,
        email,
        password,
        image,
      });

      if (response.status === 201) {
        alert("Registration successful!");
        form.reset();
        login(response.data.user); 
        navigate("/"); 
      }
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content w-full flex justify-center px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
              Register Now!
            </h1>
            <fieldset className="space-y-4">
              <form onSubmit={handleRegister}>
                <div>
                  <label className="label">Name</label>
                  <input name="name" type="text" className="input input-bordered w-full" placeholder="Name" required />
                </div>
                <div>
                  <label className="label">Photo URL</label>
                  <input name="image" type="text" className="input input-bordered w-full" placeholder="Photo URL" />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input name="email" type="email" className="input input-bordered w-full" placeholder="Email" required />
                </div>
                <div>
                  <label className="label">Password</label>
                  <input name="password" type="password" className="input input-bordered w-full" placeholder="Password" required />
                </div>

                <div className="text-right">
                  <a className="link link-hover text-sm">Forgot password?</a>
                </div>

                <button className="btn btn-neutral w-full mt-2" type="submit">
                  Register
                </button>
                <Link to="/login" className="text-center block mt-4">
                  Already have an account? Login
                </Link>
              </form>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
