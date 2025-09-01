import { useState } from "react";

const Signup = () => {
    const [dob, setDob] = useState("");

    return (
        <div className="min-h-screen flex">
            {/* Left Section */}
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 lg:px-16">
                {/* Logo */}
                <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-full bg-blue-500 mr-2"></div>
                    <h1 className="text-xl font-bold">HD</h1>
                </div>

                {/* Title + Subtext */}
                <h2 className="text-3xl font-bold mb-2">Sign up</h2>
                <p className="text-gray-500 mb-6">
                    Sign up to enjoy the feature of HD
                </p>

                {/* Form */}
                <div className="w-full max-w-sm space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Your Name</label>
                        <input
                            type="text"
                            placeholder="Jonas Kahnwald"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Date of Birth</label>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="jonas_kahnwald@gmail.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                        Get OTP
                    </button>
                </div>

                {/* Already have account */}
                <p className="text-sm mt-4 text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Sign in
                    </a>
                </p>
            </div>

            {/* Right Section - Image */}
            <div className="hidden md:flex w-1/2">
                <img
                    src="https://wallpapercave.com/wp/wp10254413.jpg"
                    alt="signup visual"
                    className="w-full h-full object-cover rounded-l-2xl"
                />
            </div>
        </div>
    );
};

export default Signup;
