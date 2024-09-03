import axios from "axios";

const API_BASE_URL =
  "https://ec2-52-65-210-159.ap-southeast-2.compute.amazonaws.com:443/";

class Services {
  getBloodRequests(token) {
    return axios.get(API_BASE_URL + "blood-request", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createBloodRequest(bloodRequest, token) {
    return axios.post(API_BASE_URL + "blood-request", bloodRequest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getBloodRequestById(bloodRequestId, token) {
    return axios.get(API_BASE_URL + "blood-request/" + bloodRequestId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateBloodRequest(bloodRequest, bloodRequestId, token) {
    return axios.put(
      API_BASE_URL + "blood-request/" + bloodRequestId,
      bloodRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  deleteBloodRequest(bloodRequestId, token) {
    return axios.delete(API_BASE_URL + "blood-request/" + bloodRequestId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getBloodBanks(token) {
    return axios.get(API_BASE_URL + "get-blood-banks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getBloodDonors(token) {
    return axios.get(API_BASE_URL + "get-blood-donors", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getBloodAvailability(bloodBankId, token) {
    return axios.get(API_BASE_URL + "blood-availability/" + bloodBankId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateBloodAvailabilityStatus(bloodAvailabilityId, status, token) {
    return axios.put(
      API_BASE_URL +
        "blood-availability/" +
        bloodAvailabilityId +
        "?status=" +
        status,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  createBloodAvailability(profileDTO, token) {
    return axios.post(API_BASE_URL + "blood-availability", profileDTO, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  findBloodByBloodBank(token) {
    return axios.get(API_BASE_URL + "find-blood/blood-banks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  findBloodByBloodDonors(token) {
    return axios.get(API_BASE_URL + "find-blood/blood-donors", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  //Notification
  getNotificationsByBloodDonorId(bloodDonorId, token) {
    return axios.get(API_BASE_URL + "notification/" + bloodDonorId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  markAsRead(notificationId, token) {
    return axios.post(
      API_BASE_URL + "notification/mark-as-read/" + notificationId,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  markAllAsRead(bloodDonorId, token) {
    return axios.post(
      API_BASE_URL + "notification/mark-all-as-read/" + bloodDonorId,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  //Donation
  getDonationHistoryByBloodDonorId(bloodDonorId, token) {
    return axios.get(API_BASE_URL + `donation-history/${bloodDonorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createDonationHistory(donationHistory, token) {
    return axios.post(API_BASE_URL + "donation-history", donationHistory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateDonationHistory(donationHistory, token) {
    return axios.put(API_BASE_URL + "donation-history", donationHistory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteDonationHistory(donationHistoryId, token) {
    return axios.delete(
      API_BASE_URL + "donation-history/" + donationHistoryId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  //Profile
  getBloodDonorProfile(bloodDonorId, token) {
    return axios.get(API_BASE_URL + "blood-donor-profile/" + bloodDonorId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createBloodDonorProfile(profile, token) {
    return axios.post(API_BASE_URL + "blood-donor-profile", profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateBloodDonorProfile(donorId, status, token) {
    return axios.put(
      API_BASE_URL + "blood-donor-profile/status/" + donorId,
      status,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  //camp
  createCamp(camp, token) {
    return axios.post(API_BASE_URL + "camps", camp, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getCamps(token) {
    return axios.get(API_BASE_URL + "camps", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteCamp(campId, token) {
    return axios.delete(API_BASE_URL + "camps/" + campId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateCamp(camp, campId, token) {
    return axios.put(API_BASE_URL + "camps/" + campId, camp, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  }

}

export default new Services();
