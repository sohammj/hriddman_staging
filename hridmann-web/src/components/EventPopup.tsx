"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/image";
import type { EventType } from "@/lib/types";

interface Props {
  event: EventType;
}

export default function EventPopup({ event }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("hridmannEventDismissed");
    const now = new Date();
    if (!dismissed && new Date(event.bannerExpiry) > now) {
      setShow(true);
    }
  }, [event]);

  if (!show) return null;

  const handleClose = (): void => {
    localStorage.setItem("hridmannEventDismissed", "true");
    setShow(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[2000]">
      <div className="bg-white rounded-3xl shadow-xl p-6 max-w-md w-full relative animate-fadeIn">
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={handleClose}
          aria-label="Close popup"
        >
          ×
        </button>

        {event.flyer?.asset && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <Image
              src={urlFor(event.flyer).width(600).height(400).url()}
              alt="Event flyer"
              width={600}
              height={400}
              className="w-full object-cover"
            />
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
        <p className="text-gray-600 mb-4">{event.description}</p>

        {event.link && (
          <Link
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full"
          >
            Learn More
          </Link>
        )}
      </div>
    </div>
  );
}
