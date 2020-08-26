import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  add(data) {
    return http.post("/users", data);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }

  findByUsername(username) {
    return http.get(`/users?username=${username}`);
  }

  findByEmail(email) {
    return http.get(`/users?email=${email}`);
  }

  findByPassword(password) {
    return http.get(`/users?password=${password}`);
  }

}

export default new UserDataService();