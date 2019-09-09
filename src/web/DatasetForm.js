import React, { Component } from 'react';

class DatasetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const { url, onItemAdded } = this.props;
    const { value } = this.state;
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: value }),
    }).then(() => {
      this.setState({ value: '' });
      onItemAdded();
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error: error,
      });
    });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name:
        <input type='text' value={this.state.value} onChange={this.handleChange} /></label>
        <input type='submit' value='Add' />
      </form>
    );
  }
}

export default DatasetForm;
