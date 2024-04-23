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
    <div className="min-h-[100vh] w-full container lg:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-6/6 p-3">
          <div className="h-12">Create Product</div>
          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto mb-[2rem]"
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
            <div className="w-full flex justify-between">
              <button
                onClick={handleSubmit}
                className="py-3 px-9 mt-5 rounded-lg text-lg font-bold bg-emerald-500"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="py-3 px-9 mt-5 rounded-lg text-lg font-bold bg-[#dd4d51]"
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
