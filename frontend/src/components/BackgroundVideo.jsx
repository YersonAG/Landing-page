import { useState, useRef } from "react";
import videoBg from "../assets/videoop.mp4";
import posterImg from "../assets/poster.jpg"; // ← tu imagen de fondo

function BackgroundVideo() {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);

  return (
    <div style={styles.wrapper}>
      {/* Poster visible instantáneamente */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${posterImg})`,
        backgroundSize: "cover",
        backgroundPosition: "left center",
        zIndex: 0,
      }} />

      {/* Video hace fade in cuando está listo */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setVideoReady(true)}
        style={{
          ...styles.video,
          zIndex: 1,
          opacity: videoReady ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      >
        <source src={videoBg} type="video/mp4" />
      </video>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
    top: 0, left: 0,
    width: "100vw", height: "100vh",
    zIndex: -1,
    overflow: "hidden",
    backgroundColor: "#030303",
  },
  video: {
    position: "absolute",
    top: 0, left: 0,
    width: "100%", height: "100%",
    objectFit: "cover",
    objectPosition: "left center",
  }
};

export default BackgroundVideo;