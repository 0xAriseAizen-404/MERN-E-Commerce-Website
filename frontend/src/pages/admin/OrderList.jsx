import { Message } from "../../components/Message";
import { Loader } from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import { AdminMenu } from "./AdminMenu";

export const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="ml-[2rem]">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          {/* For larger screens */}
          <table className="hidden md:table mx-auto mt-[2rem] border-separate border-spacing-y-4">
            <AdminMenu />
            <thead>
              <tr>
                <th className="text-left pl-1">ITEMS</th>
                <th className="text-left pl-1">ID</th>
                <th className="text-left pl-1">USER</th>
                <th className="text-left pl-1">DATE</th>
                <th className="text-left pl-1">TOTAL</th>
                <th className="text-left pl-1">PAID</th>
                <th className="text-left pl-1">DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="bg-dark-2 shadow-sm rounded-lg px-2"
                >
                  <td className="p-2">
                    <img
                      src={order.orderItems[0].image}
                      alt={order._id}
                      className="w-20 h-20 object-fit mb-2"
                    />
                  </td>
                  <td className="p-2">{order._id}</td>
                  <td className="p-2">
                    {order.user ? order.user.username : "N/A"}
                  </td>
                  <td className="p-2">
                    {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                  </td>
                  <td className="p-2">{order.totalPrice}</td>
                  <td className="p-2 text-sm">
                    {order.isPaid ? (
                      <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                        Pending
                      </p>
                    )}
                  </td>
                  <td className="p-2 text-sm">
                    {order.isDelivered ? (
                      <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                        Pending
                      </p>
                    )}
                  </td>
                  <td className="p-2">
                    <Link to={`/order/${order._id}`} className="underline">
                      More
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* For smaller screens */}
          <div className="md:hidden flex flex-col gap-4">
            <AdminMenu />
            {orders.map((order) => (
              <div key={order._id} className="bg-dark-2 p-4 rounded-md">
                <div className="flex sm:flex-row flex-col justify-between gap-4">
                  <img
                    src={order.orderItems[0].image}
                    alt={order._id}
                    className="h-[10rem] w-[8rem] object-fit mx-auto"
                  />
                  <div className="flex flex-row gap-4 justify-between flex-1">
                    <div className="flex flex-col justify-between gap-2">
                      <div>
                        <span className="font-bold">User:</span>{" "}
                        {order.user ? order.user.username : "N/A"}
                      </div>
                      <div>
                        <span className="font-bold">Date:</span>{" "}
                        {order.createdAt
                          ? order.createdAt.substring(0, 10)
                          : "N/A"}
                      </div>
                      <div>
                        <span className="font-bold">Total:</span> $
                        {order.totalPrice}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-2 text-right">
                      <div>
                        <span className="font-bold">Paid:</span>
                        <span
                          className={`p-1 text-center w-[6rem] rounded ml-2 ${
                            order.isPaid ? "bg-green-400" : "bg-red-400"
                          }`}
                        >
                          {order.isPaid ? "Completed" : "Pending"}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold">Delivered:</span>
                        <span
                          className={`p-1 text-center w-[6rem] rounded ml-2 ${
                            order.isDelivered ? "bg-green-400" : "bg-red-400"
                          }`}
                        >
                          {order.isDelivered ? "Completed" : "Pending"}
                        </span>
                      </div>
                      <div>
                        <Link
                          to={`/order/${order._id}`}
                          className="underline mt-2 block text-lg text-secondary-500 hover:text-xl"
                        >
                          More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
