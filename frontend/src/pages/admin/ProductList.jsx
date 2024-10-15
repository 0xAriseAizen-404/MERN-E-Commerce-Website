import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  // useUploadProductImageMutation,
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

  // const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useGetAllCategoriesQuery();

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // const uploadFileHandler = async (e) => {
  //   const formData = new FormData();
  //   formData.append("image", e.target.files[0]);
  //   try {
  //     const res = await uploadProductImage(formData).unwrap();
  //     toast.success(res.message);
  //     setImage(res.image);
  //     setImageUrl(res.image);
  //   } catch (error) {
  //     toast.error(error?.data?.message || error.error);
  //   }
  // };

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
    <div className="ml-[2rem] md:ml-[3rem]">
      <AdminMenu />
      <div className="flex flex-col md:flex-row">
        <div className="w-full">
          <div className="text-2xl font-semibold mb-4 mt-2">Create Product</div>
          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px] mb-2"
              />
            </div>
          )}
          <div className="w-full mb-3">
            <label className="border-[1.5px] border-light-4 text-white block w-full text-center rounded-md cursor-pointer font-bold py-10">
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
          <div className="p-6 w-full border-[1.5px] border-light-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="field-box">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name=""
                id="name"
                className="mt-1 p-2 border rounded w-full shad-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field-box ">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name=""
                id="price"
                className="mt-1 p-2 border rounded w-full shad-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="field-box ">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                name=""
                id="quantity"
                className="mt-1 p-2 border rounded w-full shad-input"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="field-box ">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                name=""
                id="brand"
                className="mt-1 p-2 border rounded w-full shad-input"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="field-box flex flex-col gap-2 w-full md:col-span-2">
              <label htmlFor="description">Description</label>
              <textarea
                name=""
                type="text"
                id=""
                rows="5"
                className="shad-textarea flex-1 w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="field-box ">
              <label htmlFor="stock">Count in Stock</label>
              <input
                type="number"
                name=""
                id="stock"
                className="mt-1 p-2 border rounded w-full shad-input"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="field-box ">
              <label htmlFor="category">Category</label>
              <select
                name=""
                id="category"
                className="mt-1 p-2 border rounded w-full bg-dark-4"
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
              className="shad-button_primary md:col-span-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
