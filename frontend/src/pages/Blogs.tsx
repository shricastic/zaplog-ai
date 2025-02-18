import { ImprovedBlogCard } from "@/components/improved-blog-card";
import { useBlogs } from "../hooks";
import Wrapper from "@/components/Wrapper";
import Container from "@/components/Container";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  }
  return (
    <div className="pt-6 p-4 ">
      {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-10" /> */}
      {blogs.map((blog) => (
        <Wrapper key={blog.id}>
          <Container>
            {/* <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25"></div> */}
            <ImprovedBlogCard
              blogId={blog?.id}
              authorName={blog.author.name || "Anonymous"}
              authorImage={
                blog.author?.avatar ||
                "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg"
              }
              date={"Dec 3, 2023"}
              title={blog.title}
              content={blog.content}
            />
          </Container>
        </Wrapper>
      ))}
    </div>
  );
};

export default Blogs;
