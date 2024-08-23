import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="w-full flex justify-around items-start flex-wrap mx-auto mt-4 pl-[2rem] sm:pl-[4rem]">
        {cartItems.length === 0 ? (
          <div>
            Your cart is Empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-full min-h-[100vh] gap-6">
              <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="w-full md:w-[80%] flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-light-4 rounded-md p-3 bg-dark-2"
                >
                  <div className="flex justify-between items-center gap-4 md:w-auto">
                    <div className="w-[7rem] h-[7rem]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full rounded object-fit"
                      />
                    </div>
                    <div className="md:hidden flex gap-2">
                      <select
                        name=""
                        id=""
                        className="p-2 px-4 border-rounded text-white bg-dark-4 rounded-md border-none"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                      <button
                        className="text-red-500 md:hidden"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash size={22} />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 mt-4 md:mt-0">
                    <Link to={`/product/${item._id}`} className="text-light-2">
                      {item.name}
                    </Link>
                    <div className="mt-2 text-white">{item.brand}</div>
                    <div className="mt-2 text-light-3 text-xl font-bold">
                      $ {item.price}
                    </div>
                  </div>
                  <div className="hidden md:flex md:w-24">
                    <select
                      name=""
                      id=""
                      className="w-full p-2 px-4 border-rounded text-white bg-dark-4 rounded-md border-none"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="hidden md:flex text-red-500"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash size={22} />
                  </button>
                </div>
              ))}
              <div className="w-full md:w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold">
                    Items - (
                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                    )
                  </h2>
                  <div className="text-2xl text-primary-600 font-bold mt-2">
                    ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>
                  <button
                    className="bg-[#dd4d51] mt-4 py-2 px-4 rounded-full text-lg w-full"
                    disabled={cartItems.length === 0}
                    onClick={() => checkoutHandler()}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
