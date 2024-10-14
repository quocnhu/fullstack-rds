import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../components/ManageUsers/Users.scss";
import { fetchGroup,createNewUser } from "../../services/userService.js";
import { toast } from "react-toastify";
import _ from "lodash"; //used to merge form
function ModalUser(props) {
  const defaultUserData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    gender: "",
    group: "",
  };
  const validInputsDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    gender: true,
    group: true,
  };
  const [userData, setUserData] = useState(defaultUserData);
  const [validInputs, setValidInputs] = useState(validInputsDefault);
  const [userGroups, setUserGroups] = useState([]);

  //merge data in form
  const handleOnchangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidateInputs = async() => {
    setValidInputs(validInputsDefault);
    let arr = ["email", "phone", "password", "group"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[arr[i]] = false;
        setValidInputs(_validInputs);
        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
      // Additional validation for email, password, and phone
      if (userData.email && !userData.email.includes("@")) {
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs["email"] = false;
        setValidInputs(_validInputs);
        toast.error("Invalid email: must contain @");
        check = false;
        break;
      }

      if (userData.password && userData.password.length < 9) {
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs["password"] = false;
        setValidInputs(_validInputs);
        toast.error("Password must be at least 9 characters");
        check = false;
        break;
      }

      if (userData.phone && !/^\d+$/.test(userData.phone)) {
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs["phone"] = false;
        setValidInputs(_validInputs);
        toast.error("Phone number must contain only numeric values");
        check = false;
        break;
      }
      return check; //
    }
  };

  const handleConfirmUser = async () => {
    let check = await checkValidateInputs();
    if (check === true) {
      let createResult = await createNewUser({ ...userData, groupId: userData["group"] }); // bad fix
      // console.log(createResult)
      if (createResult && createResult.data && createResult.data.EC === 0) {
        toast.success(createResult.data.EM);
        setUserData({ ...defaultUserData, group: userGroups[0]?.id }); // bug fix
        props.onHide();
      } else {
        toast.error(createResult.data.EM);
      }
    }
  };

  useEffect(() => {
    getGroups();
  }, []);
  const getGroups = async () => {
    let res = await fetchGroup();
    console.log(res)
    if (res && res.data && res.data.EC === 0) {
      setUserGroups(res.data.DT);
      if(res.data.DT && res.data.DT.length > 0){
        let groups = res.data.DT;
        setUserData({...userData, group: groups[0].id}) //set default group
      }
    } else {
      toast.error(res.data.EM);
    }
  };
  return (
    <Modal
      show={props.isShowModalUser}
      className="modal-user"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <span>{props.title}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="content-body row">
          <div className="col-12 col-sm-6 form-group">
            <label>
              Email Address (<span className="red">*</span>):
            </label>
            <input
              className={
                validInputs.email ? "form-control" : "form-control is-invalid"
              }
              type="email"
              value={userData.email}
              onChange={(event) =>
                handleOnchangeInput(event.target.value, "email")
              }
            />
          </div>
          <div className="col-12 col-sm-6 form-group">
            <label>
              Phone number (<span className="red">*</span>):
            </label>
            <input
              className={
                validInputs.phone ? "form-control" : "form-control is-invalid"
              }
              type="text"
              value={userData.phone}
              onChange={(event) =>
                handleOnchangeInput(event.target.value, "phone")
              }
            />
          </div>
          <div className="col-12 col-sm-6 form-group">
            <label>Username:</label>
            <input
              className="form-control"
              type="text"
              value={userData.username}
              onChange={(event) =>
                handleOnchangeInput(event.target.value, "username")
              }
            />
          </div>
          <div className="col-12 col-sm-6 form-group">
            <label>
              Password: (<span className="red">*</span>):
            </label>
            <input
              className={
                validInputs.password
                  ? "form-control"
                  : "form-control is-invalid"
              }
              type="password"
              value={userData.password}
              onChange={(event) =>
                handleOnchangeInput(event.target.value, "password")
              }
            />
          </div>
          <div className="col-12 col-sm-12 form-group">
            <label>Address:</label>
            <input
              className="form-control"
              type="text"
              value={userData.address}
              onChange={(event) =>
                handleOnchangeInput(event.target.value, "address")
              }
            />
          </div>
          <div className="col-12 col-sm-6 form-group">
            <label>Gender:</label>
            <select
              className="form-select"
              defaultValue="Male"
              onChange={(event) =>
                handleOnchangeInput(event.target.value, "gender")
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-12 col-sm-6 form-group">
            <label>
              Group (<span className="red">*</span>):
            </label>
            <select
              className={
                validInputs.group ? "form-select" : "form-select is-invalid"
              }
              onChange={(event) =>
                handleOnchangeInput(event.target.value, "group")
              }
            >
              {userGroups.length > 0 &&
                userGroups.map((item, index) => {
                  return (
                    <option key={`group-${index}`} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-success" onClick={props.onHide}>
          Close
        </Button>
        <Button
          className="btn btn-warning"
          onClick={()=> handleConfirmUser()}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalUser;

