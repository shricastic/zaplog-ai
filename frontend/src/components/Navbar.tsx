import React from "react";
import Container from "./Container";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  // const user = false;
  const { user, logout } = useAuth();
  return (
    <header className="px-4 h-14 sticky top-0 inset-x-0 w-full bg-background/40 backdrop-blur-lg border-b border-border z-50">
      <Container reverse>
        <div className="flex items-center  h-full mx-auto md:max-w-screen-xl">
             <div className="flex flex-col mr-14">
              <Link to="/">
                <div className="flex">
                <img src={logo} className="w-8 h-8 " />
                </div>
              </Link>

            </div>
            {user && ( // Only show blogs when user is logged in
              <nav className="hidden md:block ">
                <ul className="flex items-center justify-center gap-8 border-white">
                  <Link to="/blogs" className="hover:text-foreground/80 text-sm">
                    Blogs
                  </Link>
                
                </ul>
              </nav>
            )}
         

          <div className="flex items-center gap-4 ml-auto">
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className=" hidden md:flex">
                    <Button variant="ghost" size="icon">
                      <User className="w-5 h-5" />
                      <span className="sr-only">User menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel> Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => logout()}>
                      <LogOut className="w-4 h-4 mr-2" />
                      LogOut
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link to={"/publish"}>
                  <Button type="button">New</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
