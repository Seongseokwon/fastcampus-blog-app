import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PostProps } from "./PostList";
import { db } from "firebaseApp";
import { doc, getDoc } from "firebase/firestore";
import Loader from "components/layouts/Loader";

const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const { id } = useParams();

  const getPost = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, [id]);

  console.log(post);
  return (
    <div className="post__detail">
      {post ? (
        <div className="post__box">
          <div className="post__title">
            {post.title}
          </div>
          <div className="post__profile-box">
            <div className="post__profile"></div>
            <div className="post__author-name">{post.email}</div>
            <div className="post__date">{post.createAt}</div>
          </div>
          <div className="post__utils-box">
            <div className="post__delete">삭제</div>
            <div className="post__edit">
              <Link to={`/posts/edit/1`}>수정</Link>
            </div>
          </div>
          <div className="post__text post__text--pre-wrap">
            {post.content}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PostDetail;
