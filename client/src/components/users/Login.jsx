
import { useContext, useState } from "react";
import { NavLink, useLocation, Navigate, useNavigate } from "react-router-dom";
import TokenContext from "../context/token/Token";
const Login = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { setUser, token, setToken } = useContext(TokenContext);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: 'POST',
        body: JSON.stringify({ email, password: pwd }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(res => res.json());
      if (response.token) {
        console.log(response.token);
        setToken({ type: "SET_TOKEN", payload: response.token });
        setUser({ type: "SET_USER", payload: response.user });
        localStorage.setItem("authToken", JSON.stringify(response));
      // localStorage.setItem("authToken", JSON.stringify(response.token));
        setEmail('');
        setPwd('');
      } else {
        throw new Error('Login Failed');
      }
      // Redirect to the homepage after successful login
      navigate("/", { state: { from: location }, replace: true });
    } catch (error) {
      console.error(error);
      setError('Login failed. Please try again.'); // Set error message for display
    }
  };

  return (
    <div className="flex justify-center bg-slate-100 w-full h-screen">
      {token && <Navigate to="/" state={{ from: location }} replace />}
      <div className="flex flex-col items-center gap-4 w-1/3">
        <h1 className="text-5xl font-semibold font-sans ">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={loginHandler} className="flex flex-col gap-2 items-center  w-full">
          <input className="w-2/3 p-2 rounded-md" type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
          <input className="p-2 w-2/3 rounded-md" type="password" value={pwd} placeholder="Password" onChange={(e) => setPwd(e.target.value)}/>
          <button type="submit" className="bg-white text-black p-1 w-20 font-semibold rounded">Login</button>
          <p className="text-xs">Don&apos;t have an account? <NavLink to="/register"><u>Register</u> here</NavLink></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
