import { Modal, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { deleteUser } from "../../service/UserService";
const DeleteUser = (props) => {
    const { show, handleClose, dataDelete, handleUpdateListUserByDelete } = props;
    const handleDeleteUser = async () => {
        let id = dataDelete.id;
        let result = await deleteUser(id);
        console.log('delete user: ', result)
        if (result && +result.httpStatusCode === 204) {
            // httpstatus :2xx
            handleUpdateListUserByDelete(
                id = dataDelete.id,
            )
            toast.success('Delete success!!!');
            handleClose();
        } else {
            toast.error('Delete failed');
            handleClose();
        }
    };
    return (
        <>
            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-light">
                    <h5>This action  can't be undone!</h5>
                    <span>Are you sure delete user?</span><b className="text-primary"> {dataDelete.last_name} </b>
                    <img src={dataDelete.avatar} alt="" />
                    {/* <input type="text" name="id" value={user.id} onChange={(event) => handleOnchange(event)} /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}
export default DeleteUser;