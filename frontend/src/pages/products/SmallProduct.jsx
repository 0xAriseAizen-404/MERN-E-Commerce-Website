import { Link } from "react-router-dom";
import { HeartIcon } from "./HeartIcon";

export const SmallProduct = ({ product }) => {
  return (
    <div className="w-[15rem] p-3 flex flex-col gap-4 relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[13rem] rounded object-contain"
      />
      <HeartIcon product={product} />
      <Link to={`/product/${product._id}`} className="">
        <h2 className="flex justify-between gap-4 items-center">
          <span>{product.name}</span>
          <span className="bg-[#FF6B6B] text-[#1f1f1f] text-sm font-medium mr-2 px-4 py-1 rounded-full dark:bg-[#8f001a] dark:text-[#1f1f1f]">
            ${product.price}
          </span>
        </h2>
      </Link>
    </div>
  );
};
