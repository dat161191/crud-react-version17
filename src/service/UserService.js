import  {instance}  from "./CustomizeAxios.js";
// import axios from "axios";
const getListUserService = () => {
    return instance.get('users?page=2')
};

export { getListUserService };