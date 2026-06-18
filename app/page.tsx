"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import Turntable from "./components/Turntable";
import Photo from "./components/Photo";

/* ----------------------- verified facts only ----------------------- */
const NAME = "Southern Komfort Bar and Grill";
const TEL = "tel:+19736729100";
const PHONE = "(973) 672-9100";
const ADDRESS = "501 Central Ave";
const CITY = "City of Orange, NJ 07050";
const IG = "https://www.instagram.com/sokobarandgrill/";
const FB = "https://www.facebook.com/SoCoCafenj/";
const MENU_URL = "https://southern-komfort-bar-and-grill.res-menu.net/menu";
const MAP_SRC =
  "https://maps.google.com/maps?q=501%20Central%20Ave%2C%20Orange%2C%20NJ%2007050&t=&z=16&ie=UTF8&iwloc=&output=embed";

const EASE = [0.16, 1, 0.3, 1] as const;

const HOURS: { day: string; hrs: string; closed?: boolean }[] = [
  { day: "Sunday", hrs: "12:00pm – 10:00pm" },
  { day: "Monday", hrs: "Closed", closed: true },
  { day: "Tuesday", hrs: "12:00pm – 10:00pm" },
  { day: "Wednesday", hrs: "12:00pm – 10:00pm" },
  { day: "Thursday", hrs: "12:00pm – 10:30pm" },
  { day: "Friday", hrs: "12:00pm – 12:00am" },
  { day: "Saturday", hrs: "12:00pm – 12:00am" },
];

const SIDE_A: { name: string; desc: string; sig?: boolean }[] = [
  {
    name: "Lemon Pepper Wings",
    desc: "The ones people come back for. Crisp, peppery, and gone before the next song.",
    sig: true,
  },
  {
    name: "Oxtails",
    desc: "Slow-braised low and gravy-rich, served the way Sunday is supposed to taste.",
  },
  {
    name: "Fried Chicken",
    desc: "Golden, craggy, seasoned all the way through. Southern comfort, plated.",
  },
  {
    name: "Salmon",
    desc: "Seared seafood for the table that wants it a little lighter, never plain.",
  },
  {
    name: "Salmon Bites",
    desc: "Little bites of the good stuff. The starter that disappears first.",
    sig: true,
  },
];

const SIDE_B: { name: string; desc: string }[] = [
  {
    name: "Mac & Cheese",
    desc: "Baked golden-topped and pulled into ribbons. The side that thinks it is a main.",
  },
  {
    name: "Candied Yams",
    desc: "Soft, sweet, and spiced. A little holiday on a weeknight.",
  },
  {
    name: "The Veggie Plate",
    desc: "Plenty here goes meat-free. Build a plate that is all greens and goodness.",
  },
];

const MARQUEE = [
  "Lemon Pepper Wings",
  "Oxtails",
  "Mac & Cheese",
  "Candied Yams",
  "Fried Chicken",
  "Salmon Bites",
  "Full Bar",
  "Karaoke Nights",
];

/* ----------------------- icons (inline, no library) ----------------------- */
const ICON = {
  arrow: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  phone: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 3h3l1.5 4-2 1.4a11 11 0 0 0 4.6 4.6l1.4-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  glass: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 4h14l-6 7v6m-2 0h4M9 17h-.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  mic: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 11a6 6 0 0 0 12 0M12 17v4m-3 0h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  moon: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 14.5A8 8 0 0 1 9.5 4 7 7 0 1 0 20 14.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M17 4l.6 1.6L19 6l-1.4.4L17 8l-.6-1.6L15 6l1.4-.4z" fill="currentColor" />
    </svg>
  ),
};

/* ----------------------- reveal ----------------------- */
function Reveal({ children, delay = 0, y = 22 }: { children: ReactNode; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------- nav ----------------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "The Menu", href: "#menu" },
    { label: "The Vibe", href: "#vibe" },
    { label: "Visit", href: "#visit" },
  ];

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#top" className="wordmark" aria-label={NAME}>
          SoKo<span className="dot">.</span>
        </a>
        <div className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
          <a href={TEL} className="btn btn-mag nav-cta">
            Reserve a table
          </a>
        </div>
        <button
          className="hamburger"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
        </button>
      </div>

      {open && (
        <div className="m-overlay" onClick={() => setOpen(false)}>
          {links.map((l, i) => (
            <a key={l.href} href={l.href} className="m-link">
              <span className="idx">0{i + 1}</span>
              {l.label}
            </a>
          ))}
          <a href={TEL} className="btn btn-mag" style={{ marginTop: 24, alignSelf: "flex-start" }}>
            {ICON.phone} {PHONE}
          </a>
        </div>
      )}
    </nav>
  );
}

/* ----------------------- page ----------------------- */
export default function Page() {
  const reduce = useReducedMotion();
  const headline = ["Soul food,", "turned all", "the way up."];

  return (
    <>
      <span id="top" />
      <Nav />

      <a href={TEL} className="call-pill" aria-label={`Call ${NAME} at ${PHONE}`}>
        {ICON.phone}
        <span>{PHONE}</span>
      </a>

      {/* ===================== HERO ===================== */}
      <header className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <motion.span
                className="hero-kicker"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <span className="eq" aria-hidden>
                  <i /><i /><i /><i /><i />
                </span>
                City of Orange, NJ · <b>soul food + a full bar</b>
              </motion.span>

              <h1 className="display t-hero" style={{ margin: "26px 0 24px" }}>
                {headline.map((line, i) => (
                  <span key={line} style={{ display: "block", overflow: "hidden" }}>
                    <motion.span
                      style={{ display: "inline-block" }}
                      initial={reduce ? false : { y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.1 }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                className="lede"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
              >
                A modern soul food experience in the City of Orange, where culture,
                cuisine and music meet. Pull up a chair, order the wings, and stay
                for the late set.
              </motion.p>

              <motion.div
                style={{ display: "flex", flexWrap: "wrap", gap: 13, marginTop: 32 }}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.78 }}
              >
                <a href={TEL} className="btn btn-mag">
                  Reserve a table {ICON.arrow}
                </a>
                <a href="#menu" className="btn btn-line">
                  Spin the menu
                </a>
              </motion.div>

              <motion.div
                className="facts"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 1 }}
              >
                <div>
                  <span className="fact-n">Full bar</span>
                  <span className="fact-l">+ happy hour</span>
                </div>
                <div>
                  <span className="fact-n">Til 12</span>
                  <span className="fact-l">Fri &amp; Sat</span>
                </div>
                <div>
                  <span className="fact-n">Karaoke</span>
                  <span className="fact-l">+ the late set</span>
                </div>
              </motion.div>
            </div>

            <Turntable />
          </div>
        </div>
      </header>

      {/* ===================== MARQUEE ===================== */}
      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <span key={dup} style={{ display: "inline-flex", alignItems: "center" }}>
              {MARQUEE.map((m) => (
                <span key={m} className="marquee-item">{m}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ===================== MENU (TRACKLIST) ===================== */}
      <section className="section" id="menu">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow" style={{ marginBottom: 22 }}>The Record · Our Menu</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display t-1" style={{ maxWidth: "16ch", marginBottom: 18 }}>
              Side A, Side B, not a skip on it.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-tx" style={{ maxWidth: "58ch", marginBottom: 56 }}>
              The hits and the deep cuts. Mains on the A-side, the sides and the sweet
              on the B. Plenty of it goes meat-free, and there is a full bar to wash it
              all down.
            </p>
          </Reveal>

          <div style={{ display: "grid", gap: 56 }}>
            {/* SIDE A */}
            <div>
              <div className="side-head">
                <span className="side-badge">Side A</span>
                <span className="mono" style={{ color: "var(--muted)", fontSize: "0.78rem", letterSpacing: "0.12em" }}>
                  THE MAINS
                </span>
              </div>
              {SIDE_A.map((t, i) => (
                <Reveal key={t.name} delay={0.04 * i} y={14}>
                  <div className="track">
                    <span className="track-idx">A{i + 1}</span>
                    <div>
                      <span className="track-name">
                        {t.name}
                        {t.sig && <span className="track-tag">Signature</span>}
                      </span>
                      <span className="track-desc">{t.desc}</span>
                    </div>
                    <span className="track-meta" aria-hidden>♪</span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* SIDE B */}
            <div>
              <div className="side-head">
                <span className="side-badge b">Side B</span>
                <span className="mono" style={{ color: "var(--muted)", fontSize: "0.78rem", letterSpacing: "0.12em" }}>
                  THE SIDES &amp; THE SWEET
                </span>
              </div>
              {SIDE_B.map((t, i) => (
                <Reveal key={t.name} delay={0.04 * i} y={14}>
                  <div className="track bside">
                    <span className="track-idx">B{i + 1}</span>
                    <div>
                      <span className="track-name">{t.name}</span>
                      <span className="track-desc">{t.desc}</span>
                    </div>
                    <span className="track-meta" aria-hidden>♪</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <div style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: 13 }}>
              <a href={MENU_URL} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                See the full menu {ICON.arrow}
              </a>
              <a href={TEL} className="btn btn-mag">
                Call to order or reserve
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== THE VIBE ===================== */}
      <section className="section panel" id="vibe">
        <div className="wrap">
          <div style={{ display: "grid", gap: "clamp(28px,5vw,56px)", gridTemplateColumns: "1fr", maxWidth: 900 }}>
            <div>
              <Reveal>
                <span className="eyebrow" style={{ marginBottom: 22 }}>The Vibe</span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="display t-1" style={{ maxWidth: "18ch", marginBottom: 18 }}>
                  Where culture, cuisine and music meet.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="body-tx" style={{ maxWidth: "58ch" }}>
                  Southern Komfort is more than a plate. It is a full bar, a happy hour,
                  a mic when the mood is right, and a room that stays open late on the
                  weekend. Indoor and outdoor seating, the food you grew up wishing for,
                  and a soundtrack to match.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="vibe-grid">
            {[
              { icon: ICON.glass, h: "The Bar", p: "A full bar with happy-hour specials. Order a round, start a tab, settle in." },
              { icon: ICON.mic, h: "The Mic", p: "Karaoke nights when the room wants to sing. Bring a voice, borrow some courage." },
              { icon: ICON.moon, h: "The Late Set", p: "Open until midnight Friday and Saturday. Hookah, good company, no rush to leave." },
            ].map((c, i) => (
              <Reveal key={c.h} delay={0.06 * i} y={16}>
                <div className="vibe-cell">
                  <div className="vc-icon">{c.icon}</div>
                  <h4>{c.h}</h4>
                  <p>{c.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== GALLERY ===================== */}
      <section className="section" id="gallery">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow" style={{ marginBottom: 22 }}>On the Plate</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display t-1" style={{ maxWidth: "16ch", marginBottom: 14 }}>
              Made to be shared. Hard to share.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mono" style={{ color: "var(--muted)", fontSize: "0.78rem", letterSpacing: "0.1em", marginBottom: 40 }}>
              SAMPLE IMAGERY · TO BE SWAPPED FOR THE KITCHEN&apos;S OWN PHOTOS
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="gallery">
              <Photo className="g0" tint label="Fried chicken" alt="Golden fried chicken, plated" src="https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=1200" />
              <Photo tint label="Lemon pepper wings" alt="A basket of seasoned wings" src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=900" />
              <Photo tint label="Seared salmon" alt="A seared salmon dinner" src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&q=80" />
              <Photo tint label="Mac & cheese" alt="Baked macaroni and cheese" src="https://images.pexels.com/photos/6210876/pexels-photo-6210876.jpeg?auto=compress&cs=tinysrgb&w=900" />
              <Photo tint label="The spread" alt="A shared soul food spread" src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=900" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== VISIT ===================== */}
      <section className="section panel" id="visit">
        <div className="wrap">
          <div className="visit-grid">
            <div>
              <Reveal>
                <span className="eyebrow" style={{ marginBottom: 22 }}>Visit · Reserve</span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="display t-1" style={{ marginBottom: 26, maxWidth: "13ch" }}>
                  Find us on Central Ave.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div style={{ display: "grid", gap: 18, marginBottom: 26 }}>
                  <div>
                    <div className="mono" style={{ color: "var(--magenta)", fontSize: "0.7rem", letterSpacing: "0.16em", marginBottom: 6 }}>ADDRESS</div>
                    <div style={{ color: "var(--cream)", fontSize: "1.08rem" }}>{ADDRESS}</div>
                    <div style={{ color: "var(--muted)" }}>{CITY}</div>
                  </div>
                  <div>
                    <div className="mono" style={{ color: "var(--magenta)", fontSize: "0.7rem", letterSpacing: "0.16em", marginBottom: 6 }}>RESERVATIONS</div>
                    <a href={TEL} style={{ color: "var(--cream)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem" }}>
                      {PHONE}
                    </a>
                    <div style={{ color: "var(--muted)", fontSize: "0.92rem", marginTop: 4 }}>
                      Reservations, takeout, delivery and catering all by phone.
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div style={{ marginBottom: 26 }}>
                  <div className="mono" style={{ color: "var(--magenta)", fontSize: "0.7rem", letterSpacing: "0.16em", marginBottom: 10 }}>HOURS</div>
                  {HOURS.map((h) => (
                    <div
                      key={h.day}
                      className={`hours-row ${h.closed ? "closed" : ""} ${h.day === "Sunday" ? "today" : ""}`}
                    >
                      <span className="day">{h.day}{h.day === "Sunday" ? " · today" : ""}</span>
                      <span className="hrs">{h.hrs}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <a href={TEL} className="btn btn-mag">
                  Reserve a table {ICON.arrow}
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="map-frame">
                <iframe
                  src={MAP_SRC}
                  title={`Map to ${NAME}, ${ADDRESS}, ${CITY}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="foot">
        <div className="wrap" style={{ paddingBlock: "clamp(48px,7vw,84px)" }}>
          <div className="foot-grid">
            <div>
              <div className="wordmark" style={{ fontSize: "1.9rem", marginBottom: 14 }}>
                SoKo<span className="dot">.</span>
              </div>
              <p style={{ color: "var(--muted)", maxWidth: "34ch", marginBottom: 8 }}>
                {NAME}. A modern soul food experience where culture, cuisine and music meet.
              </p>
              <p className="mono" style={{ color: "var(--cream-2)", fontSize: "0.82rem", letterSpacing: "0.04em" }}>
                {ADDRESS} · {CITY}
              </p>
            </div>

            <div>
              <h5>The Plates</h5>
              <a href="#menu">Side A · The Mains</a>
              <a href="#menu">Side B · Sides &amp; Sweet</a>
              <a href={MENU_URL} target="_blank" rel="noopener noreferrer">Full Menu</a>
              <a href="#vibe">The Vibe</a>
            </div>

            <div>
              <h5>Find Us</h5>
              <a href={TEL}>{PHONE}</a>
              <a href="#visit">501 Central Ave</a>
              <a href={IG} target="_blank" rel="noopener noreferrer">Instagram @sokobarandgrill</a>
              <a href={FB} target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>

          <hr className="foot-rule" />
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 14 }}>
            <span className="mono" style={{ color: "var(--muted)", fontSize: "0.74rem", letterSpacing: "0.06em" }}>
              © {new Date().getFullYear()} {NAME.toUpperCase()}
            </span>
            <span className="mono" style={{ color: "var(--muted)", fontSize: "0.74rem", letterSpacing: "0.06em" }}>
              CITY OF ORANGE, NJ · TURN IT UP
            </span>
            <a href="https://bysemaj.com" target="_blank" rel="noreferrer" className="mono" style={{ color: "var(--muted)", fontSize: "0.74rem", letterSpacing: "0.06em", textDecoration: "none" }}>BUILT · BYSEMAJ.COM</a>
          </div>
        </div>
      </footer>
    </>
  );
}
