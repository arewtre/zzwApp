// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';

const getUsers = function () {
    let ret = '';
    ret = uni.getStorageSync(USERS_KEY);
    if (!ret) {
        ret = '[]';
    }
    return JSON.parse(ret);
}

const addUser = function (userInfo) {
//     let users = getUsers();
//     users.push({
//         username: userInfo.username,
//         password: userInfo.password,
// 		token: userInfo.token,
//     });
    uni.setStorageSync(USERS_KEY, JSON.stringify(userInfo));
}
const logOut = function () {
	 let ret = '';
     uni.removeStorageSync(USERS_KEY);
	 ret = uni.getStorageSync(USERS_KEY);
	 if (!ret) {
	     return true;
	 }
	 return false;
}
export default {
    getUsers,
    addUser,
	logOut
}
