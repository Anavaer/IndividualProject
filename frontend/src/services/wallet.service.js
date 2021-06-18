import axios from "axios";

const API_URL = "http://localhost:8080/api/investment/";

class AuthService {
  addInvestment(userId, {name, position, volume, price}) {
    return axios
      .post(API_URL + "add", {
        userId,
        name,
        position,
        volume,
        price
      })
      .then(response => response.data);
  }

  getInvestments(userId) {
    return axios
      .get(API_URL + userId)
      .then(response => response.data);
  }

  editInvestment(userId, data) {
    return axios
      .put(API_URL + "edit", {
        userId,
        data
      })
      .then(response => response.data);
  }

  deleteInvestment(userId, row) {
    return axios
      .delete(API_URL + "delete", {
        data: {
          userId,
          row
        }
      })
      .then(response => response.data);
  }
}

export default new AuthService();
