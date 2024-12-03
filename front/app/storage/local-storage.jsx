const setUserInfo = (user_info) => {
    localStorage.setItem("user_info", user_info)
}
const getUserInfo = () => {
    return localStorage.getItem("user_info")
}
const setUserLogged = (logged) => {
    localStorage.setItem("logged", logged)
}
const getUserLogged = () => {
    return localStorage.getItem("logged")
}


export default {
    setUserInfo,
    getUserInfo,
    setUserLogged,
    getUserLogged,
  };