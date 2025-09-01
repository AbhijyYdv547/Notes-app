import { useState } from "react";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

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
                <h2 className="text-3xl font-bold mb-2">Login</h2>
                <p className="text-gray-500 mb-6">
                    Welcome back! Please log in to your account
                </p>

                {/* Form */}
                <div className="w-full max-w-sm space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="jonas_kahnwald@gmail.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                        Login
                    </button>
                </div>

                {/* Switch to signup */}
                <p className="text-sm mt-4 text-gray-600">
                    Don&apos;t have an account?{" "}
                    <a href="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>

            {/* Right Section - Image */}
            <div className="hidden md:flex w-1/2">
                <img
                    src="https://wallpapercave.com/wp/wp10254413.jpg"
                    alt="login visual"
                    className="w-full h-full object-cover rounded-l-2xl"
                />
            </div>
        </div>
    );
};

export default Login;
