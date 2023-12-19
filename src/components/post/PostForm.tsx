import React, { useContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const PostForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    summary: "",
    content: "",
  });

  const onSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'posts'), {
        ...postData,
        createAt: new Date()?.toLocaleDateString(),
        email: user?.email
      });
      toast.success('게시글을 생성했습니다.');
      navigate('/');
    } catch (err: any) {
      toast.error('게시글 생성을 실패했습니다.');
      console.log(err);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    setPostData((prev) => ({ ...prev, [name]: value }));
  };
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
        <input type="submit" value="제출" className="form__btn--submit" />
      </div>
    </form>
  );
};

export default PostForm;
