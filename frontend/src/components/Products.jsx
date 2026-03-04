import { useEffect, useRef, useState } from "react";

const API = "https://luisao.onrender.com";

export default function Products() {
  const phoneNumber = "573116845894";
  const [products, setProducts] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    fetch(`${API}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );
    cardRefs.current.forEach(card => { if (card) observer.observe(card); });
    return () => observer.disconnect();
  }, [products]);

  const handleMouseMove = (e, id) => {
    if (isMobile) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top - rect.height / 2) / rect.height) * -8;
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
  };

  const handleMouseLeave = (e) => {
    if (isMobile) return;
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)";
    setHoveredId(null);
  };

  const handleWhatsApp = (productName) => {
    const msg = `Hola, quiero preguntar por el perfume ${productName}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section
      id="productos"
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        backgroundColor: "#030303",
        padding: isMobile ? "70px 16px 60px" : "100px 24px",
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      {/* Fondo decorativo */}
      <div style={{
        position: "absolute",
        top: "20%", left: "50%",
        transform: "translateX(-50%)",
        width: isMobile ? "300px" : "600px",
        height: isMobile ? "300px" : "600px",
        background: "radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div
        className="reveal"
        ref={el => {
          if (el) {
            const obs = new IntersectionObserver(([e]) => {
              if (e.isIntersecting) e.target.classList.add("visible");
            }, { threshold: 0.15 });
            obs.observe(el);
          }
        }}
        style={{ textAlign: "center", marginBottom: isMobile ? "44px" : "80px" }}
      >
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "rgba(201,168,76,0.7)",
          marginBottom: "16px",
        }}>
          — Colección Exclusiva —
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: isMobile ? "2.4rem" : "clamp(2.2rem, 5vw, 3.5rem)",
          color: "#f0e6d0",
          letterSpacing: "0.08em",
          marginBottom: "20px",
          lineHeight: 1.1,
        }}>
          Nuestra <em style={{ fontStyle: "italic", color: "rgba(201,168,76,0.85)" }}>Colección</em>
        </h2>
        <div className={isMobile ? "gold-line-mobile" : ""} style={{
          width: "60px", height: "1px",
          background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
          margin: "0 auto",
        }} />
      </div>

      {products.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "1.3rem",
            color: "rgba(240,230,208,0.3)",
            letterSpacing: "0.1em",
          }}>
            Próximamente...
          </p>
        </div>
      )}

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
        gap: isMobile ? "18px" : "28px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        {products.map((product, index) => (
          <div
            key={product.id}
            ref={el => (cardRefs.current[index] = el)}
            className={`reveal product-card-3d ${
              !isMobile && index % 3 === 0 ? "from-left" :
              !isMobile && index % 3 === 2 ? "from-right" : ""
            } delay-${(index % 3) + 1}`}
            onMouseMove={(e) => { handleMouseMove(e, product.id); setHoveredId(product.id); }}
            onMouseLeave={handleMouseLeave}
            onTouchStart={() => isMobile && setActiveId(product.id)}
            onTouchEnd={() => isMobile && setTimeout(() => setActiveId(null), 300)}
            style={{
              transition: "transform 0.4s cubic-bezier(.16,1,.3,1), box-shadow 0.4s ease",
              ...(isMobile && activeId === product.id ? {
                transform: "scale(0.97)",
                boxShadow: "0 0 35px rgba(201,168,76,0.22), 0 0 0 1px rgba(201,168,76,0.25)",
              } : {}),
            }}
          >
            {/* Imagen */}
            <div style={{ position: "relative", overflow: "hidden", height: isMobile ? "230px" : "280px" }}>
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s cubic-bezier(.16,1,.3,1)",
                  transform: (!isMobile && hoveredId === product.id) ? "scale(1.06)" : "scale(1)",
                  display: "block",
                }}
                onError={e => {
                  e.target.style.objectFit = "contain";
                  e.target.style.padding = "20px";
                  e.target.style.background = "rgba(201,168,76,0.04)";
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, transparent 35%, rgba(3,3,3,0.92) 100%)",
              }} />
              {/* Número */}
              <span style={{
                position: "absolute",
                top: "14px", right: "14px",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                color: "rgba(201,168,76,0.6)",
              }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              {/* Badge dorado en móvil */}
              {isMobile && (
                <div style={{
                  position: "absolute",
                  bottom: "14px", left: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}>
                  <div style={{
                    width: "6px", height: "6px",
                    borderRadius: "50%",
                    background: "#c9a84c",
                    boxShadow: "0 0 8px rgba(201,168,76,0.8)",
                  }} />
                  <span style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(201,168,76,0.8)",
                  }}>Disponible</span>
                </div>
              )}
            </div>

            {/* Contenido */}
            <div style={{ padding: isMobile ? "18px 18px 20px" : "24px" }}>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: isMobile ? "1.25rem" : "1.35rem",
                color: "#f0e6d0",
                letterSpacing: "0.06em",
                marginBottom: "8px",
              }}>
                {product.name}
              </h3>
              <div style={{
                width: "30px", height: "1px",
                background: "rgba(201,168,76,0.5)",
                marginBottom: "10px",
              }} />
              <p style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: isMobile ? "0.78rem" : "0.8rem",
                color: "rgba(240,230,208,0.5)",
                lineHeight: 1.75,
                letterSpacing: "0.03em",
                marginBottom: "18px",
              }}>
                {product.description}
              </p>
              <button
                className="btn-gold"
                onClick={() => handleWhatsApp(product.name)}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Consultar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}