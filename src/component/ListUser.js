import Table from 'react-bootstrap/Table';
import { getListUserService } from '../service/UserService';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import CreateUser from './CreateUserModal';
import EditUser from './EditUserModal';
import lodash from 'lodash';
import { debounce } from 'lodash';
import DeleteUser from './DeleteUserModal';
import { toast } from 'react-toastify';
import { CSVLink, CSVDownload } from "react-csv";
import Papa from 'papaparse'

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

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id');

    const [keySearch, setKeySearch] = useState('');

    const [dataDownload, setDataDownload] = useState([]);
    const handleClose = () => {
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    };
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

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneUsers = lodash.cloneDeep(users);
        cloneUsers = lodash.orderBy(cloneUsers, [sortField], [sortBy]);
        setUsers(cloneUsers);
    }

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
        // console.log(index);
    };

    const handleUpdateListUserByDelete = (id) => {
        // console.log('id=',id);
        let cloneUsers = lodash.cloneDeep(users);
        let newUsers = cloneUsers.filter(ele => ele.id !== id);
        setUsers(newUsers);
    }

    // Truyền data= user qua component EditUser để hiển thị
    const handleEditUser = (userEdit) => {
        // console.log('check handleEditUser: ', user);
        setDataEdit(userEdit);
        setIsShowModalEdit(true);
    }

    const handleDeleteUser = (userDelete) => {
        console.log('handleDeleteUser: ', userDelete);
        setDataDelete(userDelete);
        setIsShowModalDelete(true);
    }

    const handleSearch = debounce((event) => {
        let temp = event.target.value;
        if (temp) {
            let cloneUsers = lodash.cloneDeep(users);
            cloneUsers = cloneUsers.filter(ele => ele.email.includes(temp));
            if (cloneUsers.length === 0) {
                toast.error('User not found')
            }
            setUsers(cloneUsers);
        } else { getListUser(1); }
    }, 500);

    const getUsersDowmload = (event, done) => {
        let result = [];
        if (users && users.length > 0) {
            result.push(["Id", 'First Name', 'LastName', 'Email', 'Avatar']);
            users.map((ele, index) => {
                let arr = [];
                arr[0] = ele.id;
                arr[1] = ele.first_name;
                arr[2] = ele.last_name;
                arr[3] = ele.email;
                arr[4] = ele.avatar;
                result.push(arr);
            })
            setDataDownload(result);
            done();
        }
    };

    const handleUploadCsv = (event) => {
        if (event.target && event.target.value && event.target.files[0]) {
            let file = event.target.files[0];
            if (file.type !== 'text/csv') {
                toast.info('Error: File not format  .csv...');
                return;
            }
            // console.log('check fileImport: ', file)
            Papa.parse(file, {
                // header: true,
                complete: function (results) {
                    let resultCsv = results.data;
                    if (resultCsv.length > 0) {
                        if (resultCsv[0] && resultCsv[0].length === 4) {
                            if (resultCsv[0][0] !== 'first_name' || resultCsv[0][1] !== 'last_name'
                                || resultCsv[0][2] !== 'email' || resultCsv[0][3] !== 'avatar') {
                                toast.info('Erros: Wrong format Header your file');
                            } else {
                                console.log("Finished:", results.data);
                                let dataUpload = [];
                                resultCsv.map((ele, index) => {
                                    if (index > 0 && ele.length === 4) {
                                        let obj = [];
                                        obj.first_name = ele[0];
                                        obj.last_name = ele[1];
                                        obj.email = ele[2];
                                        obj.avatar = ele[3];
                                        dataUpload.push(obj);
                                    }
                                });
                                setUsers(dataUpload);
                                console.log("Finished:", dataUpload);

                            }
                        } else {
                            toast.info('Erros: Wrong format quantity colum your file');
                        }
                    } else {
                        toast.info('Error:Not found file csv')
                    }
                }
            })
        }
    }

    return (
        <>
            <CreateUser handleUpdateListUserByCreate={handleUpdateListUserByCreate} />
            <div className='row'>
                <div className='col-6 my-2'>
                    <input type='text' className='form-control' placeholder='Search by Email'
                        // value={keySearch} 
                        onChange={(event) => handleSearch(event)} />
                </div>
                <div className='col-6 my-2'>
                    <label htmlFor='import' className="btn btn-primary me-2"><i className="fa-solid fa-file-import"></i> UpLoad file.csv</label>
                    <input type='file' id='import' hidden onChange={(event) => handleUploadCsv(event)} />
                    <CSVLink
                        // data={users} Truyền thẳng list chưa config tên cột
                        data={dataDownload} // Truyền listUser đã config
                        asyncOnClick={true}
                        onClick={getUsersDowmload}
                        filename={"list-user.csv"}
                        className="btn btn-primary"
                    ><i className="bi bi-file-earmark-arrow-down-fill"></i> Download file .csv</CSVLink>
                </div>
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>
                            ID &nbsp;&nbsp;&nbsp;
                            <i className="bi bi-sort-alpha-down" style={{ cursor: 'pointer' }}
                                onClick={() => { handleSort('desc', 'id') }}></i>
                            <i className="bi bi-sort-alpha-up-alt" style={{ cursor: 'pointer' }}
                                onClick={() => { handleSort('asc', 'id') }}></i>
                        </th>
                        <th className='d-flex justify-content-between'>
                            <span>First Name</span>
                            <span>
                                <i className="bi bi-sort-alpha-down" style={{ cursor: 'pointer' }}
                                    onClick={() => { handleSort('desc', 'first_name') }}></i>
                                &nbsp;&nbsp;&nbsp;
                                <i className="bi bi-sort-alpha-up-alt" style={{ cursor: 'pointer' }}
                                    onClick={() => { handleSort('asc', 'first_name') }}></i>
                            </span>
                        </th>
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
                                    <td>{ele.id}</td>
                                    <td>{ele.first_name}</td>
                                    <td>{ele.last_name}</td>
                                    <td>{ele.email}</td>
                                    <td>
                                        <img src={ele.avatar} alt='' style={{ marginLeft: '25%' }} />
                                    </td>
                                    <td >
                                        <button className='btn btn-success me-1' onClick={() => handleEditUser(ele)}>Edit</button>
                                        <>
                                            <EditUser show={isShowModalEdit}
                                                handleClose={handleClose}
                                                dataEdit={dataEdit}
                                                handleUpdateListUserByEdit={handleUpdateListUserByEdit} />
                                        </>
                                        <button className='btn btn-danger' onClick={() => handleDeleteUser(ele)}>Delete</button>
                                        <>
                                            <DeleteUser show={isShowModalDelete}
                                                handleClose={handleClose}
                                                dataDelete={dataDelete}
                                                handleUpdateListUserByDelete={handleUpdateListUserByDelete}
                                            />
                                        </>
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