import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllCode,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
} from "../../services/userService";

// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });
// Action gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCode("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      console.log("fetch gender failed", error);
      dispatch(fetchGenderFailed());
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

// Action position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCode("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

//Action Role

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCode("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);

      if (res && res.errCode === 0) {
        toast.success("Create new user successfully!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error(res.message);
        dispatch(saveUserFailed());
      }
    } catch (error) {
      dispatch(saveUserFailed());
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (error) {
      dispatch(fetchAllUserFailed());
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALLUSER_SUCCESS,
  users: data,
});

export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALLUSER_FAILED,
});

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(id);
      toast.success("Delete user successfully!");
      if (res && res.errCode === 0) {
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.success("Delete user error!");
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      toast.success("Delete user error!");
      dispatch(deleteUserFailed());
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const EditUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      toast.success("Update user successfully!");
      if (res && res.errCode === 0) {
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.success("Update user error!");
        dispatch(editUserFailed());
      }
    } catch (error) {
      toast.success("Update user error!");
      dispatch(editUserFailed());
    }
  };
};

export const editUserSuccess = (data) => ({
  type: actionTypes.EDIT_USER_SUCCESS,
  users: data,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctorsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService();
      if (res && res.errCode === 0) {
        dispatch(fetchTopDoctorsSuccess(res.data));
      } else {
        dispatch(fetchTopDoctorsFailed());
      }
    } catch (error) {
      dispatch(fetchTopDoctorsFailed());
    }
  };
};

export const fetchTopDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
  topDoctors: data,
});

export const fetchTopDoctorsFailed = () => ({
  type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
});

export const fetchAllDoctorsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorsSuccess(res.data));
      } else {
        dispatch(fetchAllDoctorsFailed());
      }
    } catch (error) {
      dispatch(fetchAllDoctorsFailed());
    }
  };
};

export const fetchAllDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  allDoctors: data,
});

export const fetchAllDoctorsFailed = () => ({
  type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
});

export const saveDetailDoctorActions = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctor(data);
      if (res && res.errCode === 0) {
        toast.success("Save detail successfully!");
        // dispatch({
        //   type: SAVE_DETAIl_DOCTOR_SUCCESS,
        // });
      } else {
        toast.error("Update user fail!");
        // dispatch({
        //   type: SAVE_DETAIl_DOCTOR_FAILED,
        // });
      }
    } catch (error) {
      toast.error("Update user fail!");
      // dispatch({
      //   type: SAVE_DETAIl_DOCTOR_FAILED,
      // });
    }
  };
};

export const fetchAllScheduleTimes = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCode("TIME");
      if (res && res.errCode === 0) {
        dispatch(fetchAllScheduleTimesSuccess(res.data));
      } else {
        dispatch(fetchAllScheduleTimesFailed());
      }
    } catch (error) {
      dispatch(fetchAllScheduleTimesFailed());
    }
  };
};

export const fetchAllScheduleTimesSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS,
  dataTimes: data,
});

export const fetchAllScheduleTimesFailed = () => ({
  type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED,
});
