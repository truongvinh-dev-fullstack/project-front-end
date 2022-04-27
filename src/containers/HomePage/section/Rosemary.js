import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Rosemary extends Component {
  render() {
    let language = this.props.language;
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
    return (
      <React.Fragment>
        <div className="section-share">
          <div className="section-container">
            <div className="section-header">
              <span className="title">Cẩm lang</span>
              <span className="btn">Xem thêm</span>
            </div>
            <div className="section-body">
              <Slider {...settings}>
                <div className="customize customize-rosemary">
                  <div className="bg-img img-rosemary"></div>
                  <div className="customize-title">
                    Top 5 cơ sở uy tín tại Hà Nội
                  </div>
                </div>
                <div className="customize customize-rosemary">
                  <div className="bg-img img-rosemary"></div>
                  <div className="customize-title">
                    Top 5 cơ sở uy tín tại Hà Nội
                  </div>
                </div>
                <div className="customize customize-rosemary">
                  <div className="bg-img img-rosemary"></div>
                  <div className="customize-title">
                    Top 5 cơ sở uy tín tại Hà Nội
                  </div>
                </div>
                <div className="customize customize-rosemary">
                  <div className="bg-img img-rosemary"></div>
                  <div className="customize-title">
                    Top 5 cơ sở uy tín tại Hà Nội
                  </div>
                </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Rosemary);
