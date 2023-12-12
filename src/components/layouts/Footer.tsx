import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Link to="post/new">글 쓰기</Link>
      <Link to="posts">게시글</Link>
      <Link to="profile">프로필</Link>
    </footer>
  );
};

export default Footer;
