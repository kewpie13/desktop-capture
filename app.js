var video = document.getElementById("video");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var interval = 10000;

// screenshot をとり、送信
var screenshot = function () {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  // canvas.toBlob(function (blob) {
  //   var fd = new FormData();
  //   fd.append("file", blob, "screen.png");
  //   fetch("http://localhost:9999/image.php", {
  //     method: "POST",
  //     body: fd,
  //   });
  // });
  canvas.toBlob(function (blob) {
    var newImg = document.createElement("img"),
      url = URL.createObjectURL(blob);

    newImg.onload = function () {
      // 無効化されたため、もはや blob を読み取る必要はありません。
      URL.revokeObjectURL(url);
    };

    newImg.src = url;
    document.body.appendChild(newImg);
  });
};

document.getElementById("Start").addEventListener("click", function (e) {
  chrome.desktopCapture.chooseDesktopMedia(
    ["screen", "window"],
    function (streamId) {
      navigator.webkitGetUserMedia(
        {
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: "desktop",
              chromeMediaSourceId: streamId,
            },
          },
        },
        function (stream) {
          video.srcObject = stream;
          // ちょっと delay を与えないとうまくとれなかった。
          // もうちょっとなんとかなる方法ないか探し中。
          setTimeout(function () {
            screenshot();
          }, 1000);
          setInterval(function () {
            screenshot();
          }, interval);
        },
        function () {
          alert("error");
        }
      );
    }
  );
});
