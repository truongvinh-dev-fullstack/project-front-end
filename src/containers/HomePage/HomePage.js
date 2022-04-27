import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Speciality from "./section/speciality";
import MedicalFacility from "./section/MedicalFacility";
import OutStandingDoctor from "./section/OutStandingDoctor";
import Rosemary from "./section/Rosemary";
import HomeFooter from "./HomeFooter";
import "./HomePage.scss";

class HomePage extends Component {
  render() {
    return (
      <div>
        <HomeHeader isShowPaner={true} />
        {/* <Speciality /> */}
        {/* <MedicalFacility /> */}
        <OutStandingDoctor />
        {/* <Rosemary /> */}
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
