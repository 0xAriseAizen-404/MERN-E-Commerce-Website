export const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "submit",
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name=""
          id=""
          className="px-4 py-2 rounded-lg w-full border"
          placeholder="Category name..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-between">
          <button className="bg-[#dd4d51] text-white py-2 px-4 rounded-lg hover:bg-[#FF6B6B] focus:outline-none focus:ring-[#dd4d51] focus:ring-opacity-50">
            {buttonText}
          </button>
          {handleDelete && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-red-500 focus:ring-2 focus:ring-opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
