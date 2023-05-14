import Table from 'react-bootstrap/Table';
import { getListUserService } from '../service/UserService';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import CreateUser from './CreateUserModal';
import EditUser from './EditUserModal';
import lodash from 'lodash'

export const ListUser = (props) => {
    const [users, setUsers] = useState([]);
    const [paginate, setPage] = useState({
        totalUser: 0,
        totalPage: 0,
        currentPage: 0,
        perPage: 0
    });
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const handleClose = () => {
        setIsShowModalEdit(false)
    }
    useEffect(() => {
        getListUser()
    }, []);
    const getListUser = async (page) => {
        let result = await getListUserService(page);
        setUsers(result && result.data ? result.data : []);
        setPage(
            prePage => {
                return {
                    ...paginate,
                    totalUser: result.total,
                    totalPage: result.total_pages,
                    currentPage: result.page,
                    perPage: result.per_page
                }
            }
        );
        // console.log('result: ', result);
    }
    // console.log('page =>', paginate);
    // console.log('users => ', users);

    const handlePageClick = (event) => {
        // console.log('check handlePageClick(): ', event);
        getListUser(+event.selected + 1);
    };

    const handleUpdateListUserByCreate = (newUser) => {
        setUsers([newUser, ...users])
    };

    const handleUpdateListUserByEdit = (user) => {
        // console.log(user)
        let cloneUsers = lodash.cloneDeep(users);
        let index = users.findIndex(ele => ele.id === user.id);
        cloneUsers[index].first_name = user.first_name;
        setUsers(cloneUsers);
        console.log(index);
    };

    // Truyền data= user qua component EditUser để hiển thị
    const handleEditUser = (user) => {
        // console.log('check handleEditUser: ', user);
        setDataEdit(user);
        setIsShowModalEdit(true);
    }
    return (
        <>
            <CreateUser handleUpdateListUserByCreate={handleUpdateListUserByCreate} />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr className='text-center'>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Avatar</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 &&
                        users.map((ele, index) => {
                            return (
                                <tr key={ele.id}>
                                    <td>{(paginate.currentPage - 1) * paginate.perPage + index + 1}</td>
                                    <td>{ele.first_name}</td>
                                    <td>{ele.last_name}</td>
                                    <td>{ele.email}</td>
                                    <td>
                                        <img src={ele.avatar} alt='' style={{ marginLeft: '25%' }} />
                                    </td>
                                    <td >
                                        <button className='btn btn-success me-1' onClick={() => handleEditUser(ele)}>Edit</button>
                                        <>
                                            <EditUser show={isShowModalEdit} handleClose={handleClose} dataEdit={dataEdit}
                                                handleUpdateListUserByEdit={handleUpdateListUserByEdit} />
                                        </>
                                        <button className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={paginate.totalPage}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </>
    )
}