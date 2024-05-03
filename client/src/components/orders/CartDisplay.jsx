import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import { PostData } from "../assets/axios";
import Cart from "./Cart";

// eslint-disable-next-line react/prop-types
const CartDisplay = ({ product = {}, unit, index }) => {

  const navigate = useNavigate();
  const toast = useToast();

  const removeProduct = async (e, id) => {
    e.stopPropagation();
    try {
      await PostData(`order/api/removeProduct/${id}`);
      toast({
        title: 'Product removed from cart',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong while removing the product from cart',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    <Cart/>
  };

  const handleItemQty = async (e, num, id) => {
    e.stopPropagation();
    try {
      await PostData(`/order/api/update/qty/${id}`, { unit: num });
      toast({
        title: num > 0 ? 'Added' : 'Removed',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong while updating the product quantity',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    <Cart/>

  };

  return (
    <div key={index} className="rounded-sm shadow-lg p-2 w-4/5">
      <div className="relative">
        <img className="w-full h-24 object-cover rounded-sm mb-2" src={product.thumbnail} alt="item thumbnail" />
        <button className="absolute top-0 right-0 bg-white text-black font-bold rounded-full w-5 h-5 flex justify-center m-2 items-center align-middle" onClick={e => removeProduct(e, product._id)}>x</button>
      </div>
      <a className="text-sm font-semibold cursor-pointer"  onClick={() => navigate(`/product/${product._id}`)}>{product.title}</a>
      <p className='opacity-85 text-xs'>Brand: {product.brand}</p>
      <div className="flex items-center mb-2">
        <div className="">
          <span className="text-red-700 font-semibold text-lg mr-1"><sup>₹</sup>{product.price}.00</span>
          <span className="text-xs">MRP</span>
        </div>
      </div>
      {/* quantity */}
      <div className="flex justify-between items-center align-middle">
        <h2 className="text-xs">Qty : {unit}</h2>
        <div className="">
          <button className="text-lg mr-2" onClick={e => handleItemQty(e,unit+1, product._id)}>+</button>
          <button className="text-lg mr-2" onClick={e => handleItemQty(e,unit-1, product._id)}>-</button>
        </div>
      </div>
    </div>
  );
};

export default CartDisplay;
