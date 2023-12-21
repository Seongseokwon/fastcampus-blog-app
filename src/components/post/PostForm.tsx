import React, { useContext, useEffect, useState } from "react";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CATEGORIES, CategoryType, PostProps } from "./PostList";

const PostForm = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostProps | null>(null);
  const [postData, setPostData] = useState<{
    title: string;
    category: CategoryType | string;
    summary: string;
    content: string;
  }>({
    title: "",
    category: '',
    summary: "",
    content: "",
  });

  const onSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { title, content, summary, category } = postData;
      if (post && post.id) {
        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
          title,
          summary,
          content,
          updatedAt: new Date().toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          uid: user?.uid,
          category
        });
        toast.success("게시글을 수정했습니다.");
        navigate(`/posts/${post.id}`);
      } else {
        await addDoc(collection(db, "posts"), {
          ...postData,
          createdAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          email: user?.email,
          category
        });
        toast.success("게시글을 생성했습니다.");
        navigate("/");
      }
    } catch (err: any) {
      toast.error("게시글 생성을 실패했습니다.");
      console.log(err);
    }
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {
      target: { name, value },
    } = e;

    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const getPost = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
  };

  useEffect(() => {
    if (id) getPost(id);
  }, [id]);

  useEffect(() => {
    if (post) {
      const { title, summary, content } = post;
      setPostData((prev) => ({ ...prev, title, summary, content }));
    }
  }, [post]);

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          onChange={onChange}
          value={postData.title}
        />
      </div>
      <div className="form__block">
        <label htmlFor="category">카테고리</label>
        <select
          name="category"
          id="category"
          onChange={onChange}
          defaultValue={postData.category}
        >
          <option value=''>카테고리를 선택해주세요</option>
          {CATEGORIES.map((category) => (<option value={category} key={category}>{category}</option>))}
        </select>
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          name="summary"
          id="summary"
          required
          onChange={onChange}
          value={postData.summary}
        />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          required
          onChange={onChange}
          value={postData.content}
        ></textarea>
      </div>
      <div className="form__block">
        <input
          type="submit"
          value={post ? "수정" : "제출"}
          className="form__btn--submit"
        />
      </div>
    </form>
  );
};

export default PostForm;
