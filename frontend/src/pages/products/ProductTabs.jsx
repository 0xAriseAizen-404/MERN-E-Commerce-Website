import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Ratings } from "./Ratings";
import {
  useGetTopProductsQuery,
  useGetProductByIdQuery,
} from "../../redux/api/productApiSlice";
import { SmallProduct } from "./SmallProduct";
import { Loader } from "../../components/Loader";

export const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { id: productId } = useParams();
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);
  if (isLoading) return <Loader />;
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className="flex flex-col md:flex-row justify-between gap-6">
      <section>
        <div
          className={`flex-1 cursor-pointer text-lg p-4 ${
            activeTab === 1 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Review
        </div>
        <div
          className={`flex-1 cursor-pointer text-lg p-4 ${
            activeTab === 2 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </div>
        <div
          className={`flex-1 cursor-pointer text-lg p-4 ${
            activeTab === 3 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </div>
      </section>
      <section>
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-2">
                  <label htmlFor="rating" className="block text-xl mb-2">
                    Rating
                  </label>
                  <select
                    name=""
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg text-black md:w-[15rem]"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Excellence</option>
                  </select>
                </div>
                <div className="my-2">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    Comment
                  </label>
                  <textarea
                    name=""
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg md:w-[30rem] text-black"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-[#dd4d51] py-2 px-4 rounded-lg text-white"
                  onClick={submitHandler}
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please <Link to="/login">Sign in to write a review</Link>
              </p>
            )}
          </div>
        )}
      </section>
      <section>
        {activeTab === 2 && (
          <>
            <div>{product.reviews.length === 0 && <p>No Reviews</p>}</div>
            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-[#1a1a1a] p-4 rounded-lg xl:ml-[2rem] xl:w-[50rem] sm:w-[24rem] mb-5"
                >
                  <div className="flex justify-between">
                    <strong className="text-[#b0b0b0]">{review.name}</strong>
                    <p className="text-[#b0b0b0]">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <p className="my-4">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      <section>
        {activeTab === 3 && (
          <div className="grid grid-cols-3">
            {!data ? (
              <Loader />
            ) : (
              data.map(
                (product) =>
                  product._id !== productId && (
                    <div key={product._id}>
                      <SmallProduct product={product} />
                    </div>
                  )
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
};
