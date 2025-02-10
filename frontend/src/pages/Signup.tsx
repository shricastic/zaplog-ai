import Auth from "@/components/Auth";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Signup section */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <Auth type="signup" />
        </div>
      </div>
      
      {/* Quote section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100">
        <div className="w-full flex items-center justify-center">
          {/* <Quote /> */}
          <h1>Quote</h1>
        </div>
      </div>
    </div>
  );
};

export default Signup;
