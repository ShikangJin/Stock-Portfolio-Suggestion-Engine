import { Component } from 'react';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

export class MyTag extends Component {
    state = { 
      checked: false
    };
  
    handleChange = (checked) => {
      if (!checked || this.props.checkedtag() < 2) {
        this.setState({ checked }); 
        if (!checked) {
          this.props.settag(-1, this.props.tag);
        } else {
          this.props.settag(1, this.props.tag);
        }
      }
    }
  
    render() {
      return <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange}/>;
    }
  }