import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkToRedirect: "",
    };
  }

  onChangeLanguae = (language) => {
    this.props.changeLanguage(language);
  };

  componentDidMount() {
    let { isLoggedIn } = this.props;
    let { userInfo } = this.props;
    if (userInfo) {
      if (userInfo.roleId === "R1" && isLoggedIn) {
        this.setState({
          linkToRedirect: "/system/user-redux",
        });
      }

      if (userInfo.roleId === "R2" && isLoggedIn) {
        this.setState({
          linkToRedirect: "/doctor/manage-booking",
        });
      }
    }

    if (!isLoggedIn) {
      this.setState({
        linkToRedirect: "/login",
      });
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    let { linkToRedirect } = this.state;

    return <Redirect to={linkToRedirect} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
