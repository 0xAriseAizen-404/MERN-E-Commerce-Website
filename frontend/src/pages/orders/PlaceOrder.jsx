import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { ProgressSteps } from "../../components/ProgressSteps";
import { Message } from "../../components/Message";
import { Loader } from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

export const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="my-4">
      <ProgressSteps step1 step2 step3 />
      <div className="ml-[2.5rem] mx-auto mt-8 px-4 flex flex-col gap-4">
        {cart.cartItems.length === 0 ? (
          <Message>Your Cart is Empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="px-2 py-2 text-left">Image</th>
                  <th className="px-2 py-2 text-left">Product</th>
                  <th className="px-2 py-2 text-left">Quantity</th>
                  <th className="px-2 py-2 text-left">Price</th>
                  <th className="px-2 py-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="p-2">
                      <Link
                        to={`/product/${item._id}`}
                        // className="text-blue-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">${item.price.toFixed(2)}</td>
                    <td className="p-2">
                      ${(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-2">
          <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
          <div className="flex justify-between flex-wrap p-8 bg-dark-2 rounded-md">
            <ul className="flex-1 text-lg flex flex-col gap-2">
              <li>
                <span className="font-semibold">Items: </span>${cart.itemsPrice}
              </li>
              <li>
                <span className="font-semibold">Shipping: </span>$
                {cart.shippingPrice}
              </li>
              <li>
                <span className="font-semibold">Tax: </span>${cart.taxPrice}
              </li>
              <li>
                <span className="font-semibold">Total: </span>${cart.totalPrice}
              </li>
            </ul>
            {error && <Message variant="danger">{error.data.message}</Message>}
            <div className="flex-1 text-lg flex flex-col gap-2">
              <h2 className="text-xl font-semibold">Shipping Address: </h2>
              <p>
                <strong>Address: </strong> {cart.shippingAddress.address}
              </p>
              <p>
                <strong>City: </strong> {cart.shippingAddress.city}
              </p>
              <p>
                <strong>Postal Code: </strong> {cart.shippingAddress.postalCode}
              </p>
              <p>
                <strong>Country: </strong> {cart.shippingAddress.country}
              </p>
            </div>
            <div className="text-lg flex flex-col gap-2">
              <h2 className="text-xl font-semibold">Payment Method</h2>
              <p>
                <strong>Method : </strong> {cart.paymentMethod}{" "}
              </p>
            </div>
          </div>
        </div>
        {error && <Message variant="danger">{error.data.message}</Message>}
        <button
          className="shad-button_primary"
          disabled={cart.cartItems.length === 0}
          onClick={placeOrderHandler}
        >
          Place Order
        </button>
        {isLoading && <Loader />}
      </div>
    </div>
  );
};
