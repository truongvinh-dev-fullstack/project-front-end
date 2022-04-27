import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import { getDetailDoctor } from "../../../services/userService";

import Select from "react-select";
import _ from "lodash";

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      price: "",
      allDoctors: [],
      status: false,
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctorsRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let arrDoctors = this.builtListDoctors(this.props.allDoctors);
      this.setState({
        allDoctors: arrDoctors,
      });
    }
  }

  builtListDoctors = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = `${item.lastname} ${item.firstname}`;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleChange = async (selectedDoctor) => {
    this.setState({
      selectedDoctor: selectedDoctor,
    });
    let res = await getDetailDoctor(selectedDoctor.value);
    if (
      res &&
      res.errCode === 0 &&
      res.data &&
      !_.isEmpty(res.data.Markdown.contentMarkdown) &&
      !_.isEmpty(res.data.Markdown.description)
    ) {
      this.setState({
        description: res.data.Markdown.description,
        contentMarkdown: res.data.Markdown.contentMarkdown,
        contentHTML: res.data.Markdown.contentHTML,
        price: res.data.Coach_info.price,
        status: true,
      });
    } else {
      this.setState({
        description: "",
        contentMarkdown: "",
        contentHTML: "",
        price: "",
        status: false,
      });
    }
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = () => {
    let check = this.checkValidateInput();
    if (check) {
      console.log("check:", this.state);
      this.props.saveDetailDoctor({
        contentHTML: this.state.contentHTML,
        contentMarkdown: this.state.contentMarkdown,
        description: this.state.description,
        coachId: this.state.selectedDoctor.value,
        price: this.state.price,
      });
    }
  };
  handleOnChangeInput = (event, input) => {
    let copyState = { ...this.state };
    copyState[input] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["price", "description", "contentMarkdown"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input missing " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  render() {
    const { selectedDoctor, allDoctors } = this.state;
    console.log("state: ", this.state);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thêm thông tin HLV</div>
        <div className="more-info">
          <div className="content-left form-group">
            <label>Chọn huấn luyện viên</label>
            <Select
              value={selectedDoctor}
              onChange={this.handleChange}
              options={allDoctors}
            />
          </div>
          <div className="content-left form-group">
            <label>Price</label>
            <input
              type="number"
              value={this.state.price}
              onChange={(e) => {
                this.handleOnChangeInput(e, "price");
              }}
            />
          </div>
          <div className="content-right form-group">
            <label>THông tin giới thiệu: </label>
            <textarea
              className="form-control"
              onChange={(e) => this.handleOnChangeInput(e, "description")}
              value={this.state.description}
            >
              Thông tin
            </textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            value={this.state.contentMarkdown}
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          className="btn-save"
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {this.state.status === false ? "Lưu thông tin" : "Update"}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctorsStart()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctorActions(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
