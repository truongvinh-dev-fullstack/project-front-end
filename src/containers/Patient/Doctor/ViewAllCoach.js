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
