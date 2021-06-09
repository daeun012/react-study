import React, { Component } from 'react';
import './App.css';
import Subject from './components/Subject.js';
import TOC from './components/TOC.js';
import Control from './components/Control.js';
import ReadContent from './components/ReadContent.js';
import CreateContent from './components/CreateContent.js';
import UpdateContent from './components/UpdateContent.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selected_content_id: 2,
      subject: { title: 'WEB', sub: 'world wide web!' },
      welcome: { title: 'Welcome', desc: 'Hello, React!!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is for information' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive' },
      ],
    };
  }
  getReadContent() {
    let data = this.state.contents.filter((content) => content.id === this.state.selected_content_id);
    return data[0];
  }
  getContent() {
    let _title,
      _desc,
      _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === 'read') {
      let _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    } else if (this.state.mode === 'create') {
      _article = (
        <CreateContent
          onSubmit={(_title, _desc) => {
            this.max_content_id++;
            let _contents = this.state.contents.concat({ id: this.max_content_id, title: _title, desc: _desc });
            this.setState({
              contents: _contents,
              mode: 'read',
              selected_content_id: this.max_content_id,
            });
          }}
        ></CreateContent>
      );
    } else if (this.state.mode === 'update') {
      let _content = this.getReadContent();
      _article = (
        <UpdateContent
          id={_content.id}
          title={_content.title}
          desc={_content.desc}
          onSubmit={(_id, _title, _desc) => {
            let _contents = this.state.contents.map((content) => {
              if (content.id === _id) {
                return { id: _id, title: _title, desc: _desc };
              }
              return content;
            });
            this.setState({
              contents: _contents,
              mode: 'read',
            });
          }}
        ></UpdateContent>
      );
    }
    return _article;
  }
  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={() => {
            this.setState({ mode: 'welcome' });
          }}
        ></Subject>
        <TOC
          data={this.state.contents}
          onChangePage={(id) => {
            this.setState({ mode: 'read', selected_content_id: Number(id) });
          }}
        ></TOC>
        <Control
          onChangeMode={(mode) => {
            if (mode === 'delete') {
              if (window.confirm('really?')) {
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  i = i + 1;
                }
                this.setState({
                  mode: 'welcome',
                  contents: _contents,
                });
                alert('deleted!');
              }
            }
            this.setState({ mode });
          }}
        ></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
