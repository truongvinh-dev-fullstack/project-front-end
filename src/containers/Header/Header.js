import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, ROLE_USER } from "../../utils";
import { FormattedMessage } from "react-intl";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
    };
  }

  onChangeLanguae = (language) => {
    this.props.changeLanguage(language);
  };

  componentDidMount() {
    let { userInfo } = this.props;
    if (userInfo.roleId === ROLE_USER.ADMIN) {
      this.setState({
        menu: adminMenu,
      });
    }
    if (userInfo.roleId === ROLE_USER.DOCTOR) {
      this.setState({
        menu: doctorMenu,
      });
    }
  }
  render() {
    const { processLogout, language, userInfo } = this.props;
    const { menu } = this.state;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={menu} />
        </div>
        <div className="languages">
          <span className="welcome">
            <FormattedMessage id="homeheader.welcome" />,{" "}
            {userInfo && userInfo.firstname ? userInfo.firstname : ""} !
          </span>
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguage: (language) => dispatch(actions.changeLanguageAPP(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
