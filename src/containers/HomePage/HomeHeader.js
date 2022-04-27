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
                  <b>
                    <FormattedMessage id="homeheader.About-us" />
                  </b>
                </div>
              </div>
              <div className="child-content">
                <div
                  className="sub-title"
                  onClick={() => this.handleViewAllCoach()}
                >
                  <b>
                    <FormattedMessage id="homeheader.HLV" />
                  </b>
                </div>
              </div>
              <div className="child-content">
                <div className="sub-title">
                  <b>
                    <FormattedMessage id="homeheader.Blog" />
                  </b>
                </div>
              </div>
            </div>
            <div className="right-content">
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span
                  onClick={() => {
                    this.onChangeLanguage(LANGUAGES.VI);
                  }}
                >
                  VI
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span
                  onClick={() => {
                    this.onChangeLanguage(LANGUAGES.EN);
                  }}
                >
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowPaner === true && (
          <div className="home-header-banner">
            <div className="banner-up">
              <div className="title-1">
                <b>
                  <FormattedMessage id="homeheader.Fitness-Center" />
                </b>
              </div>
              <div className="title-2">
                <FormattedMessage id="homeheader.health-care" />
              </div>
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
