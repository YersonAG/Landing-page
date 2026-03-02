import { useNavigate } from "react-router-dom";
import BackgroundVideo from "./BackgroundVideo";

function Hero() {
  const navigate = useNavigate();

  return (
    <>
      <BackgroundVideo />
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Luisao Parfums</h1>
          <p style={styles.subtitle}>
            Descubre fragancias que cuentan tu historia.
          </p>
          <button
            style={styles.button}
            onClick={() => navigate("/products")}
          >
            Ver Colección
          </button>
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
    color: "white"
  },
  card: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: "60px",
    borderRadius: "20px",
    textAlign: "center"
  },
  title: {
    fontSize: "3rem",
    marginBottom: "20px"
  },
  subtitle: {
    marginBottom: "30px"
  },
  button: {
    padding: "12px 30px",
    border: "none",
    borderRadius: "25px",
    backgroundColor: "#d4af37",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default Hero;