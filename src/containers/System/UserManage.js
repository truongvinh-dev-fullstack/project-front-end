import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";
import "./Usermanage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import _ from "lodash";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      editUser: {},
    };
  }

  async componentDidMount() {
    await this.getAllUserFromReact();
  }

  getAllUserFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUser: response.users,
      });
    }
    console.log("get all user from nodejs :", response);
  };

  handleCreateNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleModalUser = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  toggleModaEditlUser = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  handleEditUser = async (item) => {
    let user = await getAllUsers(item.id);
    this.setState({
      isOpenModalEditUser: true,
      editUser: user.users,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteUser = async (id) => {
    try {
      let response = await deleteUserService(id);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenModalUser: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  DoEditUser = async (data) => {
    try {
      let response = await editUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenModalEditUser: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let arrUser = this.state.arrUser;

    return (
      <div className="user-container">
        <ModalUser
          isOpenAdd={this.state.isOpenModalUser}
          toggleModalUser={this.toggleModalUser}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser === true && (
          <ModalUser
            isOpenEdit={this.state.isOpenModalEditUser}
            toggleModalUser={this.toggleModaEditlUser}
            DoEditUser={this.DoEditUser}
            editUser={this.state.editUser}
          />
        )}

        <div className="title text-center">Manage User</div>
        <div className="mx-3">
          <button
            className="btn btn-primary px-3"
            onClick={() => {
              this.handleCreateNewUser();
            }}
          >
            <i className="fas fa-plus"></i> Create New User
          </button>
        </div>
        <div className="user-table mt-3 mx-3">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
              {arrUser &&
                arrUser.map((item, indext) => {
                  return (
                    <>
                      <tr>
                        <td>{item.email}</td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.address}</td>
                        <td className="text-center">
                          <button
                            className="btn-edit"
                            onClick={() => this.handleEditUser(item)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => this.handleDeleteUser()}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
