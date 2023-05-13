import Table from 'react-bootstrap/Table';
import { getListUserService } from '../service/UserService';
import { useEffect, useState } from 'react';

export const ListUser = (props) => {
    const [users, setUsers] = useState([]);
    useEffect(() => { getListUser() }, []);
    const getListUser = async () => {
        let result = await getListUserService();
        setUsers(result && result.data && result.data.data ? result.data.data : [])
    }
    // console.log('users => ', users);

    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr className='text-center'>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Avatar</th>
                </tr>
            </thead>
            <tbody>
                {users && users.length > 0 &&
                    users.map((ele, index) => {
                        return (
                            <tr key={ele.id}>
                                <td>{index + 1}</td>
                                <td>{ele.first_name}</td>
                                <td>{ele.last_name}</td>
                                <td>{ele.email}</td>
                                <td>
                                    <img src={ele.avatar} alt='' style={{marginLeft:'25%'}}/> 
                                </td>
                            </tr>
                        )
                    })}

            </tbody>
        </Table>
    )
}