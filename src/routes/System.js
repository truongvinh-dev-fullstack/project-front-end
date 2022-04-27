import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import Header from "../containers/Header/Header";

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    let role = this.props.userInfo.roleId;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              {/* <Route path="/system/user-manage" component={UserManage} /> */}
              <Route
                path="/system/user-redux"
                component={() => {
                  if (role == "R1") return <UserRedux />;
                  else return <Redirect to={"/"} />;
                }}
              />
              <Route
                path="/system/manage-doctor"
                component={() => {
                  if (role == "R1") return <ManageDoctor />;
                  else return <Redirect to={"/"} />;
                }}
              />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
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
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
