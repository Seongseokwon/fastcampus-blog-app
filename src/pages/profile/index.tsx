import Profile from "../../components/Profile";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import PostList from "../../components/post/PostList";

export default function ProfilePage() {
  return (
    <>
      <Header />
      <Profile />
      <PostList hasNavigation={false} defaultTab="my" />
      <Footer />
    </>
  );
}
