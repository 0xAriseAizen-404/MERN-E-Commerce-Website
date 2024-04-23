import { useSelector } from "react-redux";
export const FavouritesCount = () => {
  const favourites = useSelector((state) => state.favourites) || [];
  const favouitesCount = favourites.length;
  return (
    <div className="absolute left-4 bottom-2">
      {favouitesCount > 0 && (
        <span className="px-0.5 py-0 text-sm text-white bg-[#FF6B6B] rounded-full">
          {favouitesCount}
        </span>
      )}
    </div>
  );
};
