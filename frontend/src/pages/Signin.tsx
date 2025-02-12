import Auth from "@/components/Auth"
import OAuth from "@/components/OAuth";

const Signin = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Signup section */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <OAuth type="signin" />
        </div>
      </div>
      
      {/* Quote section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100">
        <div className="w-full flex items-center justify-center">
          {/* <Quote /> */}
          <div className="bg-slate-200 flex justify-center flex-col h-full w-full">
            <div className="flex justify-center">
              <div className="max-w-lg px-6">
                <div className="text-3xl font-semibold text-bold">
                  "The customer service I received was exceptional. The staff went above and beyond 
                  to help me with my queries."
                </div>
                <div className="mt-4">
                  <p className="text-xl font-bold">Julies Winfield</p>
                  <p className="text-gray-400">
                    CEO | ACME CORP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
