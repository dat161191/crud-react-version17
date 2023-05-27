import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { updateUser } from "../../service/UserService";
const EditUser = (props) => {
    const { show, handleClose, dataEdit, handleUpdateListUserByEdit } = props;
    const [user, setUser] = useState({
        id: '',
        name: '',
        job: ''
    });
    useEffect(() => {
        if (show) {
            setUser(prevUser => {
                return { ...user, id: dataEdit.id, name: dataEdit.first_name, job: dataEdit.last_name }
            })
        }
    }, [dataEdit]);
    // console.log('check user: ', user)
    const handleOnchange = (event) => {
        setUser(() => {
            return { ...user, [event.target.name]: event.target.value }
        })
        // console.log('check user: ', user)
    };
    const handleUpdateUser = async () => {
        // let newName = user.name;
        // let newJob = user.job;
        let userEdit = user;
        let result = await updateUser(userEdit);
        console.log(result)
        if (result && result.updatedAt) {
            // httpstatus :2xx
            handleUpdateListUserByEdit({
                id: dataEdit.id,
                first_name: result.name,
                last_name: result.job
            })
            setUser({
                name: '',
                job: '',
            });
            toast.success('Edit success!!!');
            handleClose();
        } else {
            toast.error('Edit failed')
        }
    };
    return (
        <>
            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" name="id" value={user.id} onChange={(event) => handleOnchange(event)} />
                    <div className="row pt-1">
                        <div className="col-4">
                            <label htmlFor="name">Name:</label>
                        </div>
                        <div className="col-8">
                            <input type="text" className="form-control w-75" id="name" value={user.name}
                                name='name' onChange={(event) => handleOnchange(event)} />
                        </div>
                    </div>

                    <div className="row pt-1">
                        <div className="col-4">
                            <label htmlFor="job">Job:</label>
                        </div>
                        <div className="col-8">
                            <input type="text" className="form-control w-75" id="job" value={user.job}
                                name='job' onChange={(event) => handleOnchange(event)} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdateUser()}>
                        Edit User
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}
export default EditUser;