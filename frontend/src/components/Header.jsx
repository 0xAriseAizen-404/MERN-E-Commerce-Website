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
      <div className="w-full flex justify-around">
        <div className="xl:block lg:block md:hidden sm:hidden xs:hidden">
          <div className="grid grid-cols-2 gap-4">
            {data?.map((product) => (
              <SmallProduct key={product._id} product={product} />
            ))}
          </div>
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};
