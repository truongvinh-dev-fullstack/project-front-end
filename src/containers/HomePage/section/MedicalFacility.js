import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {
  render() {
    let language = this.props.language;
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <React.Fragment>
        <div className="section-share">
          <div className="section-container">
            <div className="section-header">
              <span className="title">Cơ sở y tế nổi bật</span>
              <span className="btn">Xem thêm</span>
            </div>
            <div className="section-body">
              <Slider {...settings}>
                <div className="customize">
                  <div className="bg-img img-medical"></div>
                  <div>Tai mũi họng</div>
                </div>
                <div className="customize">
                  <div className="bg-img img-medical"></div>
                  <div>Tai mũi họng</div>
                </div>
                <div className="customize">
                  <div className="bg-img img-medical"></div>
                  <div>Tai mũi họng</div>
                </div>
                <div className="customize">
                  <div className="bg-img img-medical"></div>
                  <div>Tai mũi họng</div>
                </div>
                <div className="customize">
                  <div className="bg-img img-medical"></div>
                  <div>Tai mũi họng</div>
                </div>
                <div className="customize">
                  <div className="bg-img img-medical"></div>
                  <div>Tai mũi họng</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
