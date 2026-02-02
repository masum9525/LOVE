let videoPlayed = false;
let videoElement;

// Setup local video (replaces YouTube)
function setupLocalVideo() {
  videoElement = document.createElement("video");
  videoElement.src = "./sugar.mp4"; // Local video file (no ads)
  videoElement.muted = true;
  videoElement.controls = false;
  videoElement.autoplay = false;
  videoElement.style.width = "100%";
  videoElement.style.height = "100%";
  videoElement.style.objectFit = "cover";
  videoElement.currentTime = 40;

  const container = document.getElementById("youtube-player-container");
  if (container) {
    container.style.display = "none";
    container.appendChild(videoElement);
  }
}

// Initialize video on load
setupLocalVideo();

function showMessage(response) {
  if (response === "No") {
    const noButton = document.getElementById("no-button");
    const maxWidth = window.innerWidth - noButton.offsetWidth;
    const maxHeight = window.innerHeight - noButton.offsetHeight;

    noButton.style.position = "absolute";

    // Change image
    document.getElementsByClassName("image")[0].src = "gun.gif";

    document.getElementById("question").textContent = "Choose wisely";
    document.getElementById("name").style.display = "none";

    noButton.addEventListener("mouseover", () => {
      if (!videoPlayed) {
        const container = document.getElementById("youtube-player-container");
        if (container && videoElement) {
          container.style.display = "block";
          videoElement.muted = false;
          videoElement.play().catch(() => {});
        }
        videoPlayed = true;
      }

      const randomX = Math.max(0, Math.floor(Math.random() * maxWidth));
      const randomY = Math.max(0, Math.floor(Math.random() * maxHeight));

      noButton.style.zIndex = "100";
      noButton.style.left = randomX + "px";
      noButton.style.top = randomY + "px";
    });
  }

  if (response === "Yes") {
    document.getElementById("name")?.remove();
    document.getElementById("no-button")?.remove();

    // Stop & remove video
    if (videoElement) {
      videoElement.pause();
      videoElement.remove();
    }

    const container = document.getElementById("youtube-player-container");
    if (container) container.remove();

    // Play celebration audio
    const audioElement = document.createElement("audio");
    audioElement.src = "./Minions Cheering.mp4";
    audioElement.preload = "auto";
    audioElement.play().catch(() => {});

    // Update UI
    const yesMessage = document.getElementById("question");
    yesMessage.textContent = "See you on the 14th my princess";
    yesMessage.style.display = "block";
    yesMessage.style.fontStyle = "normal";

    document.getElementsByClassName("image")[0].src = "dance.gif";

    document.getElementById("yesButton")?.remove();
  }
}
