import { Blog } from "../hooks"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      <div className="flex-grow">
        <h1 className="text-4xl font-extrabold mb-4">{blog.title}</h1>
        <div className="prose">
          {blog.content.split("\n\n").map((paragraph: string, index: number) =>
            paragraph.startsWith("*") ? (
              <h2 key={index} className="mb-4 text-2xl text-gray-300 font-semibold dark:text-gray-700">
                {paragraph.split("**")[1]}
              </h2>
            ) : (
              <p key={index} className="mb-4 text-wrap w-full text-gray-300 prose dark:text-gray-700">
                {paragraph}
              </p>
            )
          )}
        </div>
      </div>
      <div className="md:w-1/3">
        <div>
          <h2 className="text-xl font-semibold mb-2">Author</h2>
          <div className="flex items-center gap-4">
            <div className="p-2">
              <Avatar className="w-12 h-12 ring-2 ring-white dark:ring-gray-800 shadow-lg">
                <AvatarImage
                  src={blog.author.avatar || "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg"} 
                  alt={blog.author.name || "Unknown Author"}
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {blog.author.name?.slice(0, 2).toUpperCase() || "NA"}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">
                {blog.author.name || "Unknown Author"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullBlog;
