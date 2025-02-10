import { Blog } from "../hooks"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
// import AppBar from "./AppBar"
// import { Avatar } from "../wip/BlogsCard"
import Image from '../assets/og-image.png'




const FullBlog = ({blog}: {blog : Blog}) => {

  return (
    <div>
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      <div className="flex-grow">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="prose">
          {blog.content.split('\n\n').map((paragraph: string, index: number) => (
            paragraph.charAt(0) === '*' 
            ? <h2 key={index} className="mb-4 text-2xl font-semibold">{paragraph.split("**")[1]}</h2>
            : <p key={index} className="mb-4 text-wrap  w-full prose">{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="md:w-1/3">
        <div>
          <h2 className="text-xl font-semibold mb-2">Author</h2>
          <div className="flex items-center gap-4">
            <div className=" p-2">
              <Avatar className="w-12 h-12 ring-2 ring-white dark:ring-gray-800 shadow-lg">
                <AvatarImage src={Image} alt={blog.author.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {blog.author.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">{blog.author.name}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default FullBlog
