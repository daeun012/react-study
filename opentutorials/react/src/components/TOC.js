import React, { Component } from 'react';

class TOC extends Component {
  shouldComponentUpdate(newProps, newState) {
    if (this.props.data === newProps.data) {
      return false;
    }
    return true;
  }
  render() {
    let lists = this.props.data.map((list) => {
      return (
        <li key={list.id}>
          <a
            id={list.id}
            href={'/content/' + list.id}
            onClick={(e) => {
              e.preventDefault();
              this.props.onChangePage(e.target.id);
            }}
          >
            {list.title}
          </a>
        </li>
      );
    });

    return (
      <nav>
        <ul>{lists}</ul>
      </nav>
    );
  }
}

export default TOC;
