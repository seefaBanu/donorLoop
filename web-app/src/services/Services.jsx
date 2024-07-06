import axios from "axios";

const API_BASE_URL = "http://localhost:8080/";

class Services {
  getBloodRequests(token) {
    return axios.get(API_BASE_URL + "get-blood-requests", {
      headers: {
        
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createBloodRequest(bloodRequest, token) {
    return axios.post(API_BASE_URL, bloodRequest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getBloodRequestById(bloodRequestId, token) {
    return axios.get(API_BASE_URL + "/" + bloodRequestId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateBloodRequest(bloodRequest, bloodRequestId, token) {
    return axios.put(
      API_BASE_URL + "/" + bloodRequestId,
      bloodRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  deleteBloodRequest(bloodRequestId, token) {
    return axios.delete(API_BASE_URL + "/" + bloodRequestId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getBloodBanks(token){
    return axios.get(API_BASE_URL + "get-blood-banks", {
      headers: {
        
        Authorization: `Bearer ${token}`,
      },
    });
  }


  getBloodDonors(token){
    return axios.get(API_BASE_URL + "get-blood-donors", {
      headers: {
        
        Authorization: `Bearer ${token}`,
      },
    });
  }


}

export default new Services();
