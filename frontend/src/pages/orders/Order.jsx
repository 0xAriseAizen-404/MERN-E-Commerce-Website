import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Message } from "../../components/Message";
import { Loader } from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

export const Order = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    error,
    isLoading,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadingPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "IN",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onError(error) {
    toast.error(error.message);
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <div className="flex flex-col ml-[5rem] md:flex-row">
      <div className="w-2/3 pr-4">
        <div className="border-gray-300 mt-5 pb-4 mb-5">
          {order.orderItems.length === 0 ? (
            <Message>Order is Empty</Message>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-[80%]">
                <thead className="border-b-2">
                  <tr>
                    <th className="p-2 text-left">Image</th>
                    <th className="p-2 text-left">Product</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Unit Price</th>
                    <th className="p-2 text-left">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <img
                          src={item.image}
                          alt={item.image}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="p-2">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>
                      <td className="p-2">{item.qty}</td>
                      <td className="p-2">{item.price.toFixed(2)}</td>
                      <td className="p-2">
                        ${(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className="md:w-1/3">
        <h2 className="text-lg font-bold mb-2 mt-[1rem]">Order Summary</h2>
        <div className="flex justify-between flex-wrap p-8 bg-[#181818]">
          <ul className="text-lg w-full">
            <li className="flex justify-between mb-2">
              <span className="font-semibold mb-4">Items: </span>
              <span>$ {order.itemsPrice}</span>
            </li>
            <li className="flex justify-between mb-2">
              <span className="font-semibold mb-4">Shipping: </span>
              <span>$ {order.shippingPrice}</span>
            </li>
            <li className="flex justify-between mb-2">
              <span className="font-semibold mb-4">Tax: </span>
              <span>$ {order.taxPrice}</span>
            </li>
            <li className="flex justify-between mb-2">
              <span className="font-semibold mb-4">Total: </span>
              <span>$ {order.totalPrice}</span>
            </li>
          </ul>
        </div>

        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />}
            {isPending ? (
              <Loader />
            ) : (
              <div>
                <div>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-2 border-gray-300 p-4 mb-4">
          {order.isPaid ? (
            <Message variant="success" className="text-[#dd4d51]">
              Paid on {order.paidAt}
            </Message>
          ) : (
            <Message variant="danger">Not Paid</Message>
          )}
          <h2 className="text-lg font-bold mb-2 mt-4">Shipping</h2>
          <p className="mb-4 mt-4">
            <strong className="text-[#dd4d51]">Order: </strong>
            {order._id}
          </p>
          <p className="mb-4">
            <strong className="text-[#dd4d51]">Name: </strong>
            {order.user.username}
          </p>
          <p className="mb-4">
            <strong className="text-[#dd4d51]">Email: </strong>
            {order.user.email}
          </p>
          <p className="mb-4">
            <strong className="text-[#dd4d51]">Address: </strong>
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
          <p className="mb-4">
            <strong className="text-[#dd4d51]">Method: </strong>
            {order.paymentMethod}
          </p>
        </div>
        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <div>
            <button
              type="button"
              className="bg-[#dd4d51] text-white w-full py-2"
              onClick={deliverHandler}
            >
              Mark As Delivered
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
