import React from "react";

const PostDetail = () => {
  return (
    <div className="post__detail">
      <div className="post__box">
        <div className="post__title">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div className="post__profile-box">
          <div className="post__profile"></div>
          <div className="post__author-name">sseong</div>
          <div className="post__date">2023.12.12 화요일</div>
        </div>
        <div className="post__utils-box">
          <div className="post__delete">삭제</div>
          <div className="post__edit">수정</div>
        </div>
        <div className="post__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo,
          arcu eu porta laoreet, elit leo euismod enim, a interdum odio magna
          tempus urna. Sed venenatis lorem sed cursus fringilla. Cras id tempor
          quam. Quisque ullamcorper tortor in diam pulvinar tempus. Praesent a
          purus rutrum, imperdiet dolor quis, varius tellus. Fusce posuere
          rutrum lacus non malesuada. Duis sit amet ex dui. Duis aliquam, nulla
          ac placerat lobortis, sem orci condimentum eros, id vulputate orci
          nunc et lectus.
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
