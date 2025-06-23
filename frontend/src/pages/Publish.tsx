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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function publishBlog() {
    try {
      const response = await axios.post(
        `${environment.BACKEND_URL}/api/v1/blog`,
        { title, content },
        {
          headers: {
            Authorization: `${localStorage.getItem("zaplog-token")}`,
          },
        }
      );
      navigate(`/blog/${response.data.blogId}`);
    } catch (error) {
      console.error("Error publishing blog:", error);
      alert("Failed to publish blog. Please try again.");
    }
  }

  async function generateBlog() {
    if (title.trim() === "") {
      alert("Please enter a title");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${environment.BACKEND_URL}/api/v1/blog/content/generate`,
        { title },
        {
          headers: {
            Authorization: `${localStorage.getItem("zaplog-token")}`,
          },
        }
      );
      setContent(response.data.content);
    } catch (error) {
      console.error("Error generating content:", error);
      alert("AI generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl h-[36rem]">
        <div className="absolute top-1/2 left-1/2 gradient w-3/4 h-3/4 -translate-x-1/2 -translate-y-1/2 blur-[10rem] z-0"></div>
        <Card className="relative w-full h-full p-4 flex flex-col z-10 bg-neutral-900 border border-neutral-700 shadow-lg rounded-2xl">
          <div className="flex items-center p-4">
            <Input
              type="text"
              placeholder="Write a title for your blog post..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="ml-4 text-2xl font-light flex-grow bg-neutral-800 text-white placeholder-gray-400 border-none focus:ring-violet-500 focus:ring-2 rounded-xl"
            />
          </div>
          <Textarea
            placeholder="Write your blog post here... or put a title and hit generate with AI ✨"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-grow p-4 resize-none bg-neutral-800 text-white placeholder-gray-400 border-none focus:ring-violet-500 focus:ring-2 rounded-xl"
          />
          <div className="flex justify-end p-4 space-x-4">
            <button
              onClick={generateBlog}
              type="button"
              disabled={loading}
              className={`flex items-center justify-center text-white bg-violet-600 
              hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300 font-medium 
              rounded-full text-sm px-5 py-2.5 shadow-lg transform hover:scale-105 
              transition-all duration-200 hover:shadow-violet-300/50 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              ) : (
                "Generate with AI ✨"
              )}
            </button>
            <button
              onClick={publishBlog}
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none 
              focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5"
            >
              Publish
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
