import React, { useState } from 'react';
import BackgroundEffect from './components/BackgroundEffect';
import { TopBar } from './components/TopBar';
import { ExternalLink, LogIn, X } from 'lucide-react';

const App: React.FC = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isClosingModal, setIsClosingModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameAnimating, setUsernameAnimating] = useState(false);
    const [passwordAnimating, setPasswordAnimating] = useState(false);

    const handleCloseLoginModal = () => {
        setIsClosingModal(true);
        setTimeout(() => {
            setShowLoginModal(false);
            setIsClosingModal(false);
        }, 300);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        setUsernameAnimating(true);
        setTimeout(() => setUsernameAnimating(false), 300);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordAnimating(true);
        setTimeout(() => setPasswordAnimating(false), 300);
    };

    const handleLoginSubmit = () => {
        if (!username.trim() || !password.trim()) {
            alert('Please enter both username and password');
            return;
        }

        const params = new URLSearchParams({
            username: username,
            password: password
        });
        window.open(`http://localhost:8888/login?${params.toString()}`);
        handleCloseLoginModal();
    };

    return (
        <div className="relative min-h-screen flex flex-col font-sans text-white bg-[#050505] overflow-hidden selection:bg-fuchsia-500 selection:text-white">
            <TopBar />
            <BackgroundEffect />

            <main className="flex-grow flex flex-col items-center justify-center p-6 relative z-10 min-h-[90vh]">
                <div>
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-2 text-center select-none flex flex-col md:block items-center">
                        <span className="relative inline-block">
                            <span className="absolute inset-0 rainbow-gradient bg-clip-text text-transparent blur-lg animate-rainbow opacity-80" aria-hidden="true">
                                seek
                            </span>
                            <span className="relative z-10 text-white drop-shadow-lg">
                                seek
                            </span>
                        </span>
                        <span className="text-white pb-2 md:pb-0 md:ml-2">
                            client
                        </span>
                    </h1>

                    <div className="text-center space-y-4 mb-12">
                        <p className="text-neutral-400 text-lg md:text-2xl font-semibold tracking-wide uppercase opacity-90">
                            Bypass Hypixel Heypixel
                        </p>
                        <p className="text-neutral-500 text-sm md:text-base font-medium tracking-widest uppercase">
                            Raising the standards. Unparalleled Experience.
                        </p>
                    </div>

                    <div className="mt-16 flex flex-col md:flex-row gap-6 justify-center items-center">
                        <div className="relative group">
                            <div className="absolute -inset-1 rounded-lg blur-md opacity-60 group-hover:opacity-100 transition duration-500"></div>
                            <a
                                href="https://shop.atrishop.xyz/"
                                className="relative px-8 py-3 bg-[#050505] border border-neutral-700 text-white font-bold text-lg rounded-lg flex items-center gap-2 hover:border-white transition-all duration-300"
                            >
                                GET STARTED
                                <ExternalLink size={18} className="stroke-[3]" />
                            </a>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-1 rounded-lg blur-md opacity-60 group-hover:opacity-100 transition duration-500"></div>
                            <button
                                onClick={() => setShowLoginModal(true)}
                                className="relative px-8 py-3 bg-[#050505] border border-neutral-700 text-white font-bold text-lg rounded-lg flex items-center gap-2 hover:border-white transition-all duration-300"
                            >
                                LOGIN
                                <LogIn size={18} className="stroke-[3]" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {(showLoginModal || isClosingModal) && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isClosingModal ? 'bg-black/0' : 'bg-black/80'} transition-all duration-300`}>
                    <div className={`bg-[#0a0a0a] border border-neutral-800 rounded-2xl w-full max-w-md p-8 relative shadow-2xl ${isClosingModal ? 'animate-modal-slide-down' : 'animate-modal-slide-up'}`}>
                        <button
                            onClick={handleCloseLoginModal}
                            className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-neutral-400 text-sm font-bold mb-2 uppercase tracking-wider">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    className={`w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 shadow-sm hover:shadow-md transition-shadow ${usernameAnimating ? 'animate-input-shift' : ''}`}
                                    placeholder="Enter username"
                                />
                            </div>

                            <div>
                                <label className="block text-neutral-400 text-sm font-bold mb-2 uppercase tracking-wider">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className={`w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 shadow-sm hover:shadow-md transition-shadow ${passwordAnimating ? 'animate-input-shift' : ''}`}
                                    placeholder="Enter password"
                                />
                            </div>

                            <button
                                onClick={handleLoginSubmit}
                                className="w-full mt-6 bg-white text-black font-bold py-3 rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <LogIn size={18} />
                                CONNECT
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <footer className="w-full p-6 text-center text-neutral-600 text-xs md:text-sm font-semibold tracking-wider relative z-10 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto border-t border-neutral-900/50">
                <a
                    href="https://space.bilibili.com/1030172559"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-80 transition"
                >
                    <span className="w-2 h-2 rounded-full bg-pink-400 animate-[pulse_2s_infinite] shadow-[0_0_10px_#f472b6]"></span>
                    <span className="text-neutral-400">Follow Dev on Bilibili</span>
                </a>
                <a
                    href="https://www.coolteam.top/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 md:mt-0 cursor-pointer transition-colors hover:text-blue-400"
                >
                    &copy; {new Date().getFullYear()} COOLTEAM. ALL RIGHTS RESERVED.
                </a>
            </footer>
        </div>
    );
};

export default App;