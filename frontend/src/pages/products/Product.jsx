import { Link } from "react-router-dom";
import { HeartIcon } from "./HeartIcon";
export const Product = ({ product }) => {
  return (
    <div className="w-[15rem] relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[15rem] h-[15rem] rounded object-contain"
        />
        <HeartIcon product={product} />
      </div>
      <div className="pt-4">
        <Link to={`/product/${product._id}`}>
          <div className="flex justify-between items-start">
            <div className="text-sm">{product.name}</div>
            <div className="bg-pink-100 text-[#FF6B6B] text-sm font-medium ml-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
              ${product.price}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
