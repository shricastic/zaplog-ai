import { Blog } from "../hooks";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      <div className="flex-grow ">
        <div className=" mb-8 border-b p-4">
          <h1 className="text-5xl font-bold mb-6 text-center font-soehne">{blog.title}</h1>
          <div className="mb-2 flex justify-center">
            <div>
              <div className="flex gap-4">
                <div className="">
                  <Avatar className="w-10 h-10 ring-2  shadow-lg">
                    <AvatarImage
                      src={
                        blog.author.avatar ||
                        "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg"
                      }
                      alt={blog.author.name || "Unknown Author"}
                    />
                    <AvatarFallback className="bg-gradient-to-br text-md from-blue-500 to-purple-600 text-white">
                      {blog.author.name?.slice(0, 2).toUpperCase() || "NA"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div>
                    <span className="text-md font-semibold">
                      {blog.author.name || "Unknown Author"}
                    </span>{" "}
                    {/*. <span className="text-green-700">Follow</span> */}
                  </div>
                  <div className=" text-gray-400 text-sm">
                    <span>3 min read</span> . <span>7 Feb , 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {blog.content.split("\n\n").map((paragraph: string, index: number) =>
            paragraph.startsWith("*") ? (
              <h2
                key={index}
                className="mb-4 text-2xl font-semibold text-foreground"
              >
                {paragraph.split("**")[1]}
              </h2>
            ) : (
              <p key={index} className="mb-4 text-wrap w-full text-foreground">
                {paragraph}
              </p>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
