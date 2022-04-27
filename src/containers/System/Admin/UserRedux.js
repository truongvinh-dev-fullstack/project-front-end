import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_Actions, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import TableManagaUser from "./TableManagaUser";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrGenders: [],
      arrPositions: [],
      arrRoles: [],
      previewImgUrl: "",
      isOpen: false,

      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
      phonenumber: "",
      gender: "",
      image: "",
      role: "",

      userEditId: "",

      action: CRUD_Actions.CREATE,
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();

    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux;
      this.setState({
        arrGenders: arrGender,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keymap : "",
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        arrRoles: arrRole,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrRole = this.props.roleRedux;
      let arrGender = this.props.genderRedux;

      this.setState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        address: "",
        phonenumber: "",
        image: "",
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
        action: CRUD_Actions.CREATE,
        previewImgUrl: "",
      });
    }
  }
  handleOnChangImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    console.log("check file: ", data);

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectURL = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectURL,
        image: base64,
      });
      console.log("Base64 ; ", base64);
    }
  };

  openPreviewImg = () => {
    this.setState({
      isOpen: true,
    });
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstname",
      "lastname",
      "address",
      "phonenumber",
      "gender",
      "role",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input missing " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    console.log("Check state for edit: ", this.state);
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;

    if (action === CRUD_Actions.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        roleId: this.state.role,
        image: this.state.image,
      });
    }
    if (action === CRUD_Actions.EDIT) {
      this.props.editUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        roleId: this.state.role,
        image: this.state.image,
      });
    }
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }

    this.setState({
      email: user.email,
      password: "*********",
      firstname: user.firstname,
      lastname: user.lastname,
      address: user.address,
      phonenumber: user.phonenumber,
      image: user.image,
      role: user.roleId,
      gender: user.gender,
      action: CRUD_Actions.EDIT,
      userEditId: user.id,
      previewImgUrl: imageBase64,
    });
  };
  render() {
    console.log("Check state: ", this.state);
    let {
      email,
      password,
      firstname,
      lastname,
      address,
      phonenumber,
      gender,
      image,
      role,
      position,
    } = this.state;
    let genders = this.state.arrGenders;
    let roles = this.state.arrRoles;
    let { reduxGender, language, isGetGender } = this.props;
    return (
      <React.Fragment>
        <div className="react-redux-container">
          <div className="title">User Redux</div>
          <div className="react-redux-body">
            <div className="container">
              <div className="row">
                <div
                  className="col-12 my-3
                "
                >
                  <span>
                    <FormattedMessage id="manage-user.add" />
                  </span>
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      this.onChangeInput(e, "email");
                    }}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      this.onChangeInput(e, "password");
                    }}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={firstname}
                    onChange={(e) => {
                      this.onChangeInput(e, "firstname");
                    }}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={lastname}
                    onChange={(e) => {
                      this.onChangeInput(e, "lastname");
                    }}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.phone-number" />
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    value={phonenumber}
                    onChange={(e) => {
                      this.onChangeInput(e, "phonenumber");
                    }}
                  />
                </div>
                <div className="col-9">
                  <label>
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={address}
                    onChange={(e) => {
                      this.onChangeInput(e, "address");
                    }}
                  />
                </div>
                <div class="col-3">
                  <label>
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    class="form-control"
                    value={gender}
                    onChange={(e) => {
                      this.onChangeInput(e, "gender");
                    }}
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {item.value}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div class="col-3">
                  <label>
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select
                    class="form-control"
                    value={role}
                    onChange={(e) => {
                      this.onChangeInput(e, "role");
                    }}
                  >
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {item.value}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.image" />
                  </label>

                  <div className="preview-image-container">
                    <input
                      type="file"
                      id="UpImg"
                      hidden
                      onChange={(e) => this.handleOnChangImage(e)}
                    />
                    <label className="lable-img" htmlFor="UpImg">
                      Tải ảnh <i className="fas fa-upload"></i>
                    </label>
                    <div
                      className="preview-image"
                      style={{
                        backgroundImage: `url(${this.state.previewImgUrl})`,
                      }}
                      onClick={() => this.openPreviewImg()}
                    ></div>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <button
                    className={
                      this.state.action === CRUD_Actions.EDIT
                        ? "btn btn-warning"
                        : "btn btn-primary"
                    }
                    style={{ padding: "inherit" }}
                    onClick={() => {
                      this.handleSaveUser();
                    }}
                  >
                    <FormattedMessage
                      id={
                        this.state.action === CRUD_Actions.EDIT
                          ? "manage-user.edit"
                          : "manage-user.save"
                      }
                    />
                  </button>
                </div>
                <div className="col-12">
                  <TableManagaUser
                    handleEditUserFromParent={this.handleEditUserFromParent}
                    action={this.state.action}
                  />
                </div>
              </div>
            </div>
          </div>

          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImgUrl}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isGetGender: state.admin.isLoadingGender,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    editUserRedux: (data) => dispatch(actions.EditUserStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
