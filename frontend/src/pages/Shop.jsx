import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
  setRadio,
} from "../redux/features/shop/shopSlice";
import { useGetAllCategoriesQuery } from "../redux/api/categoryApiSlice";
import { Loader } from "../components/Loader";
import { ProductCard } from "./products/ProductCard";

export const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );
  const categoryQuery = useGetAllCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio });

  useEffect(() => {
    if (!categoryQuery.isLoading) {
      dispatch(setCategories(categoryQuery.data));
    }
  }, [categoryQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data?.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="min-h-[100vh] mx-[5rem]">
        <div className="flex md:flex-row gap-[1rem]">
          <div className="bg-[#151515] p-3 my-2">
            <h2 className="text-center py-2 bg-black rounded-full">
              Filter by Categories
            </h2>
            <div className="p-5 w-[15rem]">
              {categories?.map((c) => (
                <>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-[#dd4d51] bg-gray-100 border-gray-300 rounded focus:ring-[#dd4d51] dark:focus:[#dd4d51] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="pink-checkbox"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </>
              ))}
            </div>
            <h2 className="text-center py-2 bg-black rounded-full">
              Filter by Brands
            </h2>
            <div className="p-5 w-[15rem]">
              {uniqueBrands?.map((brand) => (
                <>
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 text-[#dd4d51] bg-gray-100 border-gray-300 focus:ring-[#dd4d51] dark:focus:[#dd4d51] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="pink-radio"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {brand}
                    </label>
                  </div>
                </>
              ))}
            </div>
            <h2 className="text-center py-2 bg-black rounded-full">
              Filter by Price
            </h2>
            <div className="p-5 w-[15rem]">
              <div className="flex items-center mb-2">
                <input
                  type="number"
                  placeholder="Enter Price"
                  value={priceFilter}
                  onChange={(e) => handlePriceChange(e)}
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            </div>
            <button
              className="py-2 w-full rounded-md bg-[#dd4d51]"
              onClick={() => window.location.reload()}
            >
              RESET
            </button>
          </div>
          <div className="p-3">
            <h2 className="text-center mb-2">{products?.length} Products</h2>
            <div className="grid grid-cols-2 place-items-center">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
