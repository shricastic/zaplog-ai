import { useUser } from "@/hooks/index";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const ProfilePage = () => {
  const { loading, user, error } = useUser();

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-[70vh] ">
      <div className="p-6 rounded-2xl w-full max-w-md text-center">
        <div className="w-full max-w-md flex justify-center">
          <Avatar className="w-40 h-40 ring-2 ring-white ring-gray-600 dark:ring-gray-300 ">
            <AvatarImage
              src={
                user?.avatar ||
                "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg"
              }
              alt={user?.name || "Unknown Author"}
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {user?.name?.slice(0, 2).toUpperCase() || "NA"}
            </AvatarFallback>
          </Avatar>
        </div>
        <h1 className="text-3xl font-semibold dark:text-gray-900 pt-5 ">{user?.name}</h1>
        <p className="text-xl pt-2 dark:text-gray-700">{user?.username}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
