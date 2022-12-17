const screenshortbtn = document.querySelector("#src-btn");

const screenshortpreview = document.querySelector(".src-preview");

const closebtn = document.querySelector("#close-btn");

const captureScreen = async () => {
  try {
    //askking permission to use a media input to record current tab
    const stream = await navigator.mediaDevices.getDisplayMedia({
      preferCurrentTab: true,
    });

    const video = document.createElement("video");

    video.addEventListener("loadedmetadata", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      //passing video width and height as canvas width and height
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      //playing the video so the drawn image won't be black or blank
      video.play();

      //drawing an image from the captured video stream
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      //terminating video track of stream
      stream.getVideoTracks()[0].stop();
      //pass canvas data url as screenshot preview src
      screenshortpreview.querySelector("img").src = canvas.toDataURL();
      screenshortpreview.classList.add("show");
    });
    //pasing capture stream data as video source object
    video.srcObject = stream;
  } catch (error) {
    //if could n't capyure by any reason then alert the msg
    console.log(error);
  }
};

closebtn.addEventListener("click", () =>
  screenshortpreview.classList.toggle("show")
);
screenshortbtn.addEventListener("click", captureScreen);
