"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { EventType } from "@/lib/types";

export default function EventPopup({ event }: { event: EventType }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("event_popup_dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 2000); // 2-second delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    sessionStorage.setItem("event_popup_dismissed", "true");
  };

  if (!visible) return null;

  // 👇 full-screen overlay that sits above everything
  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fadeIn">
      <div className="relative w-[90%] max-w-5xl h-[80vh] bg-white overflow-hidden rounded-2xl shadow-2xl flex flex-col md:flex-row animate-slideUp">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl transition"
        >
          ✕
        </button>

        {/* Left content */}
        <div className="flex-1 p-8 flex flex-col justify-center text-left bg-white/95 backdrop-blur-md">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#0E1E2A] mb-4">
            {event.title}
          </h1>
          {event.description && (
            <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-md">
              {event.description}
            </p>
          )}
          {event.link && (
            <Link
              href={event.link}
              target="_blank"
              className="bg-[#0E1E2A] hover:bg-[#007b7f] text-white font-medium py-3 px-8 rounded-full text-center w-fit transition-all"
            >
              Learn More
            </Link>
          )}
        </div>

        {/* Right banner image */}
        <div className="hidden md:block flex-1 relative">
          {event.flyer?.asset?.url ? (
            <Image
              src={event.flyer.asset.url}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400" />
          )}
        </div>
      </div>

      <style jsx global>{`
        body {
          overflow: hidden;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}
