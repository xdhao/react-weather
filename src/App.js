import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather_info";
import MapCl from "./components/Map";
import PastWeater from "./components/historyWInfo";
import Rtable from "./components/rectangleTable";



const API_KEY = "7c148e8a668586d9b363e8463080992a";

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    lat: undefined,
    lng: undefined,
    gridtable: []
  }

  updateData = (lat, lng) => {
    this.setState({ lat: lat, lng: lng })
  }

  getHistory = async (e) => {
    e.preventDefault();
    var first = e.target.elements.fstdat.value;
    var second = e.target.elements.scndat.value;

    if (first && second && this.state.lat && this.state.lng) {
      const api_url = await
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?aggregateHours=24&combinationMethod=aggregate&startDateTime=${first}&endDateTime=${second}&maxStations=-1&maxDistance=-1&contentType=json&unitGroup=metric&locationMode=single&key=MSKAAAFWEE79X7RKT2JY5LL2V&dataElements=default&locations=${this.state.lat},${this.state.lng}`);
      const dataH = await api_url.json();
      this.setState({
        allmass: dataH.location.values
      });
    }
  }

  gettingWeather = async (e) => {
    e.preventDefault();

    if(this.state.lat && this.state.lng) {
      const api_url = await
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lng}&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();
      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        cloudiness: data.clouds.all,
        rain: data.rain,
        snow: data.snow
      });
    }
  }

  getRectangleWeather = async (e) => {
    e.preventDefault();

    if(this.state.lat && this.state.lng) {
      var x_min=this.state.lat-1;
      var y_min=this.state.lng-2;
      var x_max=this.state.lat+1;
      var y_max=this.state.lng+2;
      var shag_x=(x_max-x_min)/6;
      var shag_y=(y_max-y_min)/6;
      var x,y;

      for (x = x_min; x < x_max; x+=shag_x) {
        for (y = y_min; y < y_max; y+=shag_y) {
          const api_url = await
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&appid=${API_KEY}&units=metric`);
          const data = await api_url.json();
          this.setState({
            gridtable: [...this.state.gridtable,
              {
                lat: data.coord.lat,
                lng: data.coord.lon,
                temp: data.main.temp,
                city: data.name,
                country: data.sys.country,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                cloudiness: data.clouds.all,
                rain: data.rain,
                snow: data.snow
              }]
            })
            //alert(JSON.stringify(this.state.gridtable, null, "\t"));
          }
        }
      }
    }

    deleteRectangleData = () => {
      this.setState({
        gridtable: []
        })
    }


  render() {
    return (
      <div>
        <Info />
        <Weather
          lat = {this.state.lat}
          lng = {this.state.lng}
          temp={this.state.temp}
          city={this.state.city}
          country={this.state.country}
          pressure={this.state.pressure}
          humidity={this.state.humidity}
          cloudiness={this.state.cloudiness}
          rain={this.state.rain}
          snow={this.state.snow}
        />
        <MapCl updateData={this.updateData} weatherMethod={this.gettingWeather} rectangleMethod={this.getRectangleWeather}/>
        <Rtable gridtable={this.state.gridtable} deleteData={this.deleteRectangleData}/>
        <Form historyMethod={this.getHistory} />
        <PastWeater allmass={this.state.allmass} />
      </div>
    );
  }
}

export default App;
