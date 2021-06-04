import React from "react";

class PastWeater extends React.Component {
  render() {
    return (
      <div>
      { this.props.allmass &&
        <div class="h_weat">
        <h3>Исторические данные погоды:</h3>
          <table  class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>cloudcover</th>
              <th>humidity</th>
              <th>temp</th>
              <th>precip</th>
              <th>date</th>
            </tr>
          </thead>
            <tbody>
              {this.props.allmass.map((item, index) => {
                var s = item['datetime'];
                var date = new Date();
                date.setTime(s);
                var day = date.getDate();
                var month = date.getMonth();
                var year = date.getFullYear();
                var s_date = year + '-' + (month+1) + '-' + day;
                return <tr>
                         <td>{index+1}</td>
                         <td>{item['cloudcover']}</td>
                         <td>{item['humidity']}</td>
                         <td>{item['temp']}</td>
                         <td>{item['precip']}</td>
                         <td>{s_date}</td>
                       </tr>;
              })}
            </tbody>
          </table>
        </div>
      }
      </div>
    );
  }
}

export default PastWeater;
