import React , {Component} from 'react';

class PhoneInfo extends Component {
  static defaultProps = {
    id : 0,
    name : '이름',
    phone : '010-0000-0000'
  }
  state = {
    editing : false,
    name : '',
    phone : ''
  }
  handleRemove = () => {
    const { info, onRemove } =  this.props;
    onRemove(info.id);
  }
  handleToggleEdit = () => {
    const {editing} = this.state;
    this.setState({
      editing : !editing
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { info, onUpdate } = this.props;
    // 수정버튼일때
    if( !prevState.editing && this.state.editing) {
      this.setState ({
        name : info.name,
        phone : info.phone,
      })
    }

    // 적용버튼일때 
    if( prevState.editing && !this.state.editing) {
      const { name , phone } = this.state;
      onUpdate(info.id, {
        name,
        phone
      })
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    // 수정 상태가 아니고, info 값이 같다면 리렌더링 안함
    if( !this.state.editing && !nextState.editing && 
        this.state.info === nextState.info) {
          return false;
    }
    return true;
  }
  render() {
    console.log('phoninfo render()'+this.props.info.id);
    const style = {
      border : '1px solid black',
      padding : '8px',
      margin : '8px'
    }
    const {editing} = this.state;
    if(editing) {
      return <div style={style}>
          <div>
            <input placeholder="이름" value={this.state.name} onChange={this.handleChange} name="name" />
          </div>
          <div>
            <input placeholder="전화번호" value={this.state.phone} onChange={this.handleChange} name="phone" />
          </div>
          <button onClick={this.handleToggleEdit}>적용</button>
          <button onClick={this.handleRemove}>삭제</button>
        </div>;
    }

    const {name, phone, id } = this.props.info;
    return (
      <div style={style}>
          <div>
            <b>{name}</b>
          </div>
          <div>{phone}</div>
          <button onClick={this.handleToggleEdit}>수정</button>
          <button onClick={this.handleRemove}>삭제</button>
      </div>
    );
  }
}

export default PhoneInfo;