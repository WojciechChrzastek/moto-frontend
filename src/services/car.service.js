import http from "../http-common";

class CarDataService {
  add(data) {
    return http.post("/carsnouser", data);
  }

  getAll() {
    return http.get("/cars");
  }

}

export default new CarDataService();