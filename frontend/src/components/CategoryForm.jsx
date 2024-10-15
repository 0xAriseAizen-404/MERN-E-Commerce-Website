export const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "submit",
  handleDelete,
}) => {
  return (
    <div className="pt-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name=""
          id=""
          className="shad-input"
          placeholder="Category name..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-between gap-4">
          <button className="shad-button_primary max-w-xs">{buttonText}</button>
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
