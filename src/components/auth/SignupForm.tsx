import React, { useState } from "react";
import { Link } from "react-router-dom";
import { app } from "firebaseApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";


type SignupDataType = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignupForm = () => {
  const [signupData, setSignupData] = useState<SignupDataType>({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const auth = getAuth(app);
      const {email, password} = signupData;
      await createUserWithEmailAndPassword(auth, email, password);

      toast.success('회원가입에 성공했습니다.');
    } catch(err) {
      console.log(err);
      toast.error('회원가입에 실패했습니다.')
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    
    if (name === "email") {
      const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상으로 입력해주세요");
      } else if (
        signupData.passwordConfirm.length > 0 &&
        value !== signupData.passwordConfirm
      ) {
        setError("비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요");
      } else {
        setError("");
      }
    }

    if (name === "passwordConfirm") {
      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상으로 입력해주세요");
      } else if (value !== signupData.password) {
        setError("비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요");
      } else {
        setError("");
      }
    }

    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="form form--lg" onSubmit={onSubmit}>
      <h1 className="form__title">회원가입</h1>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={onChange}
        />
      </div>
      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={onChange}
        />
      </div>
      <div className="form__block">
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          required
          onChange={onChange}
        />
      </div>
      {error && error.length > 0 && <div className="form__block">
        <div className="form__error">{error}</div></div>}
      <div className="form__block">
        계정이 이미 있으신가요?
        <Link to="/login" className="form__link">
          로그인하기
        </Link>
      </div>
      <div className="form__block">
        <input
          type="submit"
          value="회원가입"
          className="form__btn--submit"
          disabled={error.length > 0}
        />
      </div>
    </form>
  );
};

export default SignupForm;
