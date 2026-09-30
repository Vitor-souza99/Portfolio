"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    PORTFOLIO_CONFIG?: { email?: string; behance?: string };
  }
}

type PortfolioProps = { markup: string };

export default function Portfolio({ markup }: PortfolioProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const config = window.PORTFOLIO_CONFIG ?? {
      email: "vitor.l.s1799@gmail.com",
      behance: "https://www.behance.net/vitor_souza23",
    };
    const toggle = root.querySelector<HTMLButtonElement>(".menu-toggle");
    const nav = root.querySelector<HTMLElement>("#navigation");
    if (!toggle || !nav) return;

    const closeMenu = () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    };
    const onToggle = () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };
    const onNavClick = (event: MouseEvent) => {
      if ((event.target as Element).closest("a")) closeMenu();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        closeMenu();
        toggle.focus();
      }
    };
    const onDocumentClick = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".header")) closeMenu();
    };
    const desktopQuery = window.matchMedia("(min-width:761px)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };
    toggle.addEventListener("click", onToggle);
    nav.addEventListener("click", onNavClick);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onDocumentClick);
    desktopQuery.addEventListener("change", onDesktop);

    const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[data-section]"));
    const sections = links
      .map((link) => root.querySelector<HTMLElement>(`#${CSS.escape(link.dataset.section ?? "")}`))
      .filter((section): section is HTMLElement => section !== null);
    let scrollPending = false;
    const markSection = () => {
      if (!sections.length) return;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) current = section;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 35) {
        current = sections[sections.length - 1];
      }
      for (const link of links) {
        const active = link.dataset.section === current.id;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
      scrollPending = false;
    };
    const onScroll = () => {
      if (!scrollPending) {
        scrollPending = true;
        window.requestAnimationFrame(markSection);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    markSection();

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = !motion.matches && "IntersectionObserver" in window
      ? new IntersectionObserver((entries, currentObserver) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              currentObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.08 })
      : null;
    if (observer) {
      root.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
      document.documentElement.classList.add("motion-ready");
    }
    const onMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        document.documentElement.classList.remove("motion-ready");
        observer?.disconnect();
      }
    };
    motion.addEventListener("change", onMotionChange);

    const portrait = root.querySelector<HTMLElement>(".portrait-area");
    const onPointerMove = (event: PointerEvent) => {
      if (!portrait || motion.matches || event.pointerType !== "mouse") return;
      const bounds = portrait.getBoundingClientRect();
      portrait.style.setProperty("--px", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 8}px`);
      portrait.style.setProperty("--py", `${((event.clientY - bounds.top) / bounds.height - 0.5) * 8}px`);
    };
    const onPointerLeave = () => {
      portrait?.style.setProperty("--px", "0px");
      portrait?.style.setProperty("--py", "0px");
    };
    portrait?.addEventListener("pointermove", onPointerMove);
    portrait?.addEventListener("pointerleave", onPointerLeave);

    if (config.behance && /^https:\/\/(www\.)?behance\.net\//i.test(config.behance)) {
      root.querySelectorAll(".optional-behance").forEach((element) => {
        const link = document.createElement("a");
        link.className = "social";
        link.href = config.behance!;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Bē Behance";
        element.replaceWith(link);
      });
    }

    const form = root.querySelector<HTMLFormElement>("#contact-form");
    const onSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      if (!form?.reportValidity()) return;
      const data = new FormData(form);
      const name = String(data.get("name") ?? "").trim();
      const email = String(data.get("email") ?? "").trim();
      const message = String(data.get("message") ?? "").trim();
      const subject = `Contato pelo portfólio — ${name}`;
      const body = `Nome: ${name}\nE-mail: ${email}\n\n${message}`;
      window.location.href = `mailto:${config.email ?? "vitor.l.s1799@gmail.com"}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status = root.querySelector<HTMLElement>("#form-status");
      if (status) {
        status.textContent = `Continue o envio no seu aplicativo de e-mail. Se ele não abrir, escreva diretamente para ${config.email ?? "vitor.l.s1799@gmail.com"}. Sua mensagem permanece aqui.`;
      }
    };
    form?.addEventListener("submit", onSubmit);

    return () => {
      toggle.removeEventListener("click", onToggle);
      nav.removeEventListener("click", onNavClick);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onDocumentClick);
      desktopQuery.removeEventListener("change", onDesktop);
      window.removeEventListener("scroll", onScroll);
      motion.removeEventListener("change", onMotionChange);
      portrait?.removeEventListener("pointermove", onPointerMove);
      portrait?.removeEventListener("pointerleave", onPointerLeave);
      form?.removeEventListener("submit", onSubmit);
      observer?.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return <div ref={contentRef} dangerouslySetInnerHTML={{ __html: markup }} />;
}