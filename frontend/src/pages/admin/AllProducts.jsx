import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import { Loader } from "../../components/Loader";
import { AdminMenu } from "./AdminMenu";

export const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="ml-[2rem] md:ml-[2.5rem]">
      <div className="flex flex-col">
        <div className="ml-[2rem] text-2xl font-bold h-12">
          All Products {products.length}
        </div>
        <div className="flex flex-wrap justify-between gap-4 mt-[2rem]">
          {products?.map((product) => (
            <Link
              key={product._id}
              to={`/admin/product/update/${product._id}`}
              className="block mb-4 overflow-hidden w-full bg-dark-2 p-3 rounded-md"
            >
              <div className="w-full flex flex-col sm:flex-row gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[10rem] h-[15rem] object-fit mx-auto"
                />
                <div className="w-full flex flex-col justify-around gap-2">
                  <div className="flex justify-between items-center w-full gap-2">
                    <span className="md:text-2xl font-semibold w-4/6">
                      {product?.name}
                    </span>
                    <p className="text-gray-400 text-sm w-2/6 text-right">
                      {moment(product.createdAt).format("MMMM Do YYYY")}
                    </p>
                  </div>
                  <p className="text-gray-400 xl:w-[30rem] md:w-[25rem] text-sm mb-4">
                    {product?.description?.substring(0, 160)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#dd4d51] rounded-lg hover:bg-[#FF6B6B] focus:ring-4 focus:outline-none focus:ring-[#dd4d51]"
                    >
                      Update Product
                      <svg
                        className="w-3.5 h-3.5 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
                    <p className="font-bold text-2xl">$ {product?.price}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="md:w-1/4 p-3 mt-2">
          <AdminMenu />
        </div>
      </div>
    </div>
  );
};
