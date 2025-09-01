import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

const Dashboard = () => {
    const [notes, setNotes] = useState(["Note 1", "Note 2"]);

    const handleDelete = (index) => {
        setNotes(notes.filter((_, i) => i !== index));
    };

    const handleCreateNote = () => {
        setNotes([...notes, `Note ${notes.length + 1}`]);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Top bar */}
            <header className="flex justify-between items-center px-4 py-3 bg-white shadow-sm">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500" />
                    <span className="font-semibold text-gray-700">Dashboard</span>
                </div>
                <a href="/login" className="text-blue-600 text-sm hover:underline">
                    Sign Out
                </a>
            </header>

            {/* Main content */}
            <main className="flex-1 flex flex-col items-center px-4 py-6">
                {/* Welcome box */}
                <div className="w-full max-w-md bg-white shadow rounded-lg p-4 mb-6">
                    <p className="text-lg font-semibold text-gray-800">
                        Welcome, <span className="text-blue-600">Jonas Kahnwald</span> !
                    </p>
                    <p className="text-sm text-gray-500">Email: xxxxxx@xxxx.com</p>
                </div>

                {/* Create Note Button */}
                <button
                    onClick={handleCreateNote}
                    className="w-full max-w-md bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mb-6"
                >
                    Create Note
                </button>

                {/* Notes Section */}
                <div className="w-full max-w-md">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Notes</h3>
                    <div className="space-y-3">
                        {notes.map((note, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
                            >
                                <span>{note}</span>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="text-gray-500 hover:text-red-500"
                                >
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
