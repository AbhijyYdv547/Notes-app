import React, { useRef, useState } from "react";
import axios from "axios";

const Signup = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const dobRef = useRef<HTMLInputElement>(null);
    const otpRef = useRef<HTMLInputElement>(null);

    const [otpRequested, setOtpRequested] = useState(false);

    async function getOtp(e: React.FormEvent) {
        e.preventDefault();
        const email = emailRef.current?.value.trim();

        if (!email) return alert("Please enter your email");

        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/request-otp`,
                { email }
            );
            setOtpRequested(true); 
        } catch (e: unknown) {
            console.error(e);
        }
    }

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();

        const payload = {
            email: emailRef.current?.value.trim(),
            code: otpRef.current?.value.trim(),
        };

        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-otp`,
                payload
            );
            alert("Signup successful ");
        } catch (e: unknown) {
            console.error(e);
        }
    }

    return (
        <div className="min-h-screen flex p-2">
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 lg:px-16">
                {/* Logo */}
                <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-full bg-blue-500 mr-2"></div>
                    <h1 className="text-xl font-bold">HD</h1>
                </div>

                <h2 className="text-3xl font-bold mb-2">Sign up</h2>
                <p className="text-gray-500 mb-6">Sign up to enjoy the feature of HD</p>

                <form className="w-full max-w-sm space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Your Name</label>
                        <input
                            type="text"
                            placeholder="Jonas Kahnwald"
                            ref={nameRef}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* DOB */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            ref={dobRef}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="jonas_kahnwald@gmail.com"
                            ref={emailRef}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* OTP (only after request) */}
                    {otpRequested && (
                        <div>
                            <label className="block text-sm font-medium mb-1">OTP</label>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                ref={otpRef}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    )}

                    {/* Button changes */}
                    {!otpRequested ? (
                        <button
                            onClick={getOtp}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Get OTP
                        </button>
                    ) : (
                        <button
                            onClick={handleSignup}
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            Sign Up
                        </button>
                    )}
                </form>

                <p className="text-sm mt-4 text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Sign in
                    </a>
                </p>
            </div>

            {/* Right side image */}
            <div className="hidden md:flex w-1/2">
                <img
                    src="https://wallpapercave.com/wp/wp10254413.jpg"
                    alt="signup visual"
                    className="w-full h-full object-cover rounded-2xl"
                />
            </div>
        </div>
    );
};

export default Signup;
