import axios from "../axios";

const handleLoginAPI = (email, password) => {
  return axios.post("/api/login", { email: email, password: password });
};

const getAllUsers = (id) => {
  return axios.get(`/api/get-all-users?id=${id}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (id) => {
  return axios.delete("/api/delete-user", { data: { id: id } });
};

const editUserService = (data) => {
  return axios.put("/api/edit-user", data);
};
const getAllCode = (InputData) => {
  return axios.get(`/api/allcode?type=${InputData}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
  return axios.get("/api/allDoctor");
};

const saveDetailDoctor = (data) => {
  return axios.post("/api/save-infor-doctor", data);
};
const getDetailCoach = (id) => {
  return axios.get(`/api/get-detail-doctor?id=${id}`);
};

const saveScheduleDoctor = (data) => {
  return axios.post("/api/save-schedule-doctor", data);
};

const getScheduleDoctor = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor?doctorId=${doctorId}&date=${date}`
  );
};

const getProfileCoach = (id) => {
  return axios.get(`/api/get-profile-coach?id=${id}`);
};

const saveBookingByUser = (data) => {
  return axios.post("/api/booking-user", data);
};

const getListBookingByDate = (coachId, date) => {
  return axios.get(`/api/get-list-booking?coachId=${coachId}&date=${date}`);
};

const confirmBooking = (data) => {
  return axios.post("/api/confirm-booking-by-coach", data);
};

const getAllCoach = () => {
  return axios.get("/api/get-all-coach");
};

export {
  getAllCoach,
  confirmBooking,
  getListBookingByDate,
  saveBookingByUser,
  getProfileCoach,
  handleLoginAPI,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCode,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getDetailCoach,
  saveScheduleDoctor,
  getScheduleDoctor,
};
