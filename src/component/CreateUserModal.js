import React, { useState } from "react";
import { createUser } from "../service/UserService";
import { toast } from 'react-toastify';

const CreateUser = (props) => {
    const [user, setUser] = useState({
        name: '',
        job: '',
    });
    const handleOnchange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }
    const handleCreateUser = async () => {
        if (user.name && user.job) {
            let result = await createUser(user);
            if (result && result.id) {
                toast.success('Add new user is success!!!');
                setUser({
                    name: '',
                    job: '',
                });
                //  dữ liệu api ảo 2 table không giống nhau nên phải xét lại thuộc tính cho giống bên ListUser
                props.handleUpdateListUserByCreate({ first_name: user.name + result.id, last_name: user.job, id: result.id })
            }
        } else {
            toast.error('Add new user is error');
            setUser({
                name: '',
                job: '',
            })
        }

    }
    return (
        <>
            <div className="d-flex justify-content-between pt-1 pb-1">
                <span>ListUser</span>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createUser">
                    CreateUser
                </button>
            </div>

            {/* Modal */}
            <div className="modal fade" id="createUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Form Create</h1>
                        </div>
                        <form>
                            <div className="modal-body">
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

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => handleCreateUser()}>Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateUser;