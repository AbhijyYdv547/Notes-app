import { useRef, useState } from "react";
import axios from "axios";

const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const otpRef = useRef<HTMLInputElement>(null);
    const [otpRequested, setOtpRequested] = useState(false);

    async function getOtp(e: React.FormEvent) {
        e.preventDefault();
        const email = emailRef.current?.value.trim();
        if (!email) return;

        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/request-otp`,
                { email }
            );
            setOtpRequested(true); 
        } catch (err) {
            console.error(err);
        }
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        const email = emailRef.current?.value.trim();
        const otp = otpRef.current?.value.trim();
        if (!email || !otp) return;

        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-otp`,
                { email, otp }
            );
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="min-h-screen flex p-2">
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 lg:px-16">
                <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-full bg-blue-500 mr-2"></div>
                    <h1 className="text-xl font-bold">HD</h1>
                </div>

                <h2 className="text-3xl font-bold mb-2">Login</h2>
                <p className="text-gray-500 mb-6">
                    Welcome back! Please log in to your account
                </p>

                <form className="w-full max-w-sm space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="jonas_kahnwald@gmail.com"
                            ref={emailRef}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

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

                    {!otpRequested ? (
                        <button
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            onClick={getOtp}
                        >
                            Get OTP
                        </button>
                    ) : (
                        <button
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    )}
                </form>

                <p className="text-sm mt-4 text-gray-600">
                    Don&apos;t have an account?{" "}
                    <a href="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>

            <div className="hidden md:flex w-1/2">
                <img
                    src="https://wallpapercave.com/wp/wp10254413.jpg"
                    alt="login visual"
                    className="w-full h-full object-cover rounded-2xl"
                />
            </div>
        </div>
    );
};

export default Login;
