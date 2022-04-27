import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  scheduleTime: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      console.log("Vinh get start gender: ", action);
      state.isLoadingGender = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      console.log("get gender success: ", action);
      state.isLoadingGender = true;
      state.genders = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };

    case actionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
      };

    case actionTypes.CREATE_USER_FAILED:
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLUSER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLUSER_FAILED:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
      };

    case actionTypes.DELETE_USER_FAILED:
      return {
        ...state,
      };

    case actionTypes.EDIT_USER_SUCCESS:
      return {
        ...state,
      };

    case actionTypes.EDIT_USER_FAILED:
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      state.topDoctors = action.topDoctors;
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
      state.topDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.allDoctors;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      state.allDoctors = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS:
      state.scheduleTime = action.dataTimes;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED:
      state.scheduleTime = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default appReducer;
