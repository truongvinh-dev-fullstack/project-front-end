import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalBooking.scss";
import { Modal } from "reactstrap";
import ProfileCoach from "./ProfileCoach";
import _ from "lodash";
import moment from "moment";
import * as actions from "../../../store/actions";
import { saveBookingByUser } from "../../../services/userService";
import { toast } from "react-toastify";

class ModalBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstname: "",
      lastname: "",
      phonenumber: "",
      address: "",
      gender: "",
      coachId: "",
      date: "",
      timeType: "",
    };
  }

  componentDidMount() {
    this.props.getGenderStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        gender: this.props.genderRedux[0].keyMap,
      });
    }
    if (prevProps.dataScheduleModal !== this.props.dataScheduleModal) {
      this.setState({
        coachId: this.props.dataScheduleModal.coachId,
        date: new Date(this.props.dataScheduleModal.date).getTime(),
        timeType: this.props.dataScheduleModal.timeType,
      });
    }
  }

  handleOnChangeInput = (e, id) => {
    let value = e.target.value;
    let copyState = { ...this.state };
    copyState[id] = value;
    this.setState({ ...copyState });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "firstname",
      "lastname",
      "address",
      "phonenumber",
      "gender",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input missing " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  handleConfimBooking = async () => {
    let check = this.checkValidateInput();
    if (check) {
      let res = await saveBookingByUser(this.state);
      toast.success("Appointment successful!");
      console.log("check res:", res);
    }
  };

  render() {
    let { closeModal, dataScheduleModal, genderRedux } = this.props;
    let coachId = "";
    if (dataScheduleModal && !_.isEmpty(dataScheduleModal)) {
      coachId = dataScheduleModal.coachId;
    }
    console.log(dataScheduleModal);
    console.log("check state: ", this.state);
    let { gender } = this.state;
    // console.log("check time: ", dataScheduleModal.Allcode.value);
    return (
      <>
        <Modal
          isOpen={this.props.openModal}
          size="lg"
          centered={true}
          className="booking-modal-container"
        >
          <div className="booking-content">
            <div className="booking-header">
              <span className="left">Booking</span>
              <span className="right" onClick={closeModal}>
                <i class="fas fa-times-circle"></i>
              </span>
            </div>
            <div className="booking-body">
              <div className="coach-info">
                <ProfileCoach coachId={coachId} />
              </div>
              <div className="date-time">
                <span className="date">
                  Date : &nbsp;
                  {moment(new Date(dataScheduleModal.date)).format(
                    "DD/MM/YYYY"
                  )}
                </span>
                <span className="time">
                  Time :&nbsp;
                  {dataScheduleModal.Allcode &&
                    dataScheduleModal.Allcode.value !== "" && (
                      <span>{dataScheduleModal.Allcode.value}</span>
                    )}
                </span>
              </div>
              <div className="row">
                <div className="col-6 form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.firstname}
                    onChange={(e) => this.handleOnChangeInput(e, "firstname")}
                  ></input>
                </div>
                <div className="col-6 form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.lastname}
                    onChange={(e) => this.handleOnChangeInput(e, "lastname")}
                  ></input>
                </div>
                <div className="col-6 form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={(e) => this.handleOnChangeInput(e, "email")}
                  ></input>
                </div>
                <div className="col-6 form-group">
                  <label>Phone number</label>
                  <input
                    type="number"
                    className="form-control"
                    value={this.state.phonenumber}
                    onChange={(e) => this.handleOnChangeInput(e, "phonenumber")}
                  ></input>
                </div>
                <div className="col-6 form-group">
                  <label>Gender</label>
                  <select
                    className="form-control"
                    value={gender}
                    onChange={(e) => this.handleOnChangeInput(e, "gender")}
                  >
                    {genderRedux &&
                      genderRedux.length > 0 &&
                      genderRedux.map((item, index) => {
                        return (
                          <option value={item.keyMap}>{item.value}</option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-6 form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.address}
                    onChange={(e) => this.handleOnChangeInput(e, "address")}
                  ></input>
                </div>
              </div>
            </div>
            <div className="booking-footer">
              <button
                className="btn-booking-confim"
                onClick={() => this.handleConfimBooking()}
              >
                Confim
              </button>
              <button className="btn-booking-cancel" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);
