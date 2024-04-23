import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../redux/api/categoryApiSlice.js";
import { CategoryForm } from "../../components/CategoryForm.jsx";
import { Modal } from "../../components/Modal.jsx";
import { AdminMenu } from "./AdminMenu.jsx";

export const CategoryList = () => {
  const { data: categories, refetch } = useGetAllCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    try {
      const res = await createCategory({ name }).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        setName("");
        toast.success(`${res.name} is created`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Category creation failed");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }
    try {
      const res = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        setUpdatingName("");
        setSelectedCategory(null);
        setModalVisible(false);
        toast.success(`${res.name} is updated`);
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const res = await deleteCategory(selectedCategory._id).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`${res.name} is deleted`);
        setSelectedCategory(null);
        setModalVisible(false);
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Category deletion failed. Try again.");
    }
  };
  return (
    <div className="min-h-[100vh] ml-[10rem] flex flex-col md-flex-row">
      <AdminMenu />
      <div className="md-w-3/4 p-3">
        Manage Categories
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />
        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-[#dd4d51] text-[#dd4d51] py-2 px-4 rounded-lg m-3 hover:bg-[#dd4d51] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#dd4d51] focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdatingName(category.name);
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};
