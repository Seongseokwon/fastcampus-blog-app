import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import PostList from "../../components/post/PostList";

export default function PostListPage() {
  return (
    <>
    <Header />
    <PostList hasNavigation={false}/>
    <Footer />
    </>
  )
}