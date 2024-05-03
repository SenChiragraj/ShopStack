import { useState, useEffect, useContext, useMemo } from "react";
import TokenContext from "../context/token/Token";
import { GetData } from "../assets/axios";
import ProductDisplay from "./ProductDisplay";
import SkeletonLoading from "../assets/SkeletonLoading";

const Product = () => {
  const { token } = useContext(TokenContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
     <SkeletonLoading />
    const fetchData = async () => {
      try {
        const res = await GetData('/product/api/all');
        console.log(res);
        setProducts(res.data);
      } catch (error) {
        setError("Error fetching products. Please try again later.");
      }
    };

    fetchData();
  }, [token]);

  const memoizedProducts = useMemo(() => products, [products]);

  return (
    <div className="container m-3">
      {error ? (
        <h2 className="text-red-500">{error}</h2>
      ) : (
        memoizedProducts.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {memoizedProducts.map((product, index) => (
              <ProductDisplay product={product} index={index} key={index} />
            ))}
          </div>
        ) : (
          <h2 className="text-gray-600">No products available</h2>
        )
      )}
    </div>
  );
};

export default Product;
