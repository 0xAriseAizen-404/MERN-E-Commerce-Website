import { Message } from "../../components/Message";
import { Loader } from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

export const UserOrders = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="min-h-[100vh] mx-auto ml-[2rem] md:ml-[4rem]">
      <h2 className="font-semibold text-2xl my-4">My Orders</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <div className="w-full">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex gap-4 p-4 mb-4 border-b border-light-4 lg:flex-row justify-between items-center"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <img
                  src={order.orderItems[0].image}
                  alt={order.user}
                  className="w-[6rem] h-[6rem] object-cover"
                />
                <div className="flex flex-col gap-1">
                  <div className="text-sm">
                    <span className="font-semibold">ID: </span>
                    {order._id}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Date: </span>
                    {order.createdAt.substring(0, 10)}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Total: </span>
                    {order.totalPrice}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 lg:ml-auto md:flex-row lg:items-center">
                <div className="text-sm flex flex-col gap-2 items-start">
                  <span>Paid : </span>
                  <p
                    className={`p-1 text-center w-[6rem] rounded-full ${
                      order.isPaid ? "bg-green-400" : "bg-red-400"
                    }`}
                  >
                    {order.isPaid ? "Completed" : "Pending"}
                  </p>
                </div>
                <div className="text-sm flex flex-col gap-2 items-start">
                  <span>Delivered : </span>
                  <p
                    className={`p-1 text-center w-[6rem] rounded-full ${
                      order.isDelivered ? "bg-green-400" : "bg-red-400"
                    }`}
                  >
                    {order.isDelivered ? "Completed" : "Pending"}
                  </p>
                </div>
                <Link
                  to={`/order/${order._id}`}
                  className="px-3 py-2 rounded-md text-light-2 bg-primary-500 md:ml-[1rem] w-fit h-fit self-end mt-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
