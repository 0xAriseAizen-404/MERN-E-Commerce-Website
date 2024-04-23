import { useState, useEffect } from "react";
import { Loader } from "../../components/Loader";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from "../../redux/api/usersApiSlice";
import { Message } from "../../components/Message";
import { AdminMenu } from "./AdminMenu";

export const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState("");
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are You Sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (error) {
        toast.error(error?.data.message || error.error);
      }
    }
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: editableUserId,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (error) {
      toast.error(error?.data.message || error.error);
    }
  };

  const toggleEdit = async (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  return (
    <div className="p-4 min-h-[100vh]">
      <h1 className="text-2xl font-semibold mb-5 text-center">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <table className="w-full mx-auto md:w-5/6">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Admin</th>
                <th className="px-4 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex flex-center">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="w-full p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-center">
                        {user.username}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex flex-center">
                        <input
                          type="text"
                          className="border rounded-lg p-2 w-full"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-center">
                        {user.email}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <div className="px-4 py-2">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-[#dd4d51] py-2 px-4 rounded-sm hover:bg-[#FF6B6B] font-bold"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
