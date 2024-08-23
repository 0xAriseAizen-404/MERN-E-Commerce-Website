import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import { Loader } from "../../components/Loader";
import { Message } from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import { HeartIcon } from "./HeartIcon";
import { Ratings } from "./Ratings";
import { ProductTabs } from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

export const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review Created Successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/");
  };

  return (
    <>
      <div className="pt-4">
        <Link
          to="/"
          className="text-white font-semibold hover:underline hover:text-primary-500 ml-[5rem]"
        >
          Go Back
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="w-full flex md:flex-row flex-col gap-6 flex-center relative pl-[4rem] pr-[2rem] mt-4">
            <div className="w-full md:w-3/6 h-[30rem]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              <HeartIcon product={product} />
            </div>
            <div className="w-full md:w-4/6 flex flex-col justify-start gap-6">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="text-[#b0b0b0]">{product.description}</p>
              <p className="text-5xl font-extrabold">$ {product.price}</p>
              <div className="flex items-center justify-start gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <FaBox />
                    <span>Brand:</span>
                    <span>{product.brand}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>Added:</span>
                    <span>{moment(product.createdAt).fromNow()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar />
                    <span>Reviews:</span>
                    <span>{product.numReviews}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <FaStar />
                    <span>Ratings:</span>
                    <span>{Math.round(product.rating)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaShoppingCart />
                    <span>Quantity:</span>
                    <span>{product.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStore />
                    <span>In Stock:</span>
                    <span>{product.countInStock}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between flex-wrap">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                {product.countInStock > 0 && (
                  <div>
                    <select
                      name=""
                      id=""
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="p-2 w-[6rem] text-white bg-dark-4 rounded-lg"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="btn-container">
                <button
                  className="bg-[#dd4d51] text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 container flex flex-wrap items-start justify-between ml-[1rem]">
            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </>
      )}
    </>
  );
};
