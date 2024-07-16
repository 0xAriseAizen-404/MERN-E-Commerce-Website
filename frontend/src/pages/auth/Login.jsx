import { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  // URLSearchParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { Loader } from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password: pass }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <>
      <section className="min-h-[100vh] pl-[5vw] w-full flex flex-center gap-[2rem]">
        <div className="p-4 max-w-lg md:w-1/2 w-full ml-[1rem]">
          <h1 className="text-3xl text-primary-600 font-bold">Login</h1>
          <form
            onSubmit={submitHandler}
            action=""
            className="w-full flex flex-col gap-2 mt-5"
          >
            <div className="space-y-2">
              <label htmlFor="email" className="block font-medium text-white">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mt-1 p-2 border rounded w-full shad-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="mt-1 p-2 border rounded w-full shad-input"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-[#dd4d51] text-white px-4 py-2 rounded cursor-pointer mt-2 hover:bg-[#FF6B6B]"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            {isLoading && <Loader />}
          </form>
          <div className="mt-4">
            <p className="text-white">
              New Customer ?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-[#dd4d51] hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <div className="md:w-1/2 md:block hidden">
          <img
            src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-3530.jpg?w=740&t=st=1712940849~exp=1712941449~hmac=67491da893e3a8de688352529d3ff4b501a716d21384fa40e0aa895976fe62bb"
            className="w-5/6 object-fit rounded-lg"
            alt=""
          />
        </div>
      </section>
    </>
  );
};

export default Login;
