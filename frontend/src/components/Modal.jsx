export const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-dark-2 p-6 rounded-lg z-10 text-right w-[80%] ml-[2rem] md:ml-0 md:w-[40%] max-w-xl">
            <button
              className="text-primary-600 font-semibold hover:text-primary-500 focus:outline-none mr-2"
              onClick={onClose}
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
