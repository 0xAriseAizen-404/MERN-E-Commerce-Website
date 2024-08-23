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
    <div className="w-full flex flex-col md:flex-row justify-between gap-2 mt-4">
      <section className="md-full md:w-2/6">
        <div
          className={`flex-1 cursor-pointer text-lg p-4 ${
            activeTab === 1 ? "font-bold text-primary-600" : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Review
        </div>
        <div
          className={`flex-1 cursor-pointer text-lg p-4 ${
            activeTab === 2 ? "font-bold text-primary-600" : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </div>
        <div
          className={`flex-1 cursor-pointer text-lg p-4 ${
            activeTab === 3 ? "font-bold text-primary-600" : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </div>
      </section>

      {activeTab === 1 && (
        <section className="w-full">
          {userInfo ? (
            <form onSubmit={submitHandler} className="w-full">
              <div className="my-2 w-full">
                <label htmlFor="rating" className="block text-lg mb-2">
                  Rating
                </label>
                <select
                  name=""
                  id="rating"
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="p-2 border rounded-lg text-light-2 bg-dark-4 md:w-[15rem]"
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
                <label htmlFor="comment" className="block text-lg mb-2">
                  Comment
                </label>
                <textarea
                  name=""
                  id="comment"
                  rows="3"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2 border rounded-lg md:w-[30rem] text-light-2 bg-dark-4"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loadingProductReview}
                className="bg-[#dd4d51] py-2 px-4 rounded-lg"
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
        </section>
      )}

      {activeTab === 2 && (
        <section className="w-full">
          <div>{product.reviews.length === 0 && <p>No Reviews</p>}</div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.reviews.map((review) => (
              <div key={review._id} className="bg-[#1a1a1a] p-4 rounded-lg">
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
        </section>
      )}

      {activeTab === 3 && (
        <section className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </section>
      )}
    </div>
  );
};
