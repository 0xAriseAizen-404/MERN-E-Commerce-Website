import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Loader } from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";

export const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) toast.error("passwords do not match");
    else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Updated Successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="mt-2 mx-auto p-4">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form action="" onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-white mb-2">
                Name
              </label>
              <input
                type="text"
                name=""
                id="name"
                className="mt-1 p-2 border rounded w-full shad-input"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white mb-2">
                Email
              </label>
              <input
                type="email"
                name=""
                id="email"
                className="mt-1 p-2 border rounded w-full shad-input  "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-white mb-2">
                Password
              </label>
              <input
                type="password"
                name=""
                id="password"
                className="mt-1 p-2 border rounded w-full shad-input  "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPass" className="block text-white mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name=""
                id="confirmPass"
                className="mt-1 p-2 border rounded w-full shad-input  "
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>
            <div className="flex justify-between mb-2">
              <button
                type="submit"
                className="text-white bg-[#dd4d51] py-2 px-5 rounded-sm mt-1 hover:bg-[#FF6B6B]"
              >
                {loadingUpdateProfile ? "Updating..." : "Update"}
              </button>
              <Link
                to="/user-orders"
                className="text-white bg-[#dd4d51] rounded-sm mt-1 py-2 px-4 hover:bg-[#FF6B6B]"
              >
                My Orders
              </Link>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
    </div>
  );
};
