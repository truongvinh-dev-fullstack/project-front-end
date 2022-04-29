import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import { getDetailCoach } from "../../../services/userService";
import { toast } from "react-toastify";

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
      selectedCoach: "",
      description: "",
      price: "",
      allCoachs: [],
      status: false,
    };
  }

  async componentDidMount() {
    this.props.fetchAllCoachsRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allCoachs !== this.props.allCoachs) {
      console.log("check allcoachs : ", this.props.allCoachs);
      let arrCoachs = this.builtListCoachs(this.props.allCoachs);
      this.setState({
        allCoachs: arrCoachs,
      });
    }
  }

  builtListCoachs = (inputData) => {
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

  handleChange = async (selectedCoach) => {
    this.setState({
      selectedCoach: selectedCoach,
    });
    let res = await getDetailCoach(selectedCoach.value);
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
      toast.success("Save done!");
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
      this.props.saveDetailCoach({
        contentHTML: this.state.contentHTML,
        contentMarkdown: this.state.contentMarkdown,
        description: this.state.description,
        coachId: this.state.selectedCoach.value,
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
    const { selectedCoach, allCoachs } = this.state;
    console.log("state: ", this.props);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Create more information Coach</div>
        <div className="more-info">
          <div className="content-left form-group">
            <label>Choose coach</label>
            <Select
              value={selectedCoach}
              onChange={this.handleChange}
              options={allCoachs}
            />
          </div>
          <div className="content-center form-group">
            <label>Price</label>
            <input
              type="number"
              value={this.state.price}
              className="form-control"
              onChange={(e) => {
                this.handleOnChangeInput(e, "price");
              }}
            />
          </div>
          <div className="content-right form-group">
            <label>Description: </label>
            <textarea
              className="form-control"
              onChange={(e) => this.handleOnChangeInput(e, "description")}
              value={this.state.description}
            >
              Thông tin
            </textarea>
          </div>
        </div>
        <button
          className="btn-save"
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {this.state.status === false ? "Save" : "Update"}
        </button>
        <div className="manage-doctor-editor">
          <MdEditor
            value={this.state.contentMarkdown}
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allCoachs: state.admin.allDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCoachsRedux: () => dispatch(actions.fetchAllDoctorsStart()),
    saveDetailCoach: (data) => dispatch(actions.saveDetailDoctorActions(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
