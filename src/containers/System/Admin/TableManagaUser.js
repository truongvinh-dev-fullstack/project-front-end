import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";

import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.users !== this.props.users) {
      let arrUses = this.props.users;
      this.setState({
        userRedux: arrUses,
      });
    }
  }

  handleDeleteUser = (id) => {
    this.props.deleteUserRedux(id);
  };
  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user);
  };

  render() {
    console.log("check all user: ", this.props.users);
    let arrUsers = this.state.userRedux;

    return (
      <React.Fragment>
        <div className="user-container">
          <div className="user-table my-3 mb-5">
            <table id="customers">
              <tbody>
                <tr>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last name</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>

                {arrUsers &&
                  arrUsers.length > 0 &&
                  arrUsers.map((item, index) => {
                    return (
                      <tr>
                        <td>{item.email}</td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.address}</td>
                        <td className="text-center">
                          <button
                            className="btn-edit"
                            onClick={() => {
                              this.handleEditUser(item);
                            }}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => {
                              this.handleDeleteUser(item.id);
                            }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
