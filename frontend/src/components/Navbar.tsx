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
        <div className="flex items-center justify-between h-full mx-auto md:max-w-screen-xl">
          <div className="flex flex-col">
            <Link to="/">
              <div className="flex">
              <img src={logo} className="w-8 h-8 " />
              </div>
            </Link>

            {/*<div>
               <Icons.logo className="w-8 h-8" />               
               <span className='text-lg font-medium '>Z</span> 
              <span className="text-lg font-bold">ZapLog</span>
            </div>*/}
          </div>
          {user && ( // Only show blogs when user is logged in
            <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ul className="flex items-center justify-center gap-8">
                {/* <Link to="#" className="hover:text-foreground/80 text-sm">Pricing</Link>
                <Link to="#" className="hover:text-foreground/80 text-sm">About</Link>
                <Link to="#" className="hover:text-foreground/80 text-sm">Features</Link> */}
                <Link to="/blogs" className="hover:text-foreground/80 text-sm">
                  Blogs
                </Link>
                {/* <div >Pricing</div>
                    <div >About</div>
                    <div >Features</div>
                    <div >Blog</div> */}
              </ul>
            </nav>
          )}

          <div className="flex items-center gap-4">
            {user ? (
              // <UserButton />
              <>
                {/* <Button onClick={() =>logout()}  >
                            Logout
                        </Button> */}
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

                {/* <Link to='/' >
                            Login
                        </Link>
                        <Button  >
                            Start free trial
                            
                        </Button> */}
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
