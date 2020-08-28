import http from "../http-common";

class CarDataService {
  getAll() {
    return http.get("/cars");
  }

  get(id) {
    return http.get(`/cars/${id}`);
  }

  add(data) {
    return http.post("/cars", data);
  }

  update(id, data) {
    return http.put(`/cars/${id}`, data);
  }

  delete(id) {
    return http.delete(`/cars/${id}`);
  }

  deleteAll() {
    return http.delete(`/cars`);
  }

  findByBrand(brand) {
    return http.get(`/cars?brandname=${brand}`);
  }

  findByModel(model) {
    return http.get(`/cars?modelname=${model}`);
  }

}

export default new CarDataService();