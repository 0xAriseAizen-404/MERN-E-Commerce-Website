import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { Header } from "../components/Header";
import { Product } from "./products/Product";

export const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });
  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-around items-center mt-[10rem]">
            <h1 className="text-[3rem]">Special Products</h1>
            <Link
              to="/shop"
              className="bg-[#FF6B6B] rounded-full font-bold py-2 px-10"
            >
              Shop
            </Link>
          </div>
          <div className="flex justify-start ml-[7rem] gap-[2rem] flex-wrap mt-[2rem]">
            {data.products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
