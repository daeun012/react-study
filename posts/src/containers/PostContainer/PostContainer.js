import React, { Component } from 'react';
import { PostWrapper, Navigate, Post, Warning } from '../../components';
import * as service from '../../services/post';

class PostContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      postId: 1, // 현재 포스트 번호
      fetching: false, // 요청의 완료 여부
      post: {
        title: null,
        body: null,
      },
      comments: [],
      warningVisibility: false,
    };
  }
  showWarning = () => {
    this.setState({ warningVisibility: true });

    setTimeout(() => {
      this.setState({ warningVisibility: false });
    }, 1500);
  };
  fetchPostInfo = async (postId) => {
    this.setState({
      fetching: true, // requesting..
    });
    try {
      const info = await Promise.all([service.getPost(postId), service.getComments(postId)]);
      const { title, body } = info[0].data;
      const comments = info[1].data;

      this.setState({
        postId,
        post: {
          title,
          body,
        },
        comments,
        fetching: false, // done!
      });
    } catch (e) {
      // if err, stop at this point
      this.setState({
        fetching: false,
      });

      this.showWarning();
    }
  };

  handleNavigateClick = (type) => {
    const postId = this.state.postId;

    if (type === 'NEXT') {
      this.fetchPostInfo(postId + 1);
    } else {
      this.fetchPostInfo(postId - 1);
    }
  };

  componentDidMount() {
    this.fetchPostInfo(1);
  }

  render() {
    const { postId, fetching, post, comments, warningVisibility } = this.state;

    return (
      <PostWrapper>
        <Navigate postId={postId} disabled={fetching} onClick={this.handleNavigateClick} />
        <Post title={post.title} body={post.body} comments={comments} postId={postId} />
        <Warning visible={warningVisibility} message="That post does not exist" />
      </PostWrapper>
    );
  }
}

export default PostContainer;
