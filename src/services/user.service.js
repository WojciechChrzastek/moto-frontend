import http from "../http-common";

class UserDataService {
  create(data) {
    return http.post("/users", data);
  }

  getAll() {
    return http.get("/users");
  }

}

export default new UserDataService();