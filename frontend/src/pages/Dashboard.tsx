import axios from "axios";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

type NoteType = {
    _id: string;
    title: string;
    body: string;
    userId: string;
};

type UserType = {
    id: string,
    name: string
}


const Dashboard = () => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [user, setUser] = useState<UserType>();

    const API_BASE = import.meta.env.VITE_BACKEND_URL; 

    const fetchUser = async () => {
        try {
            const res = await axios.get(`${API_BASE}/me`, {
                withCredentials: true,
            });
            setUser(res.data.user);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchNotes = async () => {
        try {
            const res = await axios.get(`${API_BASE}/`, { withCredentials: true });
            setNotes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUser();
        fetchNotes();
    }, []);

    const handleCreateNote = async () => {
        try {
            const res = await axios.post(
                `${API_BASE}/create`,
                { title: `Note ${notes.length + 1}`, body: "" },
                { withCredentials: true }
            );
            setNotes([...notes, res.data]);
        } catch (err) {
            console.error(err);
        }
    };

    // Delete a note
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE}/${id}`, { withCredentials: true });
            setNotes(notes.filter((note) => note._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="flex justify-between items-center px-4 py-3 bg-white shadow-sm">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500" />
                    <span className="font-semibold text-gray-700">Dashboard</span>
                </div>
                <a href="/login" className="text-blue-600 text-sm hover:underline">
                    Sign Out
                </a>
            </header>

            <main className="flex-1 flex flex-col items-center px-4 py-6">
                {user && (
                    <div className="w-full max-w-md bg-white shadow rounded-lg p-4 mb-6">
                        <p className="text-lg font-semibold text-gray-800">
                            Welcome, <span className="text-blue-600">{user.name}</span>!
                        </p>
                    </div>
                )}

                <button
                    onClick={handleCreateNote}
                    className="w-full max-w-md bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mb-6"
                >
                    Create Note
                </button>

                <div className="w-full max-w-md">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Notes</h3>
                    <div className="space-y-3">
                        {notes.map((note,index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
                            >
                                <span>{note.title}</span>
                                <button
                                    onClick={() => handleDelete(note._id)}
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
