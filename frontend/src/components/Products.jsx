import { useEffect, useRef, useState, useCallback } from "react";

const API = "https://luisao.onrender.com";

/* ─── MODAL ─────────────────────────────────────────────── */
function ProductModal({ product, onClose, phoneNumber }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => setVisible(true));
    const onKey = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

  const handleWhatsApp = () => {
    const msg = `Hola, quiero preguntar por el perfume ${product.name}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        background: visible ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: visible ? "blur(12px)" : "blur(0px)",
        transition: "background 0.35s ease, backdrop-filter 0.35s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          background: "linear-gradient(160deg, rgba(18,14,8,0.98), rgba(6,4,2,0.99))",
          border: "1px solid rgba(201,168,76,0.25)",
          borderRadius: "24px",
          overflow: "hidden",
          maxWidth: "520px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(201,168,76,0.08)",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.92) translateY(40px)",
          transition: "opacity 0.35s cubic-bezier(.16,1,.3,1), transform 0.35s cubic-bezier(.16,1,.3,1)",
        }}
      >
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute", top: "16px", right: "16px",
            width: "36px", height: "36px",
            background: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.25)",
            borderRadius: "50%",
            color: "#c9a84c",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 10,
            transition: "background 0.2s ease, transform 0.2s ease",
            lineHeight: 1,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.25)"; e.currentTarget.style.transform = "rotate(90deg)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; e.currentTarget.style.transform = "rotate(0deg)"; }}
        >
          ✕
        </button>

        {/* Imagen completa sin recorte */}
        <div style={{
          position: "relative",
          background: "rgba(6,4,2,0.95)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "280px",
          maxHeight: "340px",
          overflow: "hidden",
        }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "340px",
              objectFit: "contain",   // ← imagen completa sin recorte
              display: "block",
              transform: visible ? "scale(1)" : "scale(1.05)",
              transition: "transform 0.6s cubic-bezier(.16,1,.3,1)",
              padding: "16px",
            }}
            onError={e => {
              e.target.style.padding = "30px";
              e.target.style.background = "rgba(201,168,76,0.04)";
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, transparent 50%, rgba(6,4,2,0.98) 100%)",
            pointerEvents: "none",
          }} />
          {/* Nombre sobre imagen */}
          <div style={{ position: "absolute", bottom: "20px", left: "24px", right: "56px" }}>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(201,168,76,0.7)",
              marginBottom: "5px",
            }}>
              Fragancia exclusiva
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(1.4rem, 4vw, 1.9rem)",
              color: "#f0e6d0",
              letterSpacing: "0.06em",
              lineHeight: 1.1,
            }}>
              {product.name}
            </h2>
          </div>
        </div>

        {/* Contenido */}
        <div style={{ padding: "24px 28px 28px" }}>
          <div style={{
            width: "50px", height: "1px",
            background: "linear-gradient(90deg, #c9a84c, transparent)",
            marginBottom: "18px",
          }} />
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: "0.85rem",
            color: "rgba(240,230,208,0.65)",
            lineHeight: 1.85,
            letterSpacing: "0.03em",
            marginBottom: "28px",
          }}>
            {product.description}
          </p>
          <button
            className="btn-gold"
            onClick={handleWhatsApp}
            style={{ width: "100%", justifyContent: "center", padding: "16px" }}
          >
            Consultar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── SEARCH BAR ─────────────────────────────────────────── */
function SearchBar({ value, onChange, isMobile }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      position: "relative",
      maxWidth: isMobile ? "100%" : "400px",
      width: "100%",
      margin: "0 auto 48px",
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        style={{
          position: "absolute", left: "18px", top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none", zIndex: 1,
          transition: "color 0.3s ease",
        }}
      >
        <circle cx="11" cy="11" r="7" stroke={focused ? "#c9a84c" : "rgba(201,168,76,0.5)"} strokeWidth="1.5"/>
        <path d="M16.5 16.5L21 21" stroke={focused ? "#c9a84c" : "rgba(201,168,76,0.5)"} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <input
        type="text"
        placeholder="Buscar perfume..."
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: focused ? "rgba(201,168,76,0.06)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${focused ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.15)"}`,
          borderRadius: "100px",
          padding: "14px 48px 14px 48px",
          color: "#f0e6d0",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.82rem",
          letterSpacing: "0.06em",
          outline: "none",
          transition: "border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
          boxShadow: focused ? "0 0 0 3px rgba(201,168,76,0.08), 0 4px 20px rgba(0,0,0,0.3)" : "none",
          WebkitAppearance: "none",
        }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          style={{
            position: "absolute", right: "16px", top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(201,168,76,0.15)",
            border: "none", borderRadius: "50%",
            width: "22px", height: "22px",
            color: "#c9a84c", fontSize: "12px",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s ease", lineHeight: 1,
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,0.3)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(201,168,76,0.15)"}
        >
          ✕
        </button>
      )}
    </div>
  );
}

/* ─── PRODUCTS ───────────────────────────────────────────── */
export default function Products() {
  const phoneNumber = "573116845894";
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  // Observer que se re-ejecuta cuando filtered cambia
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    // Pequeño delay para que el DOM actualice primero
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
        { threshold: 0.05, rootMargin: "0px 0px -10px 0px" }
      );
      cardRefs.current.forEach(card => {
        if (card) {
          // Si ya está en el viewport, marcar visible directamente
          const rect = card.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            card.classList.add("visible");
          } else {
            observer.observe(card);
          }
        }
      });
      return () => observer.disconnect();
    }, 50);
    return () => clearTimeout(timer);
  }, [filtered.length, search]); // ← se re-ejecuta al cambiar búsqueda

  const handleMouseMove = (e, id) => {
    if (isMobile) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top - rect.height / 2) / rect.height) * -8;
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
  };

  const handleMouseLeave = e => {
    if (isMobile) return;
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)";
    setHoveredId(null);
  };

  const handleWhatsApp = (productName) => {
    const msg = `Hola, quiero preguntar por el perfume ${productName}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          phoneNumber={phoneNumber}
        />
      )}

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
        <div style={{
          position: "absolute", top: "20%", left: "50%",
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
          style={{ textAlign: "center", marginBottom: isMobile ? "36px" : "56px" }}
        >
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.6rem", letterSpacing: "0.4em",
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
          <div style={{
            width: "60px", height: "1px",
            background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
            margin: "0 auto",
          }} />
        </div>

        {/* Buscador */}
        <SearchBar value={search} onChange={setSearch} isMobile={isMobile} />

        {/* Sin resultados */}
        {filtered.length === 0 && products.length > 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "1.3rem",
              color: "rgba(240,230,208,0.3)",
              letterSpacing: "0.1em",
              marginBottom: "12px",
            }}>
              Sin resultados para "{search}"
            </p>
            <button
              onClick={() => setSearch("")}
              style={{
                background: "none", border: "none",
                color: "rgba(201,168,76,0.6)",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              Limpiar búsqueda
            </button>
          </div>
        )}

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
          {filtered.map((product, index) => (
            <div
              key={product.id}
              ref={el => (cardRefs.current[index] = el)}
              className={`reveal product-card-3d ${
                !isMobile && index % 3 === 0 ? "from-left" :
                !isMobile && index % 3 === 2 ? "from-right" : ""
              } delay-${(index % 3) + 1}`}
              onClick={() => setSelectedProduct(product)}
              onMouseMove={e => { handleMouseMove(e, product.id); setHoveredId(product.id); }}
              onMouseLeave={handleMouseLeave}
              onTouchStart={() => isMobile && setActiveId(product.id)}
              onTouchEnd={() => isMobile && setTimeout(() => setActiveId(null), 300)}
              style={{
                transition: "transform 0.4s cubic-bezier(.16,1,.3,1), box-shadow 0.4s ease",
                cursor: "pointer",
                ...(isMobile && activeId === product.id ? {
                  transform: "scale(0.97)",
                  boxShadow: "0 0 35px rgba(201,168,76,0.22), 0 0 0 1px rgba(201,168,76,0.25)",
                } : {}),
              }}
            >
              {/* Imagen card — completa sin recorte */}
              <div style={{
                position: "relative",
                overflow: "hidden",
                height: isMobile ? "240px" : "290px",
                background: "rgba(8,6,3,0.95)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",   // ← imagen completa sin recorte
                    padding: "12px",
                    transition: "transform 0.6s cubic-bezier(.16,1,.3,1)",
                    transform: (!isMobile && hoveredId === product.id) ? "scale(1.05)" : "scale(1)",
                    display: "block",
                  }}
                  onError={e => {
                    e.target.style.padding = "20px";
                    e.target.style.background = "rgba(201,168,76,0.04)";
                  }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, transparent 50%, rgba(3,3,3,0.85) 100%)",
                  pointerEvents: "none",
                }} />

                <span style={{
                  position: "absolute", top: "14px", right: "14px",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.7rem", letterSpacing: "0.2em",
                  color: "rgba(201,168,76,0.6)",
                }}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Overlay "Ver detalle" en desktop */}
                {!isMobile && (
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(0,0,0,0.45)",
                    opacity: hoveredId === product.id ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}>
                    <span style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#c9a84c",
                      border: "1px solid rgba(201,168,76,0.4)",
                      padding: "10px 20px",
                      borderRadius: "2px",
                    }}>
                      Ver detalle
                    </span>
                  </div>
                )}

                {/* Badge móvil */}
                {isMobile && (
                  <div style={{
                    position: "absolute", bottom: "14px", left: "14px",
                    display: "flex", alignItems: "center", gap: "6px",
                  }}>
                    <div style={{
                      width: "6px", height: "6px", borderRadius: "50%",
                      background: "#c9a84c",
                      boxShadow: "0 0 8px rgba(201,168,76,0.8)",
                    }} />
                    <span style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.58rem", letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(201,168,76,0.8)",
                    }}>Disponible</span>
                  </div>
                )}
              </div>

              {/* Info */}
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
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                  {product.description}
                </p>
                <button
                  className="btn-gold"
                  onClick={e => { e.stopPropagation(); handleWhatsApp(product.name); }}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Consultar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}