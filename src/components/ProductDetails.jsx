import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import React from "react";

function ProductDetails() {
  const { id } = useParams(); // Get the product ID from the URL

  const fetchAPI = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchAPI,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <p className="text-4xl font-bold">Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center">
        <p className="text-4xl font-bold">Error fetching product details</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div>
          <img
         
            src={data.image}
            alt={data.title}
            className="w-full h-auto object-cover"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{data.description}</p>
          <p className="text-2xl font-bold mb-4">${data.price}</p>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
