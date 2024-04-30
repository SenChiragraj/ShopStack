import { useState, useEffect } from "react";
import { TokenState } from "../context/token/Token";
// import instance from "../assets/axios";
import ProductDisplay from "./ProductDisplay";

const Home = () => {
  const { token } = TokenState();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const headers = {
  //         'Authorization': `Bearer ${token}`
  //       };
  //       const res = await instance.get('/product/api/all', { headers });
  //       setProducts(res.data);
  //     } catch (error) {
  //       setError("Error fetching products. Please try again later.");
  //     }
  //   };

  //   fetchProducts();
  // }, [token]);

  return (
    <div className="container mx-auto p-4">
      {error ? (
        <h2 className="text-red-500">{error}</h2>
      ) : (
        products.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product, index) => (
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

export default Home;
