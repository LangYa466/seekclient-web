import React, { useState, useEffect } from 'react';
import BackgroundEffect from './components/BackgroundEffect';
import { TopBar } from './components/TopBar';
import {
    ExternalLink, LogIn, X,
    AlertTriangle, CheckCircle, ShieldAlert,
    Clock, Terminal, AlertOctagon, Ban, ArrowLeft
} from 'lucide-react';

const WarnPage: React.FC = () => {
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        const search = window.location.search;
        let code = '0';

        if (search.includes('=')) {
            code = search.split('=')[1];
        }

        setStatus(code);
    }, []);

    const statusConfig: any = {
        '-1': {
            title: '参数错误',
            message: '请输入完整的用户名和密码',
            color: 'text-yellow-400',
            borderColor: 'border-yellow-400/50',
            bgGlow: 'shadow-[0_0_50px_-12px_rgba(250,204,21,0.5)]',
            icon: AlertTriangle
        },
        '1': {
            title: '登录成功',
            message: '欢迎回到 Seek Client',
            color: 'text-green-500',
            borderColor: 'border-green-500/50',
            bgGlow: 'shadow-[0_0_50px_-12px_rgba(34,197,94,0.5)]',
            icon: CheckCircle
        },
        '2': {
            title: '验证失败',
            message: '账号或密码错误 请重试',
            color: 'text-red-500',
            borderColor: 'border-red-500/50',
            bgGlow: 'shadow-[0_0_50px_-12px_rgba(239,68,68,0.5)]',
            icon: X
        },
        '3': {
            title: 'HWID 错误',
            message: '您的机器码与记录不匹配 (Invalid UUID)',
            color: 'text-red-600',
            borderColor: 'border-red-600/50',
            bgGlow: 'shadow-[0_0_50px_-12px_rgba(220,38,38,0.5)]',
            icon: ShieldAlert
        },
        '4': {
            title: '时长不足',
            message: '您的订阅已过期 请充值',
            color: 'text-orange-500',
            borderColor: 'border-orange-500/50',
            bgGlow: 'shadow-[0_0_50px_-12px_rgba(249,115,22,0.5)]',
            icon: Clock
        },
        '5': {
            title: '需启动器登录',
            message: '请使用官方启动器进行身份验证',
            color: 'text-blue-500',
            borderColor: 'border-blue-500/50',
            bgGlow: 'shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)]',
            icon: Terminal
        },
        '6': {
            title: '版本受限',
            message: '当前版本已被禁止使用 请更新',
            color: 'text-yellow-600',
            borderColor: 'border-yellow-600/50',
            bgGlow: 'shadow-[0_0_50px_-12px_rgba(202,138,4,0.5)]',
            icon: AlertOctagon
        },
        '7': {
            title: '封禁通知',
            message: '您的账户已被永久封禁',
            color: 'text-purple-600',
            borderColor: 'border-purple-600/50',
            bgGlow: 'shadow-[0_0_50px_-12px_rgba(147,51,234,0.5)]',
            icon: Ban
        },
    };

    const currentStatus = statusConfig[status || '0'] || {
        title: '未知状态',
        message: '接收到了未知的返回代码',
        color: 'text-gray-400',
        borderColor: 'border-gray-600',
        bgGlow: '',
        icon: AlertTriangle
    };

    const IconComponent = currentStatus.icon;

    return (
        <div className="flex-grow flex flex-col items-center justify-center p-6 relative z-10 min-h-[80vh]">
            <div className={`relative bg-[#0a0a0a] border ${currentStatus.borderColor} rounded-2xl w-full max-w-lg p-10 shadow-2xl ${currentStatus.bgGlow} animate-modal-slide-up`}>
                <div className="flex flex-col items-center text-center space-y-6">
                    {/* Icon Ring */}
                    <div className={`p-4 rounded-full bg-neutral-900 border border-neutral-800 ${currentStatus.color}`}>
                        <IconComponent size={64} strokeWidth={1.5} />
                    </div>

                    <div className="space-y-2">
                        <h2 className={`text-3xl font-black tracking-tight ${currentStatus.color}`}>
                            {currentStatus.title}
                        </h2>
                        <p className="text-neutral-400 text-lg font-medium">
                            {currentStatus.message}
                        </p>
                    </div>

                    <div className="w-full pt-6">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full group bg-neutral-900 border border-neutral-700 hover:border-white text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            RETURN HOME
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Home: React.FC = () => {
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
            window.location.href = '/warn?=-1';
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
        <div className="flex-grow flex flex-col items-center justify-center p-6 relative z-10 min-h-[90vh]">
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
        </div>
    );
};

const App: React.FC = () => {
    const isWarnPage = window.location.pathname === '/warn';

    return (
        <div className="relative min-h-screen flex flex-col font-sans text-white bg-[#050505] overflow-hidden selection:bg-fuchsia-500 selection:text-white">
            <TopBar />
            <BackgroundEffect />

            {isWarnPage ? <WarnPage /> : <Home />}

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