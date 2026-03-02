import { useNavigate } from "react-router-dom";
import BackgroundVideo from "./BackgroundVideo";
import logo from "../assets/logo.png";

function Hero() {
  const navigate = useNavigate();

  const handleInstagram = () => {
    window.open("https://www.instagram.com/luisaoparfumsstore?igsh=MXRjMjJpdHl1anZxMQ==", "_blank");
  };

  const handleWhatsApp = () => {
    const message = "Hola, quiero más información sobre los perfumes";
    window.open(`https://wa.me/573116845894?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      <BackgroundVideo />
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title} className="animate-fadeSlideUp">
            Luisao Parfums
          </h1>
          <img
            src={logo}
            alt="Luisao Parfums"
            style={styles.logo}
            className="animate-fadeSlideUp-delay"
          />
          <p style={styles.subtitle} className="animate-fadeSlideUp-delay">
            Descubre fragancias que cuentan tu historia.
          </p>
          <button
            style={styles.button}
            className="btn-shimmer animate-fadeSlideUp-delay2"
            onClick={() => navigate("/products")}
          >
            Ver Colección
          </button>

          {/* Tarjetas de redes sociales */}
          <div style={styles.socialGrid} className="animate-fadeSlideUp-delay2">

            {/* Instagram */}
            <div style={styles.socialCard} className="social-card" onClick={handleInstagram}>
              <div style={styles.socialIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f09433"/>
                      <stop offset="25%" stopColor="#e6683c"/>
                      <stop offset="50%" stopColor="#dc2743"/>
                      <stop offset="75%" stopColor="#cc2366"/>
                      <stop offset="100%" stopColor="#bc1888"/>
                    </linearGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#igGrad)"/>
                  <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.8" fill="none"/>
                  <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
                </svg>
              </div>
              <div>
                <p style={styles.socialTitle}>Instagram</p>
                <p style={styles.socialSub}>@luisaoparfumsstore</p>
              </div>
            </div>

            {/* WhatsApp */}
            <div style={styles.socialCard} className="social-card" onClick={handleWhatsApp}>
              <div style={styles.socialIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.122 1.524 5.864L.058 23.486a.5.5 0 00.609.61l5.7-1.494A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.878 9.878 0 01-5.031-1.378l-.36-.214-3.733.979.997-3.645-.234-.374A9.865 9.865 0 012.106 12C2.106 6.533 6.533 2.106 12 2.106S21.894 6.533 21.894 12 17.467 21.894 12 21.894z"/>
                </svg>
              </div>
              <div>
                <p style={styles.socialTitle}>WhatsApp</p>
                <p style={styles.socialSub}>Escríbenos ahora</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    padding: "20px"
  },
card: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: "60px",
    borderRadius: "20px",
    textAlign: "center",
  border: "1px solid #d4af37",
boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)"  // ← efecto brillo dorado sutil
},
  title: {
    fontSize: "3rem",
    marginBottom: "20px"
  },
  logo: {
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "20px",
    border: "2px solid #d4af37"
  },
  subtitle: {
    marginBottom: "30px"
  },
  button: {
    padding: "12px 30px",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
    color: "#000",
    backgroundColor: "#d4af37"
  },
  socialGrid: {
    display: "flex",
    gap: "16px",
    marginTop: "30px",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  socialCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(212,175,55,0.3)",
    borderRadius: "15px",
    padding: "16px 24px",
    cursor: "pointer",
    minWidth: "200px"
  },
  socialIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  socialTitle: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "1rem",
    textAlign: "left"
  },
  socialSub: {
    margin: 0,
    fontSize: "0.8rem",
    color: "#aaa",
    textAlign: "left"
  }
};

export default Hero;