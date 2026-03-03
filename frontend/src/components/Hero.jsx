import { useEffect, useRef } from "react";
import BackgroundVideo from "./BackgroundVideo";
import logo from "../assets/logo.png";

// Divide texto en spans para animación letra por letra
function AnimatedTitle({ text, delay = 0 }) {
  return (
    <span className="letter-reveal" aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            animationDelay: `${delay + i * 0.04}s`,
            display: char === " " ? "inline" : "inline-block",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

// Partículas flotantes decorativas
function Particles() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 12}s`,
            animationDelay: `${Math.random() * 8}s`,
            opacity: 0.4 + Math.random() * 0.4,
            width: i % 3 === 0 ? "3px" : "2px",
            height: i % 3 === 0 ? "3px" : "2px",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef(null);

  // Efecto parallax suave al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
        containerRef.current.style.opacity = `${1 - scrollY / 600}`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInstagram = () =>
    window.open("https://www.instagram.com/luisaoparfumsstore?igsh=MXRjMjJpdHl1anZxMQ==", "_blank");

  const handleWhatsApp = () =>
    window.open(`https://wa.me/573116845894?text=${encodeURIComponent("Hola, quiero más información sobre los perfumes")}`, "_blank");

  const handleVerColeccion = () =>
    document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <BackgroundVideo />
      <Particles />

      {/* Overlay gradiente dramático */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 60%), linear-gradient(180deg, rgba(3,3,3,0.3) 0%, rgba(3,3,3,0.6) 60%, rgba(3,3,3,0.95) 100%)"
      }} />

      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        position: "relative",
        zIndex: 2,
      }}>
        <div ref={containerRef} style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "640px",
          width: "100%",
        }}>

          {/* Logo con anillo animado */}
          <div className="anim-scaleIn" style={{ position: "relative", marginBottom: "40px" }}>
            <div style={{
              position: "absolute", inset: "-12px",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: "50%",
              animation: "rotateSlow 20s linear infinite",
            }} />
            <div style={{
              position: "absolute", inset: "-24px",
              border: "1px dashed rgba(201,168,76,0.1)",
              borderRadius: "50%",
              animation: "rotateSlow 35s linear infinite reverse",
            }} />
            <img
              src={logo}
              alt="Luisao Parfums"
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid rgba(201,168,76,0.6)",
                boxShadow: "0 0 40px rgba(201,168,76,0.2), 0 0 80px rgba(201,168,76,0.08)",
                position: "relative",
                zIndex: 1,
              }}
            />
          </div>

          {/* Título con reveal por letras */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(2.8rem, 7vw, 5rem)",
            letterSpacing: "0.12em",
            lineHeight: 1,
            color: "#f0e6d0",
            marginBottom: "8px",
          }}>
            <AnimatedTitle text="LUISAO" delay={0.2} />
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            color: "rgba(201,168,76,0.8)",
            letterSpacing: "0.4em",
            marginBottom: "32px",
          }} className="anim-fadeUp-d2">
            PARFUMS
          </p>

          {/* Línea dorada divisoria */}
          <div className="anim-fadeUp-d2" style={{ marginBottom: "32px" }}>
            <div style={{
              width: "80px", height: "1px",
              background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
              margin: "0 auto",
            }} />
          </div>

          {/* Subtítulo */}
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(0.85rem, 2vw, 1rem)",
            letterSpacing: "0.2em",
            color: "rgba(240,230,208,0.6)",
            textTransform: "uppercase",
            marginBottom: "48px",
          }} className="anim-fadeUp-d3">
            Fragancias que cuentan tu historia
          </p>

          {/* Botón Ver Colección */}
          <div className="anim-fadeUp-d3" style={{ marginBottom: "48px" }}>
            <button className="btn-gold" onClick={handleVerColeccion}>
              Explorar Colección
            </button>
          </div>

          {/* Redes sociales */}
          <div className="anim-fadeUp-d4" style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>

            {/* Instagram */}
            <button className="social-pill" onClick={handleInstagram} style={{ background: "none", border: "1px solid rgba(255,255,255,0.08)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f09433"/>
                    <stop offset="50%" stopColor="#dc2743"/>
                    <stop offset="100%" stopColor="#bc1888"/>
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig)"/>
                <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5" fill="none"/>
                <circle cx="17.5" cy="6.5" r="1" fill="white"/>
              </svg>
              <div style={{ textAlign: "left" }}>
                <p style={{ margin: 0, fontSize: "0.75rem", fontWeight: 600, color: "#f0e6d0", letterSpacing: "0.05em" }}>Instagram</p>
                <p style={{ margin: 0, fontSize: "0.65rem", color: "rgba(240,230,208,0.45)", letterSpacing: "0.03em" }}>@luisaoparfumsstore</p>
              </div>
            </button>

            {/* WhatsApp */}
            <button className="social-pill" onClick={handleWhatsApp} style={{ background: "none", border: "1px solid rgba(255,255,255,0.08)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.122 1.524 5.864L.058 23.486a.5.5 0 00.609.61l5.7-1.494A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.878 9.878 0 01-5.031-1.378l-.36-.214-3.733.979.997-3.645-.234-.374A9.865 9.865 0 012.106 12C2.106 6.533 6.533 2.106 12 2.106S21.894 6.533 21.894 12 17.467 21.894 12 21.894z"/>
              </svg>
              <div style={{ textAlign: "left" }}>
                <p style={{ margin: 0, fontSize: "0.75rem", fontWeight: 600, color: "#f0e6d0", letterSpacing: "0.05em" }}>WhatsApp</p>
                <p style={{ margin: 0, fontSize: "0.65rem", color: "rgba(240,230,208,0.45)", letterSpacing: "0.03em" }}>Escríbenos ahora</p>
              </div>
            </button>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="anim-fadeUp-d4" style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: 0.5,
        }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c" }}>Scroll</p>
          <div style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(180deg, #c9a84c, transparent)",
            animation: "float 2s ease-in-out infinite",
          }} />
        </div>
      </section>
    </>
  );
}