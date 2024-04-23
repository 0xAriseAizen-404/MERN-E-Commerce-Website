import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./pages/auth/Navigation";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3 bg-black text-white">
        <Outlet />
      </main>
    </>
  );
}

export default App;
