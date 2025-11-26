import React, { useState, useEffect } from 'react';
import BackgroundEffect from './components/BackgroundEffect';
import { TopBar } from './components/TopBar';
import { ExternalLink, ChevronsDown } from 'lucide-react';

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-white bg-[#050505] overflow-hidden selection:bg-fuchsia-500 selection:text-white">
      <TopBar />
      <BackgroundEffect />

      {/* Main Content Area - Vertically Centered */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 relative z-10 min-h-[90vh]">
        
        <div className={`transition-all duration-1000 ease-out transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Logo / Title */}
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-2 text-center select-none flex flex-col md:block items-center">
            {/* 'seek' with rainbow shadow */}
            <span className="relative inline-block">
              <span className="absolute inset-0 rainbow-gradient bg-clip-text text-transparent blur-lg animate-rainbow opacity-80" aria-hidden="true">
                seek
              </span>
              <span className="relative z-10 text-white drop-shadow-lg">
                seek
              </span>
            </span>
            
            {/* 'client' in white */}
            <span className="text-white pb-2 md:pb-0 md:ml-2">
              client
            </span>
          </h1>

          {/* Subtitle / Description */}
          <div className="text-center space-y-4 mb-12">
             <p className="text-neutral-400 text-lg md:text-2xl font-semibold tracking-wide uppercase opacity-90">
              绕过布吉岛 Hypixel 服务器
            </p>
            <p className="text-neutral-500 text-sm md:text-base font-medium tracking-widest uppercase">
              Raising the standards. Unparalleled Experience.
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="mt-16 flex flex-col md:flex-row gap-6 justify-center items-center">
            {/* Rainbow Shadow Button */}
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
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-6 text-center text-neutral-600 text-xs md:text-sm font-semibold tracking-wider relative z-10 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto border-t border-neutral-900/50">
          <a
              href="https://space.bilibili.com/1030172559"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition"
          >
              {/* Pulsing rainbow-ish dot */}
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