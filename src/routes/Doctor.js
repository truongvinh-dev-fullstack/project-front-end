import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import ManageBooking from "../containers/System/Doctor/ManageBooking";

class Doctor extends Component {
  render() {
    const { isLoggedIn } = this.props;
    let role = this.props.userInfo.roleId;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route
                path="/doctor/manage-schedule"
                component={() => {
                  if (role == "R1") return <ManageSchedule />;
                  else return <Redirect to={"/"} />;
                }}
              />
              <Route
                path="/doctor/manage-booking"
                component={() => {
                  if (role == "R2") return <ManageBooking />;
                  else return <Redirect to={"/"} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
