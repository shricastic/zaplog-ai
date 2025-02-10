

import {  ImprovedBlogCard } from '@/components/improved-blog-card'
import { useBlogs } from '../hooks'
import Wrapper from '@/components/Wrapper'
import Container from '@/components/Container'

const Blogs = () => {
    const {loading , blogs} = useBlogs()

    if(loading) {
        return <div>
            {/* <LoadingSkeleton/>
            <LoadingSkeleton/>
            <LoadingSkeleton/>
            <LoadingSkeleton/>
            <LoadingSkeleton/>
            <LoadingSkeleton/> */}
            <h1>Loading....</h1>
            <h1>Loading....</h1>
            <h1>Loading....</h1>
            <h1>Loading....</h1>
            <h1>Loading....</h1>
        </div>
    }
    return (
            <div className='pt-6 p-4 '>
                {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-10" /> */}
                {blogs.map((blog) => (
                    <Wrapper key={blog.id}>
                        <Container>
                        {/* <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25"></div> */}
                        <ImprovedBlogCard
                            blogId={blog?.id}
                            authorName={blog.author.name|| "Anonymous" }
                            date={"Dec 3, 2023"}
                            title={blog.title}
                            content={blog.content}
                        />
                        </Container>
                    </Wrapper>
                ))}
             </div>

    )
}

export default Blogs
