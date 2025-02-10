import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Link } from "react-router";
import ASTRA from "../assets/og-image.png";

interface BlogCardProps {
  authorName: string;
  authorImage?: string;
  date: string;
  title: string;
  content: string;
  category?: string;
  blogId: number;
}

export function ImprovedBlogCard({
  blogId,
  authorName,
  authorImage = ASTRA,
  date,
  title,
  content,
  category = "ALL",
}: BlogCardProps) {
  const readTime = Math.max(1, Math.floor(content.length / 200));

  return (
    <Link to={`/blog/${blogId}`}>
      <Card className=" relative max-w-2xl mx-auto hover:shadow-xl transition-all duration-300 cursor-pointer mb-6 overflow-hidden bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 border-0">
        <CardHeader className="flex flex-row items-center gap-4 relative z-10">
          <Avatar className="w-12 h-12 ring-2 ring-white dark:ring-gray-800 shadow-lg">
            <AvatarImage src={authorImage} alt={authorName} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {authorName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {authorName || "Anonymous"}
            </p>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <CalendarIcon className="mr-1 h-4 w-4" />
              {date}
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {content}
          </p>
          <Badge
            variant="secondary"
            className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full"
          >
            {category}
          </Badge>
        </CardContent>
        <CardFooter className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 relative z-10">
          <div className="flex items-center">
            <ClockIcon className="mr-1 h-4 w-4" />
            {readTime} min read
          </div>
          <span className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Read more
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}


