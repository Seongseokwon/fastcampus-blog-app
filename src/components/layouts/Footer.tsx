import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsSun, BsMoonFill } from "react-icons/bs";
import ThemeContext from "context/ThemeContext";
const Footer = () => {
  const context = useContext(ThemeContext);

  console.log(context);
  return (
    <footer>
      <div>
        <Link to="post/new">글 쓰기</Link>
        <Link to="posts">게시글</Link>
        <Link to="profile">프로필</Link>
      </div>
      <div>
        {context.theme === "light" ? (
          <BsSun onClick={context.toggleMode} className="footer__theme-btn" />
        ) : (
          <BsMoonFill onClick={context.toggleMode} />
        )}
      </div>
    </footer>
  );
};

export default Footer;
