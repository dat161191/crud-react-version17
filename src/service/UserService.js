import { instance } from "./CustomizeAxios.js";
// import axios from "axios";
const getListUserService = (page) => {
    return instance.get(`/users?page=${page}`)
};
const createUser = (user) => {
    return instance.post('/users', user)
};
const updateUser = (user) => {
    let name = user.name;
    let job = user.job;
    return instance.put(`/users/${user.id}`, { name, job })
};
export { getListUserService, createUser, updateUser };