import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import { AdminMenu } from "./AdminMenu";

export const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useGetAllCategoriesQuery();

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("countInStock", stock);
      productData.append("quantity", quantity);
      productData.append("brand", brand);

      const res = await createProduct(productData).unwrap();
      if (res.error) {
        toast.error("Product creation failed. Try again!");
      } else {
        toast.success(`${res.name} is created`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.log(error.error);
      toast.error("Product creation failed. Try again!");
    }
  };

  return (
    <div className="min-h-[100vh] w-full container lg:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-6/6 p-3">
          <div className="h-12">Create Product</div>
          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}
          <div className="mb-3 w-full">
            <label className="border text-white block w-full text-center rounded-lg cursor-pointer font-bold py-11 px-4">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>
          <div className="p-6 w-full border flex flex-row flex-wrap gap-6">
            <div className="field-box flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name=""
                id="name"
                className="p-3 w-[25rem] rounded-lg border bg-[#101011] text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field-box flex flex-col gap-2">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name=""
                id="price"
                className="p-3 w-[25rem] rounded-lg border bg-[#101011] text-white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="field-box flex flex-col gap-2">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                name=""
                id="quantity"
                className="p-3 w-[25rem] rounded-lg border bg-[#101011] text-white"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="field-box flex flex-col gap-2">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                name=""
                id="brand"
                className="p-3 w-[25rem] rounded-lg border bg-[#101011] text-white"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="w-[85%] field-box flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                name=""
                type="text"
                id=""
                rows="5"
                className="p-2 bg-[#101011] border rounded-lg text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="field-box flex flex-col gap-2">
              <label htmlFor="stock">Count in Stock</label>
              <input
                type="number"
                name=""
                id="stock"
                className="p-3 w-[25rem] rounded-lg border bg-[#101011] text-white"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="field-box flex flex-col gap-2">
              <label htmlFor="category">Category</label>
              <select
                name=""
                id="category"
                className="p-3 w-[25rem] rounded-lg border bg-[#101011] text-white"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-[#dd4d51]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};