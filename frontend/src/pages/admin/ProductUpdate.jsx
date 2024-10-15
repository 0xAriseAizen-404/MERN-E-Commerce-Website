import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import { AdminMenu } from "./AdminMenu";

export const ProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || "");

  const navigate = useNavigate();

  const { data: categories } = useGetAllCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setImage(productData.image);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
      setBrand(productData.brand);
      setStock(productData.countInStock);
      setQuantity(productData.quantity);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully");
      setImage(res.image);
    } catch (error) {
      toast.error("Item is not added. Try again!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("countInStock", stock);
      formData.append("quantity", quantity);
      formData.append("brand", brand);

      const { data: res /*, refetch */ } = await updateProduct({
        productId: params._id,
        formData,
      });
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Product successfully created");
        navigate("/admin/allproductslist");
        // refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Product updation failed. Try again!");
    }
  };

  const handleDelete = async () => {
    try {
      const confirmation = window.confirm("Are you sure to delete ?");
      if (!confirmation) return;
      const { data: res } = await deleteProduct(params._id);
      toast.success(`${res.name} is deleted`);
      navigate("/admin/allproductslist");
    } catch (error) {
      console.error(error);
      toast.error("Deletion Failed. Try Again!");
    }
  };

  return (
    <div className="ml-[2rem] md:ml-[2.5rem]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="w-full">
          <div className="text-2xl font-semibold mb-4 mt-2">Create Product</div>
          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto mb-[2rem] h-[30rem] object-fit"
              />
            </div>
          )}
          <div className="mb-3 w-full">
            <label className="border-[1.5px] border-light-4 text-white block w-full text-center rounded-md cursor-pointer font-bold py-11 px-4">
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
            <div className="field-box flex flex-col gap-2">
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
            <div className="field-box flex flex-col gap-2">
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
            <div className="field-box flex flex-col gap-2">
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
            <div className="field-box flex flex-col gap-2">
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
            <div className="field-box flex flex-col gap-2">
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
            <div className="field-box flex flex-col gap-2">
              <label htmlFor="category">Category</label>
              <select
                name=""
                id="category"
                className="mt-1 p-2 border rounded w-full bg-dark-4"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex justify-between md:col-span-2">
              <button
                onClick={handleSubmit}
                className="py-2 px-10 mt-5 rounded-md text-lg font-bold bg-emerald-500"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="py-2 px-10 mt-5 rounded-md text-lg font-bold bg-[#dd4d51]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
