import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const auth = getAuth(app);

  const onSignout = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      toast.success("로그아웃 되었습니다.");
    } catch (err: any) {
      console.log(err);
      toast.error(err?.code);
    }
  }

  const { user } = useContext(AuthContext);

  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image"></div>
        <div>
          <div className="profile__email">{user?.email}</div>
          <div className="profile__name">
            {user?.displayName || "사용자"}
          </div>
        </div>
      </div>
      <div
        role="presentation"
        className="profile__logout"
        onClick={onSignout}
      >
        로그아웃
      </div>
    </div>
  );
};

export default Profile;
