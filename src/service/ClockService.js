import { conectBeClocks } from "./CustomizeAxios";

const  getListClockService = (page) => {
    return conectBeClocks.get(`/list`);
};
export {getListClockService}