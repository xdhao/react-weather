import React from "react";

class Weather extends React.Component {
  render() {
    return (
      <div>
      { this.props.city &&
        <div class="tek_weat">
          <h3>Центр прямоугольника:</h3>
          <p>Местоположение: "{this.props.lat}, {this.props.lng}", {this.props.city}, {this.props.country}</p>
          <p>Температура: {this.props.temp} Celsius</p>
          <p>Давление: {this.props.pressure} hPa</p>
          <p>Влажность: {this.props.humidity} %</p>
          <p>Облачность: {this.props.cloudiness} %</p>
          {this.props.rain &&
            <p>Дождь: {this.props.rain['1h']} mm</p>
          }
          {this.props.snow &&
            <p>Дождь: {this.props.snow['1h']} mm</p>
          }
        </div>
      }
      </div>
    );
  }
}

export default Weather;
