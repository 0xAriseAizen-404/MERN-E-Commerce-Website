import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import { Message } from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { Loader } from "../../components/Loader";

export const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) return <Loader />;
  if (error) return <h1>Error</h1>;

  const settings = {
    dots: false,
    infinte: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full md:w-1/2 mb-4 flex flex-center border-[1.5px] border-light-4 rounded-lg">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider {...settings} className="w-5/6 pt-4">
          {products.map((product) => (
            <div key={product._id} className="w-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-h-[20rem] rounded-lg object-contain"
              />
              <div className="grid gap-[2rem] mt-[1em] p-4">
                <div className="flex flex-col gap-2 h-auto">
                  <h2>{product.name}</h2>
                  <span>$ {product.price}</span>
                  <p>{product.description.substring(0, 100)}...</p>
                </div>
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
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};
