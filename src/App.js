import React, { Component } from 'react';
import './App.css';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2;
  state = {
    information :[
      {
        id : 0,
        name : '홍길동',
        phone : '010-1111-2345'
      },
      {
        id : 1,
        name : '홍길순',
        phone : '010-9876-4321'
      }
    ],
    keyword : ''
  }
  handleCreate = (data) => {
    const {information} = this.state;
    this.setState({
      information : information.concat({id:this.id++, ...data})
    })
  }
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  }

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(item => 
        item.id === id ? 
        ({...item, ...data}) :
        item
      )
    });
  }
  handleChange = (e) => {
    this.setState({
      keyword : e.target.value
    })
  }
  render() {
    const {keyword, information} = this.state;
    const filteredList = information.filter(info => {
      return info.name.indexOf(keyword) !== -1;
    });
    return <div>
        <PhoneForm onCreate={this.handleCreate} />

        <input value={this.state.keyword} onChange={this.handleChange} />
        <PhoneInfoList data={filteredList} onRemove={this.handleRemove} onUpdate={this.handleUpdate} />
      </div>;
  }
}

export default App;
