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
      <div>
        <Link
          to="/"
          className="text-white font-semibold hover:underline ml-[5rem]"
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
          <div className="flex flex-wrap relative items-between mt-[2rem] ml-[5rem]">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full xl:w-[30rem] lg:w-[25rem] md:w-[20rem] mr-[2rem] xl:h-[30rem] lg:h-[25rem] md:h-[20rem] object-contain"
              />
              <HeartIcon product={product} />
            </div>
            <div className="flex flex-col justify-start gap-6">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className=" xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#b0b0b0]">
                {product.description}
              </p>
              <p className="text-5xl font-extrabold">$ {product.price}</p>
              <div className="flex items-center justify-start gap-4 w-[20rem]">
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
                      className="p-2 w-[6rem] text-black rounded-lg"
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
            <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[0rem]">
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
          </div>
        </>
      )}
    </>
  );
};
