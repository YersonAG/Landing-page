import videoBg from "../assets/videoop.mp4";

function BackgroundVideo() {
  return (
    <div style={styles.wrapper}>
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={styles.video}
      >
        <source src={videoBg} type="video/mp4" />
      </video>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: -1,
    overflow: "hidden",
    backgroundColor: "#030303",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "left center", // 🔥 recorta desde la derecha
  }
};

export default BackgroundVideo;