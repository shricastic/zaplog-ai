import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { environment } from "@/env";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Publish() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  async function publishBlog() {
    const response = await axios.post(
      `${environment.BACKEND_URL}/api/v1/blog`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: `${localStorage.getItem("zaplog-token")}`,
        },
      },
    );
    navigate(`/blog/${response.data.blogId}`);
  }
  
  async function generateBlog() {
    if (title === "") {
      alert("Please enter a title");
      return;
    }

    const response = await axios.post(
      `${environment.BACKEND_URL}/api/v1/blog/content/generate`,
      {
        title,
      },
      {
        headers: {
          Authorization: `${localStorage.getItem("zaplog-token")}`,
        },
      },
    );
    setContent(response.data.content);
  }

  return (
    <div>
      <div className="min-h-[90vh] p-4 flex items-center justify-center">
        <div className="relative w-full max-w-4xl h-[36rem]  p-4 ">
          <div className="absolute top-1/2 left-1/2 z-9 gradient w-3/4 -translate-x-1/2 h-3/4 -translate-y-1/2 inset-0 blur-[10rem]"></div>
          <Card className="relative w-full max-w-4xl h-[36rem]  p-4  flex flex-col z-10">
            <div className="flex items-center p-4 ">
              <button className="  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
              <Input
                type="text"
                placeholder="Write a title for your blog post..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="ml-4 text-2xl font-light   flex-grow "
              />
            </div>
            <Textarea
              placeholder="Write your blog post here... or put a title and hit generate with AI ✨ and let the AI write for you"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-grow p-4  resize-none"
            />
            <div className="flex justify-end p-4 ">
              <button
                onClick={generateBlog}
                type="button"
                className="text-white bg-violet-600 mr-5
              hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300 font-medium 
              rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 shadow-lg transform hover:scale-105 
              transition-all duration-200 hover:shadow-violet-300/50"
              >
                {" "}
                Generate with AI ✨
              </button>

              <button
                onClick={publishBlog}
                type="button"
                className="text-white bg-green-700 mr-5
              hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium 
              rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Publish
              </button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
