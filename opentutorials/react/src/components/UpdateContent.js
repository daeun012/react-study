import React, { Component } from 'react';

class CreateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.title,
      desc: this.props.desc,
    };
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }

  inputFormHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <article>
        <h2>Update</h2>
        <form
          action="/create_process"
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            this.props.onSubmit(this.state.id, this.state.title, this.state.desc);
          }}
        >
          <input type="hidden" name="id" value={this.state.id} />
          <p>
            <input type="text" name="title" placeholder="title" value={this.state.title} onChange={this.inputFormHandler} />
          </p>
          <p>
            <textarea name="desc" id="" cols="30" rows="10" placeholder="description" value={this.state.desc} onChange={this.inputFormHandler}></textarea>
          </p>
          <p>
            <input type="submit" />
          </p>
        </form>
      </article>
    );
  }
}

export default CreateContent;
