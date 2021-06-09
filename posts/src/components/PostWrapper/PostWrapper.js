// Navigate와 Post를 감싸주는 컴포넌트
import React from 'react';
import './PostWrapper.css';

const PostWrapper = ({ children }) => {
  return <div className="PostWrapper">{children}</div>;
};

export default PostWrapper;
