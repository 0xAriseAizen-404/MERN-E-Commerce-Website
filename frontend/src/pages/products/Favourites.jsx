import { useSelector } from "react-redux";
import { selectFavouriteProduct } from "../../redux/features/favourites/favouriteSlice";
import { Product } from "./Product";

export const Favourites = () => {
  const favourites = useSelector(selectFavouriteProduct);
  return (
    <div className="min-h-[100vh] ml-[4rem]">
      <h1 className="text-2xl font-bold my-[1rem]">Favourite Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favourites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
