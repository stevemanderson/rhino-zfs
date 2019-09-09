import React, { Component } from 'react';
import DatasetForm from './DatasetForm';
import DatasetListItem from './DatasetListItem';

class DatasetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      error: null,
    };
    this.handleItemAdded = this.handleItemAdded.bind(this);
    this.handleItemDeleted = this.handleItemDeleted.bind(this);
  }

  loadItems() {
    const { url } = this.props;
    fetch(url)
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      this.setState({
        isLoaded: true,
        items: result,
      });
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error: error,
      });
    });
  }

  componentDidMount() {
    this.loadItems();
  }

  handleItemAdded() {
    this.loadItems();
  }

  handleItemDeleted(event) {
    console.log(event);
    const { url } = this.props;
    const { name } = event.target.dataset;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    }).then(() => {
      this.setState({ value: '' });
      this.handleItemAdded();
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error: error,
      });
    });
    event.preventDefault();
  }

  render() {
    const { isLoaded } = this.state;
    const { url } = this.props;
    let div;

    if (isLoaded) {
      div = (
      <div>
        <DatasetForm url={url} onItemAdded={this.handleItemAdded} />
        <ul>
          {this.state.items.map((item) => {
            return (<DatasetListItem key={item.name} name={item.name} onItemDeleted={this.handleItemDeleted} />)
          })}
        </ul>
      </div>);
    } else {
      div = <div>Loading</div>;
    }

    return (
      <div className="dataset-list">
        <h1>Datasets</h1>
        {div}
      </div>
    );
  }
}

export default DatasetList;
