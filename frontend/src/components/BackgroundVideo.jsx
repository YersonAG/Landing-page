import videoBg from "../assets/video.mp4";

function BackgroundVideo() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      style={styles.video}
    >
      <source src={videoBg} type="video/mp4" />
    </video>
  );
}

const styles = {
  video: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    objectFit: "contain",   // ← cambia "cover" por "contain"
    backgroundColor: "#000",
    zIndex: -1
  }
};

export default BackgroundVideo;