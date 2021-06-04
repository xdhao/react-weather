import React from "react";

class Form extends React.Component {
  render() {
    return (
      <div class="h_form">
        <form onSubmit={this.props.historyMethod}>
        <h3>Запрос на историческую информацию:</h3>
          From <input type="text" name="fstdat" placeholder="start YYYY-MM-DD"/> to <input type="text" name="scndat" placeholder="end YYYY-MM-DD"/>
          <button>Получить погоду</button>
        </form>
      </div>
    );
  }
}

export default Form;
