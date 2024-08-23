import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { Header } from "../components/Header";
import { Product } from "./products/Product";

export const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  return (
    <div className="pl-10">
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center py-4 px-4">
            <h1 className="sm:text-5xl text-3xl">Special Products</h1>
            <Link
              to="/shop"
              className="bg-[#FF6B6B] rounded-full font-bold py-2 px-10"
            >
              Shop
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-10 mt-[2rem] py-4 px-4">
            {data.products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
