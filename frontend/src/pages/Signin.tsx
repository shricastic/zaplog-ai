import Auth from "@/components/Auth"
import OAuth from "@/components/OAuth";
import Logo from '../assets/logo.png'
import { BorderBeam } from "@/components/BorderBeam";

const Signin = () => {
  return (
    <div className="min-h-[80vh] flex flex-col-reverse lg:flex-row">
      {/* Signup section */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 lg:w-1/2 ">
        <div className="relative flex items-center justify-center py-10 md:py-20 w-full">
          <div className="absolute top-1/2 left-1/2 -z-9 gradient w-3/4 -translate-x-1/2 h-3/4 -translate-y-1/2 inset-0 blur-[10rem]"></div>
          <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
            <div>
              <img src={Logo} alt="" className="w-16 h-16 " />
            </div>

            <BorderBeam size={150} duration={8} delay={1} />
          </div>
        </div>
        <div className="w-full max-w-md">
          <OAuth type="signin" />
        </div>
      </div>

     
    </div>
  );
};

export default Signin;
