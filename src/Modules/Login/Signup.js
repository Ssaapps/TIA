import { useNavigate } from "react-router";
import Logo from "../../Shared/Component/Icons/Logo";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Signup() {
    const navigate = useNavigate();

    return (
        <>
            {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
            <div className="flex min-h-full">
                <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-[#f4f4f4] h-screen">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div className={"flex items-center cursor-pointer  max-w-min rounded-full w-20 h-20 box-border bg-white shadow-sm"} onClick={() => navigate('/')}>
                            {/*<MenuIcon fill={"#242A38"} className={"cursor-pointer"}/>*/}
                            <Logo  className={"h-4 mx-2"} />
                        </div>
                        <div className="mt-8">
                            <div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Create an account</p>

                                </div>

                               
                            </div>

                            <div className="mt-6">
                                <form action="#" method="POST" className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email address
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
             
                                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                              Already have an account ?
                                            </label>
                                        </div>

                                        <div className="text-sm">
                                            <a href="#" className="font-medium text-[#ef3f23] hover:text-indigo-500">
                                               LOGIN
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md border border-transparent bg-[#ef3f23] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="images/ab99b879-4a03-43bf-946a-0b5d0981b738 (1).png"
                        alt=""
                    />
                </div>
            </div>
        </>
    )
}
