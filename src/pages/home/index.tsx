import { Link } from "react-router-dom";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import PostList from "../../components/post/PostList";

export default function Home() {
  return (
    <div>
      <Header />
      <PostList />
      <Footer />
    </div>
  );
}
