import { useParams } from "react-router"
import FullBlog from "@/components/FullBlog"
import { useBlog } from "../hooks"
import LoadingSkeleton from "@/components/LoadingSkeleton"

const Blog = () => {
  const { id }= useParams()
   const {loading , blog } = useBlog({
    id : String(id)
  })

  if (loading || !blog){
    return <div>
    <LoadingSkeleton/>
    <LoadingSkeleton/>
    <LoadingSkeleton/>
    <LoadingSkeleton/>
    <LoadingSkeleton/>
    <LoadingSkeleton/>
    </div>
  }
  return (
    <div>
      <FullBlog blog={blog}/>
    </div>
  )
}

export default Blog
