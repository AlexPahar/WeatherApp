import React from "react";

import "./style.scss";

import Weather from "./weather";

import { Manager, Reference, Popper } from "react-popper";

export default class TopSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectLocationOpen: false
    };
  }

  onToggleSelectLocation() {
    this.setState(prevState => ({
      isSelectLocationOpen: !prevState.isSelectLocationOpen
    }));
  }

  onLocationNameChange(e) {
    this.setState({
      locationName: e.target.value
    });
  }

  onSelectCity() {
    const { locationName } = this.state;
    const { eventEmitter } = this.props;
    eventEmitter.emit("updateWeather", locationName);
    this.setState({ isSelectLocationOpen: false });
  }

  render() {
    const { isSelectLocationOpen } = this.state;
    const { eventEmitter } = this.props;

    return (
      <div className="top-container">
        <div className="title">Weather Up</div>
        <Weather {...this.props} />
        <Manager>
          <Reference>
            {({ ref }) => (
              <button
                className="btn btn-select-location"
                ref={ref}
                onClick={this.onToggleSelectLocation.bind(this)}
              >
                Найти ваш город
              </button>
            )}
          </Reference>
          <Popper placement="top">
            {({ ref, style, placement, arrowProps }) =>
              isSelectLocationOpen && (
                <div
                  className="popup-container"
                  ref={ref}
                  style={style}
                  data-placement={placement}
                >
                  <div className="form-container">
                    <label htmlFor="location-name">Введите свой город:</label>
                    <input
                      id="location-name"
                      type="text"
                      placeholder="Название города"
                      onChange={this.onLocationNameChange.bind(this)}
                    />
                    <button
                      className="btn btn-select-location"
                      onClick={this.onSelectCity.bind(this)}
                    >
                      Найти
                    </button>
                  </div>
                  <div ref={arrowProps.ref} style={arrowProps.style} />
                </div>
              )
            }
          </Popper>
        </Manager>
      </div>
    );
  }
}
