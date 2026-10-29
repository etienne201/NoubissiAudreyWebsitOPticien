"use client";

import {
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Calendar,
  ShieldCheck,
  Glasses,
  Phone,
  ArrowRight,
  Clock,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { messages, site } from "@/config/site";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";
import { whatsappLink } from "@/lib/whatsapp";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("accueil");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState<OpenStatus | null>(null);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Calcul du statut d'ouverture en direct à Douala
  useEffect(() => {
    setMounted(true);
    const updateStatus = () => setOpenStatus(getOpenStatus());
    updateStatus();
    const interval = setInterval(updateStatus, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Détection du scroll et de la barre de progression
  useEffect(() => {
    const onScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledRatio = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolledRatio);
      setScrolled(winScroll > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermeture du dropdown lors d'un clic extérieur
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [dropdownOpen]);

  // Observer de section active sur la page d'accueil
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = [
      "accueil",
      "apropos",
      "services",
      "verres",
      "morphologie",
      "collections",
      "rendez-vous",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -55% 0px" }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [pathname]);

  // Accessibilité & Focus Trap dans le drawer mobile
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key === "Tab") {
        const modal = document.getElementById("menu-mobile");
        if (!modal) return;
        const focusables = modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isItemActive = (href: string) => {
    if (href === "/conseils" && pathname === "/conseils") return true;
    if (pathname === "/" && href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      return activeSection === targetId;
    }
    return false;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || open
          ? "bg-nuit/95 shadow-2xl shadow-nuit/30 backdrop-blur-xl border-b border-white/10"
          : "bg-gradient-to-b from-nuit/90 via-nuit/50 to-transparent"
      }`}
    >
      {/* Barre de progression de lecture ultra fine et luxueuse */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-champagne via-sauge to-champagne transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="mx-auto flex h-18 max-w-page items-center justify-between px-5 md:h-20 md:px-8">
        {/* Logo de prestige */}
        <Link
          href="/"
          aria-label="Audrey Noubissi, opticienne à Douala"
          className="group shrink-0 transition-opacity hover:opacity-95"
        >
          <span className="hidden sm:block">
            <Logo tone="light" />
          </span>
          <span className="sm:hidden">
            <Logo tone="light" variant="compact" />
          </span>
        </Link>

        {/* Navigation Desktop Intelligente et Hiérarchisée */}
        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-1 xl:gap-2 lg:flex"
        >
          {/* Accueil */}
          <Link
            href="/#accueil"
            className={`relative rounded-full px-3.5 py-1.5 text-xs xl:text-sm font-medium transition-all duration-200 ${
              isItemActive("/#accueil")
                ? "text-champagne font-semibold bg-white/5"
                : "text-ivoire/85 hover:text-champagne hover:bg-white/5"
            }`}
          >
            Accueil
          </Link>

          {/* Menu Déroulant Intelligent : Prestations & Savoir-faire */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs xl:text-sm font-medium transition-all duration-200 ${
                dropdownOpen ||
                isItemActive("/#services") ||
                isItemActive("/#verres") ||
                isItemActive("/#assurances")
                  ? "text-champagne font-semibold bg-white/5"
                  : "text-ivoire/85 hover:text-champagne hover:bg-white/5"
              }`}
            >
              <span>Prestations</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180 text-champagne" : "text-ivoire/50"}`}
                aria-hidden="true"
              />
            </button>

            {/* Dropdown Menu Haute Précision */}
            {dropdownOpen && (
              <div className="absolute left-1/2 top-full mt-2 w-80 -translate-x-1/2 rounded-2xl border border-white/10 bg-nuit/95 p-3.5 shadow-2xl backdrop-blur-2xl transition-all animate-in fade-in slide-in-from-top-2">
                <div className="mb-2 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-champagne/70 border-b border-white/5">
                  Cabinet Optique & Expertise
                </div>
                <Link
                  href="/#services"
                  onClick={() => setDropdownOpen(false)}
                  className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-champagne/15 text-champagne transition-colors group-hover:bg-champagne group-hover:text-nuit">
                    <Glasses size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-ivoire group-hover:text-champagne">
                      Examens & Montures
                    </div>
                    <div className="text-[11px] text-ivoire/60 leading-tight mt-0.5">
                      Bilan réfractif complet et sélection sur mesure
                    </div>
                  </div>
                </Link>

                <Link
                  href="/#technologies"
                  onClick={() => setDropdownOpen(false)}
                  className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sauge/20 text-sauge transition-colors group-hover:bg-sauge group-hover:text-nuit">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-ivoire group-hover:text-sauge">
                      Verres Haute Précision
                    </div>
                    <div className="text-[11px] text-ivoire/60 leading-tight mt-0.5">
                      Progressifs HD, antireflet & anti-lumière bleue
                    </div>
                  </div>
                </Link>

                <Link
                  href="/#assurances"
                  onClick={() => setDropdownOpen(false)}
                  className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-champagne/15 text-champagne transition-colors group-hover:bg-champagne group-hover:text-nuit">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-ivoire group-hover:text-champagne">
                      Tiers-Payant Assurances
                    </div>
                    <div className="text-[11px] text-ivoire/60 leading-tight mt-0.5">
                      Conventionnée Escoma, Zenith, WTW, Olea
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Morphologie avec micro-badge */}
          <Link
            href="/#morphologie"
            className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs xl:text-sm font-medium transition-all duration-200 ${
              isItemActive("/#morphologie")
                ? "text-champagne font-semibold bg-white/5"
                : "text-ivoire/85 hover:text-champagne hover:bg-white/5"
            }`}
          >
            <Sparkles size={13} className="text-champagne" aria-hidden="true" />
            <span>Morphologie</span>
          </Link>

          {/* Collections */}
          <Link
            href="/#collections"
            className={`relative rounded-full px-3.5 py-1.5 text-xs xl:text-sm font-medium transition-all duration-200 ${
              isItemActive("/#collections")
                ? "text-champagne font-semibold bg-white/5"
                : "text-ivoire/85 hover:text-champagne hover:bg-white/5"
            }`}
          >
            Collections
          </Link>

          {/* Guide Vision */}
          <Link
            href="/conseils"
            className={`relative rounded-full px-3.5 py-1.5 text-xs xl:text-sm font-medium transition-all duration-200 ${
              pathname === "/conseils"
                ? "text-champagne font-semibold bg-white/5"
                : "text-ivoire/85 hover:text-champagne hover:bg-white/5"
            }`}
          >
            Guide Vision
          </Link>

          {/* À propos */}
          <Link
            href="/#apropos"
            className={`relative rounded-full px-3.5 py-1.5 text-xs xl:text-sm font-medium transition-all duration-200 ${
              isItemActive("/#apropos")
                ? "text-champagne font-semibold bg-white/5"
                : "text-ivoire/85 hover:text-champagne hover:bg-white/5"
            }`}
          >
            À propos
          </Link>
        </nav>

        {/* Actions Rapides Droite : Smart Pill Statut & Bouton de Rendez-vous */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Smart Live Pill : Statut d'accueil Douala */}
          {mounted && openStatus && (
            <div
              className="flex items-center gap-2 rounded-full border border-white/10 bg-nuit-doux/60 px-3 py-1.5 text-xs backdrop-blur-md"
              title="Statut d'accueil d'Audrey à Douala"
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    openStatus.open ? "bg-sauge pulse-live-ring" : "bg-champagne"
                  }`}
                />
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    openStatus.open ? "bg-sauge" : "bg-champagne"
                  }`}
                />
              </span>
              <span className="text-ivoire/80 text-[11px] font-medium tracking-wide">
                {openStatus.open ? "Atelier Ouvert" : "Ouverture 8h"}
              </span>
            </div>
          )}

          {/* Bouton RDV Principal Haute Joaillerie */}
          <Link
            href="/#rendez-vous"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-champagne/40 bg-gradient-to-r from-champagne/20 via-champagne/30 to-champagne/20 px-4 py-2 text-xs xl:text-sm font-semibold text-ivoire transition-all duration-300 hover:border-champagne hover:bg-champagne hover:text-nuit hover:shadow-lg hover:shadow-champagne/25"
          >
            <Calendar size={14} className="text-champagne transition-colors group-hover:text-nuit" />
            <span>Prendre RDV</span>
          </Link>

          {/* Bouton WhatsApp direct icône */}
          <a
            href={whatsappLink(messages.contact)}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="Discuter directement avec Audrey sur WhatsApp"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sauge-fonce/80 text-ivoire transition-all duration-200 hover:bg-sauge hover:text-nuit hover:scale-105"
            title="WhatsApp direct"
          >
            <MessageCircle size={16} />
          </a>
        </div>

        {/* Bouton Déclencheur Mobile Haute Couture */}
        <div className="flex items-center gap-2 lg:hidden">
          {mounted && openStatus && (
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-nuit-doux/60 px-2.5 py-1 text-[11px]">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  openStatus.open ? "bg-sauge pulse-live-ring" : "bg-champagne"
                }`}
              />
              <span className="text-ivoire/80 text-[10px]">
                {openStatus.open ? "Ouvert" : "Douala"}
              </span>
            </div>
          )}

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ivoire transition-colors hover:bg-white/15"
            aria-label="Ouvrir le menu de navigation"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden="true" size={22} />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MENU MOBILE LUXE : SMART HUB PLEIN ÉCRAN SOUS LE POUCE   */}
      {/* ======================================================== */}
      {open && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
        >
          {/* Overlay avec flou cinématographique */}
          <div
            className="absolute inset-0 bg-nuit/85 backdrop-blur-md transition-opacity"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Tiroir d'exception ancré en bas, ergonomie 100% pouce */}
          <div
            id="menu-mobile"
            className="safe-bottom absolute inset-x-0 bottom-0 max-h-[92vh] overflow-y-auto rounded-t-[2.5rem] border-t border-white/15 bg-gradient-to-b from-nuit-doux via-nuit to-nuit px-6 pt-3 text-ivoire shadow-[0_-20px_50px_rgba(0,0,0,0.8)] transition-transform"
          >
            {/* Poignée tactile ergonomique */}
            <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-white/20" aria-hidden="true" />

            {/* Header du drawer */}
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <Logo variant="compact" tone="light" />
              <button
                ref={closeRef}
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ivoire transition-colors hover:bg-white/20"
                aria-label="Fermer le menu"
                onClick={() => {
                  setOpen(false);
                  toggleRef.current?.focus();
                }}
              >
                <X aria-hidden="true" size={20} />
              </button>
            </div>

            {/* Statut d'accueil et fuseau horaire */}
            {mounted && openStatus && (
              <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-ivoire/85">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      openStatus.open ? "bg-sauge pulse-live-ring" : "bg-champagne"
                    }`}
                  />
                  <span>Cabinet à Douala : {openStatus.label}</span>
                </div>
                <Clock size={14} className="text-champagne/80" />
              </div>
            )}

            {/* QUICK ACTIONS HUB : Raccourcis sous le pouce */}
            <div className="mb-5 grid grid-cols-2 gap-2.5">
              <Link
                href="/#morphologie"
                onClick={() => setOpen(false)}
                className="flex flex-col justify-between rounded-2xl border border-champagne/30 bg-champagne/10 p-3.5 transition-all hover:bg-champagne/20"
              >
                <Sparkles size={20} className="text-champagne mb-2" />
                <div>
                  <div className="text-xs font-bold text-ivoire">Test Morphologique</div>
                  <div className="text-[10px] text-ivoire/60">Trouver sa monture</div>
                </div>
              </Link>

              <Link
                href="/#rendez-vous"
                onClick={() => setOpen(false)}
                className="flex flex-col justify-between rounded-2xl border border-sauge/30 bg-sauge/10 p-3.5 transition-all hover:bg-sauge/20"
              >
                <Calendar size={20} className="text-sauge mb-2" />
                <div>
                  <div className="text-xs font-bold text-ivoire">Rendez-vous</div>
                  <div className="text-[10px] text-ivoire/60">Créneau sur mesure</div>
                </div>
              </Link>
            </div>

            {/* Navigation hiérarchique avec chevrons */}
            <nav aria-label="Navigation mobile" className="mb-6">
              <ul className="divide-y divide-white/5">
                {[
                  { href: "/#accueil", label: "Accueil", sub: "Présentation" },
                  { href: "/#services", label: "Prestations & Soins", sub: "Examens et réfraction" },
                  { href: "/#technologies", label: "Verres Haute Précision", sub: "Anti-reflet & progressifs" },
                  { href: "/#collections", label: "Collections Montures", sub: "Optique & Solaires" },
                  { href: "/#assurances", label: "Tiers-Payant Assurances", sub: "Escoma, Zenith, WTW, Olea" },
                  { href: "/conseils", label: "Guide Vision & Santé", sub: "Articles et conseils d'Audrey" },
                  { href: "/#apropos", label: "À propos d'Audrey", sub: "Opticienne diplômée" },
                  { href: "/#contact", label: "Contact & Localisation", sub: "Showroom Douala" },
                ].map((item) => {
                  const active = isItemActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between py-3 transition-colors ${
                          active ? "text-champagne font-semibold" : "text-ivoire/90 hover:text-champagne"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        <div className="flex flex-col">
                          <span className="font-serif text-base tracking-wide">{item.label}</span>
                          <span className="text-[11px] text-ivoire/50 font-sans">{item.sub}</span>
                        </div>
                        <ArrowRight size={16} className={`transition-transform ${active ? "text-champagne translate-x-1" : "text-white/20"}`} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Boutons d'Action Directs en bas du menu */}
            <div className="space-y-3 pb-6 pt-2">
              <a
                href={whatsappLink(messages.contact)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-champagne px-6 py-3 text-sm font-bold text-nuit shadow-lg shadow-champagne/20 transition-all hover:bg-ivoire"
              >
                <MessageCircle size={18} />
                <span>Discuter directement sur WhatsApp</span>
              </a>

              <a
                href={`tel:${site.phoneE164}`}
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-xs font-semibold text-ivoire/85 transition-colors hover:bg-white/10"
              >
                <Phone size={14} className="text-sauge" />
                <span>Appeler le {site.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
