import Footer from "components/layouts/Footer";
import Header from "components/layouts/Header";
import PostList from "components/post/PostList";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Header />
      <PostList />
      <Footer />
    </div>
  );
}
