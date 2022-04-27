import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageBooking.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getListBookingByDate,
  confirmBooking,
} from "../../../services/userService";

class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      coach: "",
      arrBooking: [],
    };
  }

  async componentDidMount() {
    this.setState({
      coach: this.props.user,
    });

    let { currentDate } = this.state;
    let dateTimeStemp = new Date(currentDate).getTime();

    let res = await getListBookingByDate(this.props.user.id, dateTimeStemp);
    if (res && res.data && res.data.length > 0) {
      this.setState({
        arrBooking: res.data,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.currentDate !== this.state.currentDate) {
      let { currentDate } = this.state;
      let dateTimeStemp = new Date(currentDate).getTime();

      let res = await getListBookingByDate(this.props.user.id, dateTimeStemp);
      if (res && res.data && res.data.length > 0) {
        this.setState({
          arrBooking: res.data,
        });
      }
    }
  }

  GetAllBookingByDate = async () => {
    let { currentDate } = this.state;
    let dateTimeStemp = new Date(currentDate).getTime();

    let res = await getListBookingByDate(this.props.user.id, dateTimeStemp);
    if (res && res.data && res.data.length > 0) {
      this.setState({
        arrBooking: res.data,
      });
    }
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
    console.log(date[0]);
  };

  handleConfirmBooking = async (id, firstname, email) => {
    if (id) {
      let res = await confirmBooking({
        id: id,
        firstname: firstname,
        email: email,
      });
      if (res && res.errCode == 0) {
        this.GetAllBookingByDate();
      }
    }
  };

  render() {
    let { arrBooking } = this.state;
    console.log("check state: ", this.state);
    return (
      <>
        <div className="manage-booking-container">
          <div className="m-p-title">Manage Booking</div>
          <div className="manage-booking-body row">
            <div className="col-6 form-group">
              <label>Date</label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
              />
            </div>
            <div className="col-12 table-manage">
              <table style={{ width: "100%" }}>
                <tr>
                  <th>Status</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
                {arrBooking &&
                  arrBooking.length > 0 &&
                  arrBooking.map((item, index) => {
                    return (
                      <tr>
                        <td>{item.statusData.value}</td>
                        <td>{item.userData.firstname}</td>
                        <td>{item.userData.lastname}</td>
                        <td>{item.userData.address}</td>
                        <td>{item.userData.phonenumber}</td>
                        <td>{item.userData.genderData.value}</td>
                        <td>
                          {item.statusId == "S1" ? (
                            <button
                              className="btn btn-primary confirm"
                              onClick={() =>
                                this.handleConfirmBooking(
                                  item.id,
                                  item.userData.firstname,
                                  item.userData.email
                                )
                              }
                            >
                              Confirm
                            </button>
                          ) : (
                            <button className="btn btn-primary confirmed">
                              Confirmed
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
