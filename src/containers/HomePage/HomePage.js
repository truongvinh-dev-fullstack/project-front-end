import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import OutStandingDoctor from "./section/OutStandingDoctor";

import HomeFooter from "./HomeFooter";
import "./HomePage.scss";

class HomePage extends Component {
  render() {
    return (
      <div>
        <HomeHeader isShowPaner={true} />
        <div className="container">
          <div className="introduction">
            <div className="intro">Introduction: </div>
            <div className="intro-content">
              The center was born in 2002, developed from the first club in
              Hanoi, to become a 5-star standard sports club system. The center
              consists of many teams with extensive experience in the field of
              health and fitness.
            </div>
          </div>
        </div>
        <OutStandingDoctor />

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
