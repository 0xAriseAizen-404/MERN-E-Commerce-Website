import { Link } from "react-router-dom";
import { HeartIcon } from "./HeartIcon";

export const SmallProduct = ({ product }) => {
  return (
    <div className="bg-dark-4 p-3 flex flex-col justify-center gap-4 relative rounded-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[10rem] rounded object-contain"
      />
      <HeartIcon product={product} />
      <Link to={`/product/${product._id}`} className="">
        <h2 className="flex justify-between items-center">
          <span className="w-4/6 truncate text-ellipsis">{product.name}</span>
          <span className="bg-primary-600 text-dark-1 text-sm font-medium px-2 py-1 rounded-lg hover:bg-primary-500 dark:text-dark-1">
            ${product.price}
          </span>
        </h2>
      </Link>
    </div>
  );
};
