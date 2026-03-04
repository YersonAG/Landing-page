import { useEffect, useRef, useState } from "react";

const API = "https://luisao.onrender.com";

export default function Products() {
  const phoneNumber = "573116845894";
  const [products, setProducts] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

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
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [products]);

  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
  };

  const handleMouseLeave = (e) => {
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
        padding: "100px 24px",
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "600px",
        background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div
        className="reveal"
        ref={el => { if (el) { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible'); }, { threshold: 0.2 }); obs.observe(el); }}}
        style={{ textAlign: "center", marginBottom: "80px" }}
      >
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.65rem",
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
          fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
          color: "#f0e6d0",
          letterSpacing: "0.08em",
          marginBottom: "20px",
          lineHeight: 1.1,
        }}>
          Nuestra <em style={{ fontStyle: "italic", color: "rgba(201,168,76,0.85)" }}>Colección</em>
        </h2>

        <div style={{
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

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "28px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        {products.map((product, index) => (
          <div
            key={product.id}
            ref={el => (cardRefs.current[index] = el)}
            className={`reveal product-card-3d ${
              index % 3 === 0 ? "from-left" :
              index % 3 === 2 ? "from-right" : ""
            } delay-${(index % 3) + 1}`}
            onMouseMove={(e) => { handleMouseMove(e, product.id); setHoveredId(product.id); }}
            onMouseLeave={handleMouseLeave}
            style={{ transition: "transform 0.4s cubic-bezier(.16,1,.3,1), box-shadow 0.4s ease" }}
          >
            <div style={{ position: "relative", overflow: "hidden", height: "280px" }}>
              <img
                src={product.imageUrl}  // ← solo este cambio
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s cubic-bezier(.16,1,.3,1)",
                  transform: hoveredId === product.id ? "scale(1.06)" : "scale(1)",
                  display: "block",
                }}
                onError={e => {
                  e.target.style.objectFit = "contain";
                  e.target.style.padding = "20px";
                  e.target.style.background = "rgba(201,168,76,0.04)";
                }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 40%, rgba(3,3,3,0.9) 100%)",
              }} />
              <span style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                color: "rgba(201,168,76,0.6)",
              }}>
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div style={{ padding: "24px" }}>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "1.35rem",
                color: "#f0e6d0",
                letterSpacing: "0.06em",
                marginBottom: "8px",
              }}>
                {product.name}
              </h3>

              <div style={{
                width: "30px", height: "1px",
                background: "rgba(201,168,76,0.5)",
                marginBottom: "12px",
              }} />

              <p style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: "0.8rem",
                color: "rgba(240,230,208,0.5)",
                lineHeight: 1.7,
                letterSpacing: "0.04em",
                marginBottom: "24px",
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