import  { useState, useEffect } from "react";
import { Link } from "react-router";

/**
 * Noir & Miel — Café Bistro Homepage
 * Palette: ink charcoal, parchment cream, burnt honey, wine, sage
 * Display: Fraunces (serif) / Body: Work Sans / Ticket: Courier Prime
 */

const FONT_IMPORT_URL =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Work+Sans:wght@400;500;600&family=Courier+Prime&display=swap";

const palette = {
  ink: "#1E1A17",
  inkSoft: "#3A322C",
  parchment: "#F3EAD8",
  parchmentDeep: "#E7DAC0",
  honey: "#C68A3D",
  honeyDeep: "#9C6A28",
  wine: "#7A2E2E",
  sage: "#6B7A5E",
  cream: "#FBF6EC",
};

const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Story", href: "#story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Visit", href: "#visit" },
];

const menuTicket = [
  {
    section: "Coffee",
    items: [
      { name: "Espresso, double", price: "3.50" },
      { name: "Cortado", price: "4.25" },
      { name: "Miel latte, oat or whole", price: "5.00" },
      { name: "Pour-over, single origin", price: "5.50" },
    ],
  },
  {
    section: "Pastry",
    items: [
      { name: "Almond croissant", price: "4.75" },
      { name: "Kouign-amann", price: "5.25" },
      { name: "Buckwheat crepe, fig jam", price: "6.50" },
      { name: "Olive & rosemary fougasse", price: "5.75" },
    ],
  },
  {
    section: "Midday",
    items: [
      { name: "Croque, black forest ham", price: "9.50" },
      { name: "Lentil & sage soup", price: "8.00" },
      { name: "Endive, walnut, roquefort", price: "10.00" },
    ],
  },
];

const gallery = [
  { label: "The counter", tone: palette.honey },
  { label: "Morning light", tone: palette.parchmentDeep },
  { label: "The oven", tone: palette.wine },
  { label: "Corner table", tone: palette.sage },
  { label: "Bar seating", tone: palette.inkSoft },
  { label: "The garden door", tone: palette.honeyDeep },
];

const hours = [
  { day: "Monday — Friday", time: "7:00 – 18:00" },
  { day: "Saturday", time: "8:00 – 19:00" },
  { day: "Sunday", time: "8:00 – 15:00" },
];

function useFontLoader() {
  useEffect(() => {
    if (document.getElementById("nm-font-link")) return;
    const link = document.createElement("link");
    link.id = "nm-font-link";
    link.rel = "stylesheet";
    link.href = FONT_IMPORT_URL;
    document.head.appendChild(link);
  }, []);
}

function CupMark({ size = 34, color = palette.parchment }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path
        d="M9 16h24v14a12 12 0 0 1-12 12v0A12 12 0 0 1 9 30V16z"
        stroke={color}
        strokeWidth="2"
      />
      <path d="M33 19h3.5a5 5 0 0 1 0 10H33" stroke={color} strokeWidth="2" />
      <path
        d="M14 9c1 2-2 3-1 5M22 9c1 2-2 3-1 5M30 9c1 2-2 3-1 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="w-full sticky top-0 z-30"
      style={{
        background: palette.ink,
        borderBottom: `1px solid ${palette.honeyDeep}`,
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="flex items-center gap-2"
          style={{ textDecoration: "none" }}
        >
          <CupMark size={26} />
          <span
            style={{
              fontFamily: "'Fraunces', serif",
              color: palette.parchment,
              fontSize: "1.15rem",
              letterSpacing: "0.02em",
            }}
          >
            Noir&nbsp;&amp;&nbsp;Miel
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontFamily: "'Work Sans', sans-serif",
                color: palette.parchment,
                fontSize: "0.9rem",
                letterSpacing: "0.03em",
                textDecoration: "none",
                opacity: 0.9,
              }}
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/login"
            className="px-4 py-2"
            style={{
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "0.85rem",
              color: palette.ink,
              background: palette.honey,
              borderRadius: "2px",
              textDecoration: "none",
            }}
          >
            Reserve a table
          </Link>
        </nav>
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            color: palette.parchment,
            fontSize: "1.5rem",
          }}
        >
          {open ? "×" : "≡"}
        </button>
      </div>
      {open && (
        <div className="md:hidden flex flex-col px-6 pb-4 gap-3">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Work Sans', sans-serif",
                color: palette.parchment,
                textDecoration: "none",
                fontSize: "0.95rem",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="w-full" style={{ background: palette.ink }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 py-20 md:py-28 items-center">
        <div>
          <p
            style={{
              fontFamily: "'Courier Prime', monospace",
              color: palette.honey,
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Est. 2015 — Rue des Tanneurs
          </p>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              color: palette.parchment,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.05,
              fontWeight: 500,
              marginBottom: "1.5rem",
            }}
          >
            Coffee, kept slow.
            <br />
            <span style={{ fontStyle: "italic", color: palette.honey }}>
              Bread, kept honest.
            </span>
          </h1>
          <p
            style={{
              fontFamily: "'Work Sans', sans-serif",
              color: palette.parchmentDeep,
              fontSize: "1.05rem",
              lineHeight: 1.7,
              maxWidth: "34rem",
              marginBottom: "2rem",
            }}
          >
            A small counter, a wood-fired oven, and no rush. We roast in small
            batches, laminate our own dough before dawn, and pour every cup like
            it's the only one we're making today.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#menu"
              style={{
                fontFamily: "'Work Sans', sans-serif",
                background: palette.honey,
                color: palette.ink,
                padding: "0.85rem 1.6rem",
                borderRadius: "2px",
                textDecoration: "none",
                fontSize: "0.95rem",
              }}
            >
              See the ticket
            </a>
            <a
              href="#visit"
              style={{
                fontFamily: "'Work Sans', sans-serif",
                border: `1px solid ${palette.parchmentDeep}`,
                color: palette.parchment,
                padding: "0.85rem 1.6rem",
                borderRadius: "2px",
                textDecoration: "none",
                fontSize: "0.95rem",
              }}
            >
              Find the door
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div
            style={{
              width: "min(100%, 380px)",
              aspectRatio: "4 / 5",
              background: `radial-gradient(circle at 30% 20%, ${palette.honeyDeep} 0%, ${palette.wine} 55%, ${palette.ink} 100%)`,
              borderRadius: "4px",
              position: "relative",
              overflow: "hidden",
              border: `1px solid ${palette.honeyDeep}`,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 18px, rgba(243,234,216,0.05) 19px, rgba(243,234,216,0.05) 20px)`,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1.5rem",
                right: "1.5rem",
              }}
            >
              <CupMark size={40} color={palette.parchment} />
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: "italic",
                  color: palette.parchment,
                  fontSize: "1.4rem",
                  marginTop: "0.75rem",
                }}
              >
                One cup, unhurried.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" style={{ background: palette.cream }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-10 px-6 py-20">
        <div className="md:col-span-2">
          <p
            style={{
              fontFamily: "'Courier Prime', monospace",
              color: palette.wine,
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            The short version
          </p>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              color: palette.ink,
              fontSize: "2rem",
              lineHeight: 1.2,
              fontWeight: 500,
            }}
          >
            A bakery counter that became a café that became a habit.
          </h2>
        </div>
        <div
          className="md:col-span-3"
          style={{
            fontFamily: "'Work Sans', sans-serif",
            color: palette.inkSoft,
          }}
        >
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "1.25rem",
            }}
          >
            Noir &amp; Miel started as a single folding table outside a bakery
            that didn't yet have chairs. Ten years on, the chairs arrived, the
            ovens got bigger, and the coffee got better — but the table is still
            the same one, now bolted to the floor by the window.
          </p>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "1.25rem",
            }}
          >
            We bake in three shifts starting at 4am, buy our beans direct from
            three farms we've visited ourselves, and change the midday menu with
            whatever the market had that morning. Nothing on the counter is
            meant to be rushed, including you.
          </p>
          <div className="flex gap-8 mt-8">
            <div>
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "2rem",
                  color: palette.wine,
                }}
              >
                4am
              </p>
              <p style={{ fontSize: "0.85rem", color: palette.inkSoft }}>
                first proof of the day
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "2rem",
                  color: palette.wine,
                }}
              >
                3
              </p>
              <p style={{ fontSize: "0.85rem", color: palette.inkSoft }}>
                farms we buy from directly
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "2rem",
                  color: palette.wine,
                }}
              >
                11yrs
              </p>
              <p style={{ fontSize: "0.85rem", color: palette.inkSoft }}>
                same folding table
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TicketItem({ name, price }) {
  return (
    <div
      className="flex items-baseline gap-2"
      style={{ fontFamily: "'Courier Prime', monospace" }}
    >
      <span
        style={{
          color: palette.ink,
          fontSize: "0.95rem",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </span>
      <span
        style={{
          flex: 1,
          borderBottom: `1px dotted ${palette.inkSoft}`,
          opacity: 0.5,
          transform: "translateY(-3px)",
        }}
      />
      <span style={{ color: palette.wine, fontSize: "0.95rem" }}>{price}</span>
    </div>
  );
}

function Menu() {
  return (
    <section id="menu" style={{ background: palette.ink }}>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p
            style={{
              fontFamily: "'Courier Prime', monospace",
              color: palette.honey,
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Today's ticket
          </p>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              color: palette.parchment,
              fontSize: "2.25rem",
              fontWeight: 500,
            }}
          >
            The counter menu
          </h2>
        </div>

        <div
          style={{
            background: palette.parchment,
            borderRadius: "2px",
            position: "relative",
            padding: "2.5rem 2rem 2rem",
            boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "14px",
              backgroundImage: `radial-gradient(circle, ${palette.ink} 6px, transparent 7px)`,
              backgroundSize: "24px 24px",
              backgroundPosition: "0 -7px",
              transform: "translateY(-7px)",
            }}
          />
          <p
            style={{
              fontFamily: "'Courier Prime', monospace",
              textAlign: "center",
              fontSize: "0.75rem",
              color: palette.inkSoft,
              letterSpacing: "0.1em",
              marginBottom: "2rem",
            }}
          >
            NOIR &amp; MIEL · RUE DES TANNEURS · NO. 004
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {menuTicket.map((group) => (
              <div key={group.section}>
                <h3
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontStyle: "italic",
                    color: palette.wine,
                    fontSize: "1.1rem",
                    marginBottom: "1rem",
                    borderBottom: `1px solid ${palette.honeyDeep}`,
                    paddingBottom: "0.4rem",
                  }}
                >
                  {group.section}
                </h3>
                <div className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <TicketItem
                      key={item.name}
                      name={item.name}
                      price={item.price}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: "'Courier Prime', monospace",
              textAlign: "center",
              fontSize: "0.7rem",
              color: palette.inkSoft,
              marginTop: "2.5rem",
              letterSpacing: "0.08em",
            }}
          >
            *** MERCI · ALL PRICES IN USD ***
          </p>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" style={{ background: palette.cream }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p
              style={{
                fontFamily: "'Courier Prime', monospace",
                color: palette.wine,
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Around the room
            </p>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                color: palette.ink,
                fontSize: "2rem",
                fontWeight: 500,
              }}
            >
              A few corners worth knowing
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((g, i) => (
            <div
              key={g.label}
              style={{
                background: g.tone,
                aspectRatio: i % 3 === 0 ? "3 / 4" : "4 / 3",
                borderRadius: "2px",
                display: "flex",
                alignItems: "flex-end",
                padding: "1rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  color: palette.parchment,
                  fontSize: "0.8rem",
                  letterSpacing: "0.02em",
                }}
              >
                {g.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" style={{ background: palette.ink }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 py-20">
        <div>
          <p
            style={{
              fontFamily: "'Courier Prime', monospace",
              color: palette.honey,
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Find the door
          </p>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              color: palette.parchment,
              fontSize: "2rem",
              fontWeight: 500,
              marginBottom: "1.5rem",
            }}
          >
            18 Rue des Tanneurs
          </h2>
          <p
            style={{
              fontFamily: "'Work Sans', sans-serif",
              color: palette.parchmentDeep,
              fontSize: "0.95rem",
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            Look for the green door and the small brass cup by the handle. No
            sign out front — we figured if you're looking for us, you already
            know.
          </p>

          <div className="flex flex-col gap-3">
            {hours.map((h) => (
              <div
                key={h.day}
                className="flex justify-between"
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  borderBottom: `1px solid ${palette.inkSoft}`,
                  paddingBottom: "0.6rem",
                  color: palette.parchment,
                  fontSize: "0.9rem",
                }}
              >
                <span>{h.day}</span>
                <span style={{ color: palette.honey }}>{h.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div
            style={{
              background: palette.inkSoft,
              borderRadius: "2px",
              padding: "2rem",
              border: `1px solid ${palette.honeyDeep}`,
            }}
          >
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                color: palette.parchment,
                fontSize: "1.3rem",
                marginBottom: "1rem",
              }}
            >
              Hold a table
            </h3>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Name"
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  background: "transparent",
                  border: `1px solid ${palette.honeyDeep}`,
                  color: palette.parchment,
                  padding: "0.7rem 0.9rem",
                  borderRadius: "2px",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              />
              <div className="flex gap-3">
                <input
                  type="date"
                  style={{
                    fontFamily: "'Work Sans', sans-serif",
                    background: "transparent",
                    border: `1px solid ${palette.honeyDeep}`,
                    color: palette.parchment,
                    padding: "0.7rem 0.9rem",
                    borderRadius: "2px",
                    fontSize: "0.9rem",
                    outline: "none",
                    flex: 1,
                  }}
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Guests"
                  style={{
                    fontFamily: "'Work Sans', sans-serif",
                    background: "transparent",
                    border: `1px solid ${palette.honeyDeep}`,
                    color: palette.parchment,
                    padding: "0.7rem 0.9rem",
                    borderRadius: "2px",
                    fontSize: "0.9rem",
                    outline: "none",
                    width: "6rem",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  background: palette.honey,
                  color: palette.ink,
                  padding: "0.8rem",
                  borderRadius: "2px",
                  border: "none",
                  fontSize: "0.9rem",
                  marginTop: "0.5rem",
                  cursor: "pointer",
                }}
              >
                Request table
              </button>
            </form>
          </div>

          <p
            style={{
              fontFamily: "'Work Sans', sans-serif",
              color: palette.inkSoft,
              fontSize: "0.8rem",
              marginTop: "1.25rem",
            }}
          >
            Walk-ins always welcome — reservations just hold the corner table
            for you.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: palette.cream,
        borderTop: `1px solid ${palette.parchmentDeep}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <CupMark size={20} color={palette.wine} />
          <span
            style={{
              fontFamily: "'Fraunces', serif",
              color: palette.ink,
              fontSize: "0.95rem",
            }}
          >
            Noir &amp; Miel
          </span>
        </div>
        <p
          style={{
            fontFamily: "'Work Sans', sans-serif",
            color: palette.inkSoft,
            fontSize: "0.8rem",
          }}
        >
          18 Rue des Tanneurs · open daily
        </p>
        <div
          className="flex gap-4"
          style={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.8rem" }}
        >
          <a
            href="#"
            style={{ color: palette.inkSoft, textDecoration: "none" }}
          >
            Instagram
          </a>
          <a
            href="#"
            style={{ color: palette.inkSoft, textDecoration: "none" }}
          >
            Newsletter
          </a>
        </div>
      </div>
    </footer>
  );
}

const Home = () => {
  useFontLoader();
  return (
    <div style={{ background: palette.cream, minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <Story />
      <Menu />
      <Gallery />
      <Visit />
      <Footer />
    </div>
  );
};

export default Home;
