import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileCoach.scss";
import { getProfileCoach } from "../../../services/userService";

class ProfileCoach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let id = this.props.coachId;
    let data = await this.getProfileCoachById(id);
    this.setState({
      dataProfile: data,
    });
  }

  getProfileCoachById = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileCoach(id);
      result = res.data;
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.coachId !== this.props.coachId) {
      //   let id = this.props.coachId;
      //   let data = this.getProfileCoachById(id);
      //   this.setState({
      //     dataProfile: data,
      //   });
    }
  }

  render() {
    let { dataProfile } = this.state;
    console.log("check profile: ", dataProfile);
    return (
      <>
        <div className="profile-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${dataProfile.image})`,
              }}
            ></div>

            <div className="content-right">
              <div className="up">
                {dataProfile.lastname} {dataProfile.firstname}
              </div>
              <div className="down">
                {dataProfile.Markdown && dataProfile.Markdown.description && (
                  <span>{dataProfile.Markdown.description}</span>
                )}
              </div>
              <div className="price">
                {dataProfile && dataProfile.Coach_info && (
                  <span>Price : $ {dataProfile.Coach_info.price}</span>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCoach);
