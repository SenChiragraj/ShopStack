import { useState, useEffect, useContext } from "react";
import TokenContext from "../context/token/Token";
import { GetData } from "../assets/axios";
import CartDisplay from "./CartDisplay";
import SkeletonLoading from '../assets/SkeletonLoading'
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
const Cart = () => {

  const { token } = useContext(TokenContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate('');

  useEffect(() => {
    <SkeletonLoading />
    const fetchData = async () => {
      try {
        const res = await GetData('/order/api/all');
        console.log(res.data.items);
        setProducts(res.data?.items);
      } catch (error) {
        setError("Error fetching products. Please try again later.");
      }
    };

    fetchData();
  }, [token]);


  return (
    <div className="container m-3">
      <div className="flex justify-between">
        <h1>Cart Items</h1>
        <Button rightIcon={<ArrowForwardIcon />} colorScheme='dark' bg={'black'} color={'whitesmoke'} variant='outline' onClick={() => navigate('/checkout')}>Checkout</Button>
      </div>
      {error ? (
        <h2 className="text-red-500">{error}</h2>
      ) : (
        products && products.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product, index) => (
              <CartDisplay product={product?.product} unit={product?.unit} index={index} key={index} />
            ))}
          </div>
        ) : (
              <h2 className="text-gray-600">{products && products.length > 0 ? <SkeletonLoading /> : "No products available"}</h2>
        )
      )}
    </div>
  )
}

export default Cart