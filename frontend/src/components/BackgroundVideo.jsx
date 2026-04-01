import { useState, useRef } from "react";
import videoBg from "../assets/videoop.mp4";
import videoWebm from "../assets/Videofinal.webm";

function BackgroundVideo() {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);

  return (
    <div style={styles.wrapper}>
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
          opacity: videoReady ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      >
        <source src={videoWebm} type="video/webm" />
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