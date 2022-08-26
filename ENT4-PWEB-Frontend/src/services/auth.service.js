import api from "./api.js";
import TokenService from "./token.service.js";

// class AuthService {
//   login(username, password) {
//     return axios
//       .post(API_URL + "signin", {
//         username,
//         password,
//       })
//       .then((response) => {
//         if (response.data.accessToken) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//         }
//         return response.data;
//       });
//   }
//   logout() {
//     localStorage.removeItem("user");
//   }
//   register(username, email, password, roles) {
//     return axios.post(API_URL + "signup", {
//       username,
//       email,
//       password,
//       roles,
//     });
//   }
//   getCurrentUser() {
//     return JSON.parse(localStorage.getItem("user"));
//   }
// }
// export default new AuthService();
const register = (username, email, password, roles) => {
  return api.post("/auth/signup", {
    username,
    email,
    password,
    roles,
  });
};
const login = (username, password) => {
  return api
    .post("/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
        console.log("TOKEN SERVICE IN");
      }
      return response.data;
    });
};
const logout = () => {
  TokenService.removeUser();
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default AuthService;
