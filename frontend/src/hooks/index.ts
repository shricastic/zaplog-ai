import { useEffect, useState } from "react";
import axios from "axios";
import { environment } from "@/env";
// import { BACKEND_URL } from "../Config";

export interface Blog {
    id: number; 
    title: string;
    content: string;
    author: {
        name: string;
    }
}
//fetching blogs with id 
export const useBlog = ({id}: {id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    useEffect(() => {
        axios.get(`${environment.BACKEND_URL}/api/v1/blog/${id}`, {
            headers:{
                Authorization:localStorage.getItem("zaplog-token")
            }
        }).then((response) => {
            setBlog(response.data.blog);
            setLoading(false);
        });
    }, [id]);

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(() => {
        axios.get(`${environment.BACKEND_URL}/api/v1/blog/bulk`, {
            headers:{
                Authorization:localStorage.getItem("zaplog-token")
            }
        }).then((response) => {
            setBlogs(response.data.blogs.reverse());
            setLoading(false);
        });
    }, []);

    return {
        loading,
        blogs
    }

}
