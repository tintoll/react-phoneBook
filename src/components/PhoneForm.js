import React, {Component} from 'react';

class PhoneForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name : '',
      phone : ''
    }

  }

  handleChnage = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    });
  }
  handleSubmit = (e) => {
    // 페이지 리로딩 방지 
    e.preventDefault();
    this.props.onCreate(this.state);
    this.setState({
      name : '',
      phone : ''
    })
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
        <input placeholder="이름" value={this.state.name} 
          onChange={this.handleChnage} name="name" />
        <input placeholder="전화번호" value={this.state.phone} 
          onChange={this.handleChnage} name="phone" />
        <button type="submit">전송</button>
      </form>;
  }
}

export default PhoneForm;