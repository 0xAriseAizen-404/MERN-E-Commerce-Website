import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import { Loader } from "./Loader";
import { SmallProduct } from "../pages/products/SmallProduct";
import { ProductCarousel } from "../pages/products/ProductCarousel";

export const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <h1>Error</h1>;
  }
  return (
    <>
      <div className="w-full flex justify-center gap-2 py-4 px-4">
        <div className="md:grid grid-cols-2 gap-4 hidden w-1/2">
          {data?.map((product) => (
            <SmallProduct key={product._id} product={product} />
          ))}
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};
