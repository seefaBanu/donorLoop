import axios from "axios";

const BLOOD_REQUEST_API_BASE_URL = "http://localhost:8080/blood-request";

class Services {
  getBloodRequests(token) {
    return axios.get(BLOOD_REQUEST_API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createBloodRequest(bloodRequest, token) {
    return axios.post(BLOOD_REQUEST_API_BASE_URL, bloodRequest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getBloodRequestById(bloodRequestId, token) {
    return axios.get(BLOOD_REQUEST_API_BASE_URL + "/" + bloodRequestId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateBloodRequest(bloodRequest, bloodRequestId, token) {
    return axios.put(
      BLOOD_REQUEST_API_BASE_URL + "/" + bloodRequestId,
      bloodRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  deleteBloodRequest(bloodRequestId, token) {
    return axios.delete(BLOOD_REQUEST_API_BASE_URL + "/" + bloodRequestId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new Services();
