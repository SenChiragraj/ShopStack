import { useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import TokenContext from '../context/token/Token';
import Navbar from '../assets/Navbar';
import Footer from '../assets/Footer';

const Main = () => {
  const { token } = useContext(TokenContext);
  const location = useLocation();


  return (
    <div className='flex flex-col min-h-screen justify-between '>
      <div className="">
        <Navbar/>
      { token ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace /> }
      </div>
      <Footer/>
    </div>
  );
};

export default Main;
