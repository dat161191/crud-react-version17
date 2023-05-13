import axios from "axios";
const getListUserService = () => {
    return axios.get('https://reqres.in/api/users?page=2')
}
export { getListUserService };