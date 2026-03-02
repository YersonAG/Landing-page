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
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
    zIndex: -1,
    willChange: "transform",
    transform: "translateZ(0)",
    WebkitTransform: "translateZ(0)"
  }
};

export default BackgroundVideo;