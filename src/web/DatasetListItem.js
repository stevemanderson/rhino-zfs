import React, { Component } from 'react';

class DatasetListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onItemDeleted } = this.props;
    return (
      <li>
        {this.props.name}
        <button type='button' data-name={this.props.name} onClick={onItemDeleted}>Delete</button>
      </li>
    );
  }
}

export default DatasetListItem;
