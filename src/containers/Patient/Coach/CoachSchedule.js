import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HomeHeader";
import { getScheduleDoctor } from "../../../services/userService";
import moment from "moment";
import ModalBooking from "./ModalBooking";
import "./CoachSchedule.scss";

import "./CoachSchedule.scss";
class CoachSchdule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDay: [],
      rangeTime: [],
      currentSchedule: [],
      arrSchedule: [],
      OpenModal: false,
      dataScheduleModal: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllScheduleTimeRedux();
    let allDay = this.getDayForSelect();

    console.log("Check: ", allDay);
    this.setState({
      allDay: allDay,
    });
  }

  getDayForSelect = () => {
    let { language } = this.props;
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      obj.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      obj.value = moment(new Date()).add(i, "days").startOf("days").valueOf();
      arrDate.push(obj);
    }
    // this.setState({
    //   allDay: arrDate,
    // });
    return arrDate;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctorId !== this.props.doctorId) {
      let allDay = this.state.allDay;
      if (allDay && allDay.length > 0) {
        let res = await getScheduleDoctor(this.props.doctorId, allDay[0].value);
        if (res.errCode == 0) {
          this.setState({
            arrSchedule: res.data,
          });
        } else {
          this.setState({
            arrSchedule: [],
          });
        }
      }
    }
    if (prevProps.scheduleTime !== this.props.scheduleTime) {
      let dataTimes = this.props.scheduleTime;
      dataTimes = dataTimes.map((obj) => ({ ...obj, isSelect: false }));
      this.setState({
        rangeTime: dataTimes,
      });
    }
  }

  handleGetSchedule = async (e) => {
    let { doctorId } = this.props;
    if (doctorId) {
      let date = e.target.value;
      let res = await getScheduleDoctor(doctorId, date);
      console.log(res);
      // for (let i = 0; i < res.data.length; i++) {
      //   if (rangeTime && rangeTime.length > 0) {
      //     rangeTime = rangeTime.map((item) => {
      //       if (item.keyMap === res.data[i].timeType) {
      //         item.isSelect = true;
      //       }
      //       return item;
      //     });
      //   }
      // }

      if (res.errCode == 0) {
        this.setState({
          arrSchedule: res.data,
        });
      } else {
        this.setState({
          arrSchedule: [],
        });
      }

      // this.setState({
      //   rangeTime: rangeTime,
      // });
    }
  };

  handleOpenModalBooking = (item) => {
    console.log("CHeck: ", item);
    this.setState({
      OpenModal: !this.state.OpenModal,
      dataScheduleModal: item,
    });
  };

  closeModalBooking = () => {
    this.setState({
      OpenModal: !this.state.OpenModal,
    });
  };

  render() {
    let { allDay, dataScheduleModal, arrSchedule } = this.state;
    console.log("Check schedule: ", arrSchedule);
    return (
      <>
        <div className="Coach-schedule-container">
          <div className="title-schedule">Book an appointment for free</div>
          <div className="choose-time">
            <select onChange={(e) => this.handleGetSchedule(e)}>
              {allDay &&
                allDay.length > 0 &&
                allDay.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-time">
            <div className="">
              {arrSchedule && arrSchedule.length > 0 ? (
                arrSchedule.map((item, index) => {
                  return (
                    <button
                      className={" btn-schedule"}
                      key={index}
                      onClick={() => {
                        this.handleOpenModalBooking(item);
                      }}
                    >
                      {item.Allcode.value}
                    </button>
                  );
                })
              ) : (
                <div>The coach has no practice schedule</div>
              )}
            </div>
          </div>
        </div>
        <ModalBooking
          openModal={this.state.OpenModal}
          closeModal={this.closeModalBooking}
          dataScheduleModal={dataScheduleModal}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    scheduleTime: state.admin.scheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTimes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoachSchdule);
