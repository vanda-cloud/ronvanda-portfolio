"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Mail, SendHorizontal } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  GithubIcon,
} from "@/components/ui/brand-icons";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type IconComponent = (props: { size?: number; className?: string }) => React.JSX.Element;

const SOCIALS: { id: string; href: string; icon: IconComponent }[] = [
  { id: "Facebook", href: "https://www.facebook.com/lovelysweatboy", icon: FacebookIcon },
  { id: "Telegram", href: "https://t.me/ron_vanda", icon: SendHorizontal },
  { id: "LinkedIn", href: "https://www.linkedin.com/in/ronvanda/", icon: LinkedinIcon },
  { id: "Instagram", href: "https://www.instagram.com/ron.vanda", icon: InstagramIcon },
  { id: "GitHub", href: "https://github.com/vanda-cloud", icon: GithubIcon },
];

export function Contact() {
  const t = useTranslations("contact");
  const sectionRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !iconsRef.current) return;

    const ctx = gsap.context(() => {
      const icons = iconsRef.current?.querySelectorAll(".social-icon");
      if (!icons?.length) return;

      gsap.from(icons, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: "back.out(2.2)",
        stagger: 0.07,
        // See note in skills.tsx — clears the inline transform so each
        // glass-pill icon's backdrop-filter blur recomputes correctly.
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const year = new Date().getFullYear();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative mx-auto max-w-3xl px-6 py-28 text-center"
    >
      <h2 className="gradient-text text-3xl font-bold tracking-tight sm:text-4xl">
        {t("title")}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-base text-[var(--muted-foreground)]">
        {t("subtitle")}
      </p>

      <div className="mt-8 flex justify-center">
        <a
          href="mailto:ronvanda99@gmail.com"
          className="glass-panel inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.03]"
        >
          <Mail size={16} />
          {t("cta")}
        </a>
      </div>

      <div ref={iconsRef} className="mt-10 flex justify-center gap-3">
        {SOCIALS.map(({ id, href, icon: Icon }) => (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={id}
            className="social-icon glass-pill flex h-11 w-11 items-center justify-center transition-transform hover:scale-110"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>

      <p className="mt-16 text-xs text-[var(--muted-foreground)]">
        {t("footer", { year })}
      </p>
    </section>
  );
}
