import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { LANGUAGES } from "../../utils";
import { changeLanguageAPP } from "../../store/actions";

import { withRouter } from "react-router";

class HomeHeader extends Component {
  onChangeLanguage = (language) => {
    this.props.changeLanguage(language);
  };

  handleViewHome = () => {
    this.props.history.push("/home");
  };

  handleViewAllCoach = () => {
    this.props.history.push("/viewALlCoach");
  };

  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <div
                className="header-logo"
                onClick={() => {
                  this.handleViewHome();
                }}
              >
                Fitness
              </div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div className="sub-title">
                  <b>About Us</b>
                </div>
                <div
                  className="sub-title"
                  onClick={() => this.handleViewAllCoach()}
                >
                  <b>Fitness trainer</b>
                </div>
                <div className="sub-title">
                  <b>Blog</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowPaner === true && (
          <div className="home-header-banner">
            <div className="banner-up">
              <div className="title-1">
                <b>Fitness-Center</b>
              </div>
              <div className="title-2">Having health is having everything</div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (language) => dispatch(changeLanguageAPP(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
