import React from "react";

class Rtable extends React.Component {
  render() {
    if (this.props.gridtable) {
      var arr=this.props.gridtable;
    }
    return (
      <div>
      { arr &&
        <div>
          <h3>Прямоугольник:</h3>
          <table  class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>lat</th>
              <th>lng</th>
              <th>temp</th>
              <th>city</th>
              <th>country</th>
              <th>pressure</th>
              <th>humidity</th>
              <th>cloudiness</th>
              <th>rain</th>
              <th>snow</th>
            </tr>
          </thead>
            <tbody>
              {this.props.gridtable.map((item, index) => {
                var rain, snow;
                if (item['rain']) {
                  rain = item['rain']['1h'];
                }
                else {
                  rain = 0;
                }
                if (item['snow']) {
                  snow = item['snow']['1h'];
                }
                else {
                  snow = 0;
                }
                return <tr>
                         <td>{index+1}</td>
                         <td>{item['lat']}</td>
                         <td>{item['lng']}</td>
                         <td>{item['temp']}</td>
                         <td>{item['city']}</td>
                         <td>{item['country']}</td>
                         <td>{item['pressure']}</td>
                         <td>{item['humidity']}</td>
                         <td>{item['cloudiness']}</td>
                         <td>{rain}</td>
                         <td>{snow}</td>
                       </tr>;
              })}
            </tbody>
          </table>
          <div class="rec_btn"><button onClick={this.props.deleteData}>Очистить</button></div>
        </div>
      }
      </div>
    );
  }
}

export default Rtable;
