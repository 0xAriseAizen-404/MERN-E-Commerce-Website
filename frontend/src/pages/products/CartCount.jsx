import { useSelector } from "react-redux";

export const CartCount = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const cartCount = cartItems.length;
  return (
    <div className="absolute left-4 bottom-2">
      {cartCount > 0 && (
        <span className="px-0.5 py-0 text-sm text-white bg-[#FF6B6B] rounded-full">
          {cartCount}
        </span>
      )}
    </div>
  );
};
