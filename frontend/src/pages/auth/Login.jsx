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
      <section className="min-h-[100vh] pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form
            onSubmit={submitHandler}
            action=""
            className="container w-[30rem]"
          >
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block test-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="password"
                className="block test-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-[#dd4d51] text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:bg-[#FF6B6B]"
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
        <img
          src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-3530.jpg?w=740&t=st=1712940849~exp=1712941449~hmac=67491da893e3a8de688352529d3ff4b501a716d21384fa40e0aa895976fe62bb"
          className="h-[35rem] w-[50%] rounded-lg md:hidden sm:hidden lg:block"
          alt=""
        />
      </section>
    </>
  );
};

export default Login;
