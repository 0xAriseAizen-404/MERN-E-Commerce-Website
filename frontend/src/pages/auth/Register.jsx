import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  // URLSearchParams,
} from "react-router-dom";
import { Loader } from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({
          username,
          email,
          password,
        }).unwrap();
        //   console.log(res);
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (error) {
        toast.error(error?.data?.message || error.data.message);
      }
    }
  };

  return (
    <section className="pl-[10rem] h-full flex flex-wrap">
      <div className="mr-[4rem] mt-[2rem]">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form
          action=""
          onSubmit={submitHandler}
          className="container w-[30rem] "
        >
          <div className="my-[1rem]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 rounded w-full border"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="my-[1rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 rounded w-full border"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-[1rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 rounded w-full border"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-[1rem]">
            <label
              htmlFor="confirmPass"
              className="block text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPass"
              className="mt-1 p-2 rounded w-full border"
              placeholder="Enter confirm password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-[#dd4d51] hover:bg-[#FF6B6B] text-white rounded px-4 py-2 cursor-pointer my-[1rem]"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          {isLoading && <Loader />}
        </form>

        <div className="mt-4">
          <p className="text-white">
            ALready have an account ?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-[#dd4d51] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <img
        src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?t=st=1712941118~exp=1712944718~hmac=d54d8dc759054b5968711b6cf90d8f7dc5895c3022064f1d6d189e91b246bd70&w=740"
        className="h-[35rem] w-[50%] rounded-lg md:hidden sm:hidden lg:block"
        alt=""
      />
    </section>
  );
};

export default Register;
