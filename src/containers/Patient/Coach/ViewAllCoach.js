import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import HomeHeader from "../../HomePage/HomeHeader";
import "./ViewAllCoach.scss";
import { getAllCoach } from "../../../services/userService";
import ProfileCoach from "./ProfileCoach";
import ReactPaginate from "react-paginate";
import { withRouter } from "react-router";

class ViewAllCoach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCoachs: [],
      pageCount: "",
      newCoachs: "",
    };
  }

  componentDidMount() {
    this.getAllCoachByReact();
    this.getCurrentCoachPage(1);
  }

  getAllCoachByReact = async () => {
    let res = await getAllCoach();
    if (res && res.data.length > 0) {
      let pageCount = Math.ceil(res.data.length / 5);
      this.setState({
        pageCount: pageCount,
        arrCoachs: res.data,
      });
    }
  };

  getCurrentCoachPage = (currentPage) => {
    let arrCoachs = this.state.arrCoachs;
    let newCoachs = [];
    for (let i = currentPage * 5 - 5; i < currentPage * 5; i++) {
      if (i >= arrCoachs.length) {
        break;
      } else {
        let obj = arrCoachs[i];
        newCoachs.push(obj);
      }
    }
    this.setState({
      newCoachs: newCoachs,
    });
  };

  handleClickPage = (data) => {
    let currentPage = data.selected + 1;
    this.getCurrentUserPage(currentPage);
  };

  handleViewDetail = (coachId) => {
    this.props.history.push(`/detail-doctor/${coachId}`);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    console.log("check state: ", this.state);
    let { arrCoachs, pageCount } = this.state;
    return (
      <>
        <HomeHeader isShowPaner={false} />
        <div className="coach-detail-container">
          <div className="intro-title">
            <span>
              Undoubtedly, working out with a personal trainer is the fastest
              and most effective way to achieve your health and fitness goals.
              We design programs to suit the most common needs of our members,
              and we also design personalized workouts to suit each person's
              fitness and needs
            </span>
          </div>
          <div className="Title-coachs">List Coachs</div>
          {arrCoachs &&
            arrCoachs.length > 0 &&
            arrCoachs.map((item, index) => {
              return (
                <div
                  className="coach-item"
                  onClick={() => {
                    this.handleViewDetail(item.id);
                  }}
                >
                  <ProfileCoach coachId={item.id} />
                </div>
              );
            })}
          <div className="paginate">
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              breakLabel="..."
              pageCount={pageCount}
              marginPagesDisplayed={3}
              onPageChange={this.handleClickPage}
              containerClassName="pagination justify-content-center"
              pageClassName="page-item"
              previousClassName="page-item"
              nextClassName="page-item"
              pageLinkClassName="page-link"
              previousLinkClassName="page-link"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              activeClassName="active"
            />
          </div>

          <div className="footer">
            <div className="footer-title">STEPS TO WORK WITH A COACH</div>
            <div className="footer-content row">
              <div className="col-6 child">
                <div className="child-title">Step One</div>
                <div className="child-content">
                  <b>Define physical goals</b> - (note: sometimes the goal you
                  think about before is not necessarily the most realistic and
                  accurate goal for you).
                </div>
              </div>
              <div className="col-6 child">
                <div className="child-title">Step Two</div>
                <div className="child-content">
                  <b>Determine current physical capacity</b> - (pay attention:
                  focus on factors such as existing postural deformities, core
                  strength, physical injuries...).
                </div>
              </div>
              <div className="col-6 child">
                <div className="child-title">Step Three</div>
                <div className="child-content">
                  <b>Your personal trainer will create a training plan for</b>{" "}
                  you to best suit your current physical ability and still
                  achieve your goals, including Frequency, Intensity, and Type
                  of Exercise. And don't forget to share with your coach what
                  types of exercises you like.
                </div>
              </div>
              <div className="col-6 child">
                <div className="child-title">Step Four</div>
                <div className="child-content">
                  <b>Strictly</b> follow the plan the coach has given you.
                </div>
              </div>
            </div>
          </div>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViewAllCoach)
);
