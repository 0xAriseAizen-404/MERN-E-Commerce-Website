import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import { ProgressSteps } from "../../components/ProgressSteps";

export const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [city, setCity] = useState(shippingAddress.city || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, country, postalCode, city }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="mx-auto ml-[2.5rem] md:ml-0">
      <ProgressSteps step1 step2 />
      <div className="mt-[1rem] flex justify-around items-center flex-wrap">
        <form className="w-full md:w-[40rem]" onSubmit={submitHandler}>
          <h1 className="text-2xl font-semibold mb-4">Shipping</h1>
          <div className="mb-4">
            <label htmlFor="" className="block text-white mb-2">
              Address
            </label>
            <input
              type="text"
              className="mt-1 p-2 border rounded w-full shad-input"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-white mb-2">
              City
            </label>
            <input
              type="text"
              className="mt-1 p-2 border rounded w-full shad-input"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-white mb-2">
              Postal Code
            </label>
            <input
              type="text"
              className="mt-1 p-2 border rounded w-full shad-input"
              placeholder="Enter postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-white mb-2">
              Country
            </label>
            <input
              type="text"
              className="mt-1 p-2 border rounded w-full shad-input"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-400">
              Select Method
            </label>
            <div className="mt-2">
              <label
                htmlFor="pay"
                className="inline-flex items-center hover:cursor-pointer"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="PayPal"
                  id="pay"
                  className="form-radio text-[#dd4d51]"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                />
                <span className="ml-2">Paypal or Credit Card</span>
              </label>
            </div>
          </div>
          <button className="shad-button_primary text-lg w-full" type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
