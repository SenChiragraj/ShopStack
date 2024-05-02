import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ErrorPage from '../error/ErrorPage';
import { GetData } from '../assets/axios';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [openImg, setOpenImg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetData(`/product/api/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        // Handle error
        return <ErrorPage message= {error.message || 'Error in finding product details'} />

      }
    };

    fetchData();
  }, [id]);

  function handleCart(id) {
    try {
      const res =
    } catch (error) {
      return <ErrorPage message= {error.message || 'Unable to add product to cart. Try again!!'} />
    }
  }

  return (
    <div className='m-5 p-5 shadow-md flex flex-col lg:flex-row'>
      <div className='lg:w-1/2'>
        <div className='flex justify-center lg:justify-start'>
          <div className='flex flex-wrap gap-2'>
            {product.images && product.images.map((thumbnail, i) => (
              <img
                src={thumbnail}
                alt='thumbnail'
                key={i}
                className='max-h-20 max-w-20 object-cover m-2 cursor-pointer'
                onClick={() => setOpenImg(thumbnail)}
              />
            ))}
          </div>
        </div>
        <div className='flex justify-center lg:justify-start'>
          <img src={openImg || product.thumbnail} alt='' className='max-w-full m-2 shadow-md' />
        </div>
      </div>
      <div className='flex flex-col lg:w-1/2'>
        <div className='mb-2'>
          <h1 className='text-2xl'>{product.title}</h1>
          <p className='opacity-85 text-xs'>Brand: {product.brand}</p>
        </div>
        <span className='text-xs bg-red-700 text-white rounded-sm px-2 max-w-24 py-1 font-semibold'>Limited time deal</span>
        <div className='flex flex-col mb-2'>
          <p>
            <span className='text-xl mr-1'>
              <span className='text-red-700 font-thin'>-{Math.floor(2000 / (product.price + 2000) * 100)} % </span>
              <sup>₹</sup>
              {product.price}.00
            </span>
          </p>
          <p className='text-xs'><span className=''>M.R.P :</span><strike className=''>₹{product.price + 2000}</strike></p>
        </div>
        <div className='flex gap-3 lg:h-8'>
          <button className='bg-orange-500 text-white w-auto px-4 rounded-full' onClick={() => handleCart(product._id)}>Add to cart</button>
          <button className='bg-orange-500 text-white w-auto px-4 rounded-full' onClick={() => { handleCart(product._id);  Navigate('/cart')}}>Order now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
