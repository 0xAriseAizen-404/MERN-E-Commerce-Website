import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addFavouriteToLocalStorage,
  removeFavouriteFromLocalStorage,
  getFavouritesFromLocalStorage,
} from "../../Utils/localStorage";
import {
  addToFavourites,
  removeFromFavourites,
  setFavourites,
} from "../../redux/features/favourites/favouriteSlice";
import { useEffect } from "react";
export const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites) || [];
  const isFavourite = favourites.some((item) => item._id === product._id);
  useEffect(() => {
    const favouritesFromLocalStorage = getFavouritesFromLocalStorage() || [];
    dispatch(setFavourites(favouritesFromLocalStorage));
  }, []);
  const toggleFavourites = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(product));
      removeFavouriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavourites(product));
      addFavouriteToLocalStorage(product);
    }
  };
  return (
    <div className="absolute top-2 right-2 cursor-pointer">
      {isFavourite ? (
        <FaHeart onClick={toggleFavourites} className="text-[#FF6B6B]" />
      ) : (
        <FaRegHeart onClick={toggleFavourites} className="text-white" />
      )}
    </div>
  );
};
