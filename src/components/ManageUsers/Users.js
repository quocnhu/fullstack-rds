import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Users = (props) => {
  let navigate = useNavigate();// can not put in callback
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <h3>user component</h3>
    </div>
  );
};
export default Users;
