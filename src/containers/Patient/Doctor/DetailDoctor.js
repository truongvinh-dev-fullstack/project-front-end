import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailDoctor } from "../../../services/userService";
import CoachSchdule from "./CoachSchedule";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
      console.log(res);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    console.log("check state: ", this.state);
    let { detailDoctor } = this.state;
    return (
      <>
        <HomeHeader isShowPaner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${detailDoctor.image})`,
              }}
            ></div>

            <div className="content-right">
              <div className="up">
                {detailDoctor.lastname} {detailDoctor.firstname}
              </div>
              <div className="down">
                {detailDoctor.Markdown && detailDoctor.Markdown.description && (
                  <span>{detailDoctor.Markdown.description}</span>
                )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <CoachSchdule doctorId={detailDoctor.id} />
          </div>
          <div className="detail-info-doctor">
            {detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: `${detailDoctor.Markdown.contentHTML}`,
                }}
              ></div>
            )}
          </div>
          <div className="comment-doctor"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
