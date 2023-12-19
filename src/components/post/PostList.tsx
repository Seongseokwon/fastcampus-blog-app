import AuthContext from "context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface PostListProps {
  hasNavigation?: boolean;
}

type TabType = "all" | "my";

export interface PostProps {
  id?: string;
  title: string;
  summary: string;
  content: string;
  createAt: string;
  email: string;
}
const PostList = ({ hasNavigation = true }: PostListProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [posts, setPosts] = useState<any>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    const datas = await getDocs(collection(db, "posts"));

    datas.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev: PostProps[]) => [...prev, dataObj as PostProps]);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  console.log(posts);
  return (
    <>
      {hasNavigation && (
        <nav className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}
          >
            전체
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation--active" : ""}
          >
            나의 글
          </div>
        </nav>
      )}

      <div className="post__list">
        {posts.length > 0 ? (
          posts.map((post: PostProps) => (
            <div key={post.id} className="post__box">
              <Link to={`/posts/${post.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile"></div>
                  <div className="post__author-name">{post.email}</div>
                  <div className="post__date">{post.createAt}</div>
                </div>
                <div className="post__title">{post.title} </div>
                <div className="post__text">{post.summary}</div>
              </Link>
              {post.email === user?.email ? (
                <div className="post__utils-box">
                  <div className="post__delete">삭제</div>
                  <div className="post__edit">
                    <Link to={`posts/edit/${post.id}`}>수정</Link>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))
        ) : (
          <div className='post__no-post'>게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default PostList;
