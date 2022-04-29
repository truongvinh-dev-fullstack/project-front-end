import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Select from "react-select";
import "./ManageSchedule.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import {
  saveScheduleDoctor,
  getScheduleDoctor,
} from "../../../services/userService";
import _ from "lodash";
import moment from "moment";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDoctors: [],
      selectedDoctor: "",
      currentDate: "",
      rangeTime: [],
      currentSchedule: [],
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctorsRedux();
    this.props.fetchAllScheduleTimeRedux();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let arrDoctors = this.builtListDoctors(this.props.allDoctors);
      this.setState({
        allDoctors: arrDoctors,
      });
    }
    if (prevProps.scheduleTime !== this.props.scheduleTime) {
      let dataTimes = this.props.scheduleTime;
      dataTimes = dataTimes.map((obj) => ({ ...obj, isSelect: false }));
      this.setState({
        rangeTime: dataTimes,
      });
    }
    if (
      prevState.selectedDoctor !== this.state.selectedDoctor ||
      prevState.currentDate !== this.state.currentDate
    ) {
      let { selectedDoctor, currentDate, rangeTime } = this.state;
      rangeTime = rangeTime.map((item) => {
        item.isSelect = false;
        return item;
      });
      if (
        !_.isEmpty(selectedDoctor) &&
        !(new Date(currentDate) == "Invalid Date")
      ) {
        let doctorId = selectedDoctor.value;
        let date = new Date(currentDate).getTime();

        let res = await getScheduleDoctor(doctorId, date);
        console.log("check schedule: ", res);

        this.setState({
          currentSchedule: res.data,
        });

        for (let i = 0; i < res.data.length; i++) {
          if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map((item) => {
              if (item.keyMap === res.data[i].timeType) {
                item.isSelect = true;
              }

              return item;
            });
          }
        }

        this.setState({
          rangeTime: rangeTime,
        });

        console.log(this.state);
      }
    }
  }

  builtListDoctors = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = `${item.lastname} ${item.firstname}`;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleChange = async (selectedDoctor) => {
    this.setState({
      selectedDoctor: selectedDoctor,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleSelectTime = (data) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === data.id) {
          item.isSelect = !item.isSelect;
        }
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };

  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("Missing date");
      return;
    }
    if (!selectedDoctor) {
      toast.error("Missing doctor");
      return;
    }
    if (rangeTime && rangeTime.length > 0) {
      let selectTime = rangeTime.filter((item) => item.isSelect === true);
      selectTime.map((item) => {
        let object = {};
        object.date = new Date(currentDate).getTime();
        object.coachId = selectedDoctor.value;
        object.timeType = item.keyMap;
        object.maxNumber = 10;
        result.push(object);
      });

      let check = this.checkDateTime();
      if (check) {
        let res = await saveScheduleDoctor(result);
        toast.success("Save done!");
      } else {
        alert("Không được chọn ngày nhỏ hơn ngày hiện tại");
      }

      console.log(result);
      console.log(result);
    }
  };

  checkDateTime = () => {
    let currentDate = new Date();
    currentDate.setHours("00");
    currentDate.setMinutes("00");
    currentDate.setSeconds("00");
    currentDate = currentDate.getTime();
    let postDate = new Date(this.state.currentDate).getTime();

    if (currentDate > postDate) {
      return true;
    }
    if (currentDate <= postDate) {
      return true;
    }
  };

  render() {
    let { selectedDoctor, allDoctors, rangeTime } = this.state;
    // console.log("check state: ", this.state);
    return (
      <React.Fragment>
        <div className="header-title">Manage Schedule</div>
        <div className="container">
          <div className="row">
            <div className="col-6 ">
              <label>Choose coach</label>
              <Select
                value={selectedDoctor}
                onChange={this.handleChange}
                options={allDoctors}
              />
            </div>
            <div className="col-6 ">
              <label>Date</label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
              />
            </div>

            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelect === true
                          ? " btn-schedule active"
                          : " btn-schedule"
                      }
                      key={index}
                      onClick={() => {
                        this.handleSelectTime(item);
                      }}
                    >
                      {item.value}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary btn-save"
                onClick={() => {
                  this.handleSaveSchedule();
                }}
              >
                Save info
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    scheduleTime: state.admin.scheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctorsStart()),
    fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTimes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
