import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { HeartIcon } from "./HeartIcon";
import { toast } from "react-toastify";

export const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="relative bg-[#1a1a1a] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 px-3 py-2 self-stretch">
      <Link to={`/product/${p._id}`}>
        <span className="absolute top-3 left-3 mb-3 bg-[#3d2424] text-[#ff242b] text-sm font-medium mr-2 px-2 py-0.5 rounded-full dark:bg-[#f3474c] dark:text-[#fdacac]">
          {p?.brand}
        </span>
        <img
          className="cursor-pointer w-full"
          src={p.image}
          alt={p.name}
          style={{ height: "165px", objectFit: "contain" }}
        />
      </Link>
      <HeartIcon product={p} />
      <div className="flex justify-between items-center gap-2 py-3">
        <h4 className="text-normal text-white">{p?.name}</h4>
        <p className="font-semibold text-[#dd4d51]">
          {p?.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
      <p className="text-[#cfcfcf] text-sm mb-2">
        {p?.description.substring(0, 60)}...
      </p>
      <div className="flex justify-between items-center gap-2">
        <Link
          to={`/product/${p._id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#ff242b] hover:bg-[#dd4d51] rounded-lg focus:ring-4 focus:outline-none focus:ring-[#dd4d51] dark:bg-[#ff242b] dark:hover:bg-[#dd4d51] dark:focus:ring-[#ff242b]"
        >
          Read More
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
        <AiOutlineShoppingCart
          size={26}
          className="cursor-pointer"
          onClick={() => addToCartHandler(p, 1)}
        />
      </div>
    </div>
  );
};
