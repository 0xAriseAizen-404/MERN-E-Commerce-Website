import { Message } from "../../components/Message";
import { Loader } from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import { AdminMenu } from "./AdminMenu";

export const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <table className="container mx-auto mt-[2rem]">
          <AdminMenu />
          <thead>
            <tr className="mb-[5rem]">
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
              <tr key={order._id} className="mb-[2rem]">
                <td>
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
                <td>
                  <Link to={`/order/${order._id}`} className="underline">
                    More
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
