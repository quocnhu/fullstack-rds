import { Routes, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/ManageUsers/Users.js";
import PrivateRoutes from "../routes/PrivateRoutes.js";
const AppRoutes = (props) => {
  const Project = () => {
    return (
      <div>
        <h1>Project Page</h1>
        {/* Add your project routes here */}
      </div>
    )
  }
  return (
    <Routes>
        {/* Protected routes - using nested route v6 */}
        <Route element={<PrivateRoutes />}>
          <Route path="/users" element={<Users />} />
          <Route path="/project" element={<Project />} />

        </Route>

      <Route path="/" exact element={<div>Home = Hello world</div>} />
      <Route path="/news" element={<div> Hell ya</div>} />
      <Route path="/contact" element={<div>Ya Hell</div>} />
      <Route path="/about" element={<div>Ya Hell</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<div>404 not found</div>} />
    </Routes>
  );
};
export default AppRoutes;
