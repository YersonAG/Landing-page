import { useEffect, useRef } from "react";
import BackgroundVideo from "./BackgroundVideo";

const products = [
  {
    id: 1,
    name: "Essenza Gold",
    description: "Fragancia intensa con notas amaderadas y ámbar.",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539"
  },
  {
    id: 2,
    name: "Noir Elegance",
    description: "Aroma sofisticado con toques de vainilla y cuero.",
    image: "https://locionesbogota.com/cdn/shop/products/7063b386-3944-4258-925e-fc3c803c8280.jpg?v=1676302569&width=1445"
  },
  {
    id: 3,
    name: "Arabian Night",
    description: "Perfume árabe con esencia dulce y especiada.",
    image: "https://i.ebayimg.com/images/g/eAwAAOSwgGBoR-bo/s-l300.jpg"
  }
];

function Products() {
  const phoneNumber = "573116845894";
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-fade");
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const handleWhatsApp = (productName) => {
    const message = `Hola, quiero preguntar por el perfume ${productName}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <BackgroundVideo />
      <div style={styles.container}>
        <h1 style={styles.title} className="animate-fadeSlideUp">
          Nuestra Colección
        </h1>
        <div style={styles.grid}>
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (cardsRef.current[index] = el)}
              style={styles.card}
              className="product-card"
            >
              <img
                src={product.image}
                alt={product.name}
                style={styles.image}
              />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <button
                style={styles.button}
                className="btn-shimmer"
                onClick={() => handleWhatsApp(product.name)}
              >
                Pregunta por este producto
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "40px",
    minHeight: "100vh",
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white"
  },
  title: {
    textAlign: "center",
    marginBottom: "40px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px"
  },
card: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    border: "1px solid #d4af37",                        // ← borde dorado
    boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)"       // ← brillo sutil
},
  image: {
    width: "100%",
    height: "250px",
    objectFit: "contain",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: "10px",
    padding: "10px"
  },
button: {
  marginTop: "15px",
  padding: "10px 20px",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold",
  color: "#000"  // ← agrega esto
},
};

export default Products;