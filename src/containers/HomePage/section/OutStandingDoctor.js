import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topDoctors: [],
    };
  }

  componentDidMount() {
    this.props.fetchTopDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.arrTopDoctors !== this.props.arrTopDoctors) {
      this.setState({
        topDoctors: this.props.arrTopDoctors,
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    console.log("Check view Doctor: ", doctor);
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  render() {
    let language = this.props.language;
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow:
        this.state.topDoctors.length > 5 ? 4 : this.state.topDoctors.length,
      slidesToScroll: 1,
    };
    let arrTopDoctors = this.state.topDoctors;
    return (
      <React.Fragment>
        <div className="section-share speciality-container">
          <div className="section-container">
            <div className="section-header">
              <span className="title">
                <FormattedMessage id="homeheader.Traner-highligt" />
              </span>
              <span className="btn">
                <FormattedMessage id="homeheader.see-more" />
              </span>
            </div>
            <div className="section-body">
              <Slider {...settings}>
                {arrTopDoctors &&
                  arrTopDoctors.length > 0 &&
                  arrTopDoctors.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    return (
                      <div
                        className="customize"
                        onClick={() => {
                          this.handleViewDetailDoctor(item);
                        }}
                      >
                        <div
                          className="bg-img img-doctor"
                          style={{
                            backgroundImage: `url(${imageBase64})`,
                          }}
                        ></div>
                        <div>{item.firstname}</div>
                        <div>Cơ xương khớp</div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    arrTopDoctors: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopDoctors: () => dispatch(actions.fetchTopDoctorsStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
