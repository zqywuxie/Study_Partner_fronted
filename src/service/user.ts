import myAxios from "../plugins/MyAxios";
import {getCurrentUserState, setCurrentUserState} from "../state/user";

export const getCurrentUser = async () => {
    //先从本地进行查找
    const currentUser=getCurrentUserState()
    if (currentUser){
        return currentUser
    }
    //本地没有 就进行远程搜索
    const res = await myAxios.get("/user/current")
    console.log(res)
    if (res?.code == 0) {
        setCurrentUserState(res.data)
        return res.data
    }
    return null
}
