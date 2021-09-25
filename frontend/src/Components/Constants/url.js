const SERVERPORT = 8080;
const SERVER = `http://localhost:${SERVERPORT}`;
export const urls = {
   login: `${SERVER}/login`,
   searchUser: `${SERVER}/searchUser`,
   getUser: `${SERVER}/user`,
};

//`http://localhost:8080/searchUser?name=${user}&skill=&userType=`
