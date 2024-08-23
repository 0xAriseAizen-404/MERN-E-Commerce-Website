import { Link } from "react-router-dom";
import { HeartIcon } from "./HeartIcon";
export const  Product = ({ product }) => {
  return (
    <div className="bg-dark-2 border-light-4 p-3 flex flex-col gap-4 relative rounded-lg">
      <div className="relative mx-auto flex w-full flex-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-[90%] h-[15rem] rounded object-contain"
        />
        <HeartIcon product={product} />
      </div>
      <div className="pt-4">
        <Link to={`/product/${product._id}`}>
          <div className="flex justify-between items-center">
            <div className="w-4/6 truncate text-ellipsis text-sm">
              {product.name}
            </div>
            <div className="bg-primary-600 text-dark-1 text-sm font-medium px-2 py-1 rounded-lg hover:bg-primary-500 dark:text-dark-1">
              ${product.price}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
