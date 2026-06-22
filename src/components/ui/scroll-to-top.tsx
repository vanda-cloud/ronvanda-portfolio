"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Lottie from "lottie-react";
import scrollUpAnimation from "@/assets/lottie/scroll-up.json";

export function ScrollToTop() {
  const t = useTranslations("common");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!showButton) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-24 w-24 transform items-center justify-center opacity-100 scale-100 transition-opacity duration-500">
      <button
        type="button"
        aria-label={t("scrollToTop")}
        onClick={scrollToTop}
        className="flex h-full w-full items-center justify-center transition-transform duration-300 hover:scale-125"
        style={{ background: "transparent" }}
      >
        <Lottie
          animationData={scrollUpAnimation}
          loop
          autoplay
          style={{ width: 80, height: 80 }}
        />
      </button>
    </div>
  );
}
