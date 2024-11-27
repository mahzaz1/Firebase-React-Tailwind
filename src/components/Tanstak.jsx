import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

function Tanstak() {
  
  const fetchAPI = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todo"],
    queryFn: fetchAPI,
  });

  console.log("data", data);

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <p className="text-4xl font-bold">Loading</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center">
        <p className="text-4xl font-bold">Error</p>
      </div>
    );

  return (
    <div className="container px-4 mx-auto pt-12">
      <h1 className="text-4xl font-bold my-10">Tanstak Query</h1>
      <div className="grid grid-cols-3 gap-10">
        {data?.map((data) => (
          <a key={data.id} href="#" className="group block overflow-hidden">
            <div className="relative h-[350px] sm:h-[450px]">
              <img
                src={data.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition-all"
              />

              <img
                src={
                  "https://images.unsplash.com/photo-1523381140794-a1eef18a37c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjQ2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                }
                alt=""
                className="transition-all absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
              />
            </div>

            <div className="relative bg-white pt-3">
              <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
                <Link to={`/product-detail/${data.id}`}>{data.title}</Link>
              </h3>

              <p className="mt-1.5 tracking-wide text-gray-900">
                ${data.price}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Tanstak;
