import { useSelector } from "react-redux";
import { selectFavouriteProduct } from "../../redux/features/favourites/favouriteSlice";
import { Product } from "./Product";

export const Favourites = () => {
  const favourites = useSelector(selectFavouriteProduct);
  return (
    <div className="min-h-[100vh] ml-[8rem]">
      <h1 className="text-2xl font-bold my-[1rem]">Favourite Products</h1>
      <div className="flex flex-wrap gap-[2rem]">
        {favourites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
