import { conectBeClocks } from "./CustomizeAxios";

const  getListClockService = (size) => {
    return conectBeClocks.get('/list'+'?size=' + size);
};
export {getListClockService}