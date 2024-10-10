import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../components/ManageUsers/Users.scss'
import {fetchGroup} from '../../services/userService.js';
import {toast} from "react-toastify"

function ModalUser (props) {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [gender, setGender] = useState("")
  const [group,setGroup] = useState("")

  const [userGroups, setUserGroups] = useState([])
  useEffect(()=> {
    getGroups()
  },[])
  const getGroups = async()=> {
    let res = await fetchGroup()
    if(res && res.data.EC === 0){
      setUserGroups(res.data.DT)
    }else {
      toast.error(res.data.EM)
    }
  }
  return (
    <Modal
      show={true} className = "modal-user"
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
                <label>Email Address (<span className="red">*</span>):</label>
                <input className="form-control" type="email"/>
            </div>
            <div className="col-12 col-sm-6 form-group">
                <label>Phone number (<span className="red">*</span>):</label>
                <input className="form-control" type="email"/>
            </div>
            <div className="col-12 col-sm-6 form-group">
                <label>Username:</label>
                <input className="form-control" type="email"/>
            </div>
            <div className="col-12 col-sm-6 form-group">
                <label>Password: (<span className="red">*</span>):</label>
                <input className="form-control" type="email"/>
            </div>
            <div className="col-12 col-sm-12 form-group">
                <label>Address:</label>
                <input className="form-control" type="email"/>
            </div>
            <div className="col-12 col-sm-6 form-group">
                <label>Gender:</label>
                <select className="form-select" defaultValue="Male">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
                <label>Group (<span className="red">*</span>):</label>
                <select className="form-select">
                  {userGroups.length > 0 &&  userGroups.map((item,index)=>{
                    return (
                      <option key={`group-${index}`} value={item.id}>{item.name}</option>
                    )
                  })}
                </select>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-success" onClick={props.onHide}>Close</Button>
        <Button className="btn btn-warning"onClick={props.onHide}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalUser;