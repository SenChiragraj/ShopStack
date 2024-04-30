import {  useState } from "react"
import { NavLink, Navigate, useLocation } from "react-router-dom";
import { TokenState } from "../context/token/Token";

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const [error, setError] = useState(null);
  const location = useLocation();

  const { setUser, token, setToken } = TokenState();

  // const url = process.env.REACT_APP_AUTH_URL;
  // console.log(url);

  const registerHandler = async(e) => {
   e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: 'POST',
        body: JSON.stringify({name, email, password: pwd }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(res => res.json());
      if (response.token) {
        setToken({ type: "SET_TOKEN", payload: response.token })
        setUser({ type: "SET_USER", payload: response.user })
        localStorage.setItem("authToken", JSON.stringify(response))
        setEmail('');
        setPwd('');
        return <Navigate to="/" state={{ from: location }} replace />;
      }
      else {
        throw new Error('Registration failed');
      }
      // Redirect to the homepage after successful login
    } catch (error) {
      console.error(error);
      setError('Login failed. Please try again.'); // Set error message for display
    }
  }

  return (
    <div className="flex justify-center bg-slate-100 w-full h-screen">
      {token && <Navigate to="/" />}
      <div className="flex flex-col items-center gap-4 w-1/3">
        <h1 className="text-5xl font-semibold font-sans">Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form action="" onSubmit={registerHandler} className="flex flex-col gap-2 items-center">
          <input className="p-2" type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
          <input className="p-2" type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}/>
          <input className="p-2" type="text" value={pwd} placeholder="Password" onChange={(e) => setPwd(e.target.value)}/>
          <button type="submit" className="bg-white text-black p-1 w-20 font-semibold rounded">Register</button>
          <p className="text-xs">Already have an account. <NavLink to={'/login'}><u>Login </u>here</NavLink></p>
        </form>
      </div>
    </div>
  )
}

export default Register