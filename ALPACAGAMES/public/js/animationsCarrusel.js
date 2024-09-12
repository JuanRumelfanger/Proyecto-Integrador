let button = document.querySelectorAll(".carrusel-arrow");
let carruselImg = document.querySelector(".carousel-container img");
let src = carruselImg.getAttribute("src");

let srcImages = [
  "https://www.esportmaniacos.com/wp-content/uploads/2021/10/ffvii-min.jpg",
  "https://www.esportmaniacos.com/wp-content/uploads/2021/10/halo-min.jpg",
  "https://www.esportmaniacos.com/wp-content/uploads/2021/10/sm64-min.jpg",
  "https://www.esportmaniacos.com/wp-content/uploads/2021/10/gta-min.jpg",
  "https://www.esportmaniacos.com/wp-content/uploads/2021/10/rdr2-min.jpg",
  "https://cdn.tutsplus.com/cdn-cgi/image/width=600/psd/uploads/legacy/psdtutsarticles/linkb_60vgamecovers/44.jpg",
  "https://cdn.tutsplus.com/cdn-cgi/image/width=600/psd/uploads/legacy/psdtutsarticles/linkb_60vgamecovers/42.jpg",
  "https://cdn.tutsplus.com/cdn-cgi/image/width=600/psd/uploads/legacy/psdtutsarticles/linkb_60vgamecovers/36.jpg",
  "https://cdn.tutsplus.com/cdn-cgi/image/width=600/psd/uploads/legacy/psdtutsarticles/linkb_60vgamecovers/35.jpg",
  "https://cdn.tutsplus.com/cdn-cgi/image/width=640/psd/uploads/legacy/psdtutsarticles/linkb_60vgamecovers/9.jpg",
  "https://blog.latam.playstation.com/tachyon/sites/3/2023/08/fea814f49d5dc6f94e1eb2152d2ef1ad26ebd26b.jpg?resize=1088%2C612&crop_strategy=smart&zoom=1",
];

let imgPosition = 4;
button[0].addEventListener("click", (e) => {
  imgPosition = imgPosition - 1;
  if (imgPosition < 0) {
    imgPosition = srcImages.length - 1;
    src = srcImages[imgPosition];
    carruselImg.setAttribute("src", src);
  } else {
    src = srcImages[imgPosition];
    carruselImg.setAttribute("src", src);
  }
});

button[1].addEventListener("click", (e) => {
  imgPosition = imgPosition + 1;
  if (imgPosition > srcImages.length-1) {
    imgPosition = 0;
    src = srcImages[imgPosition];
    carruselImg.setAttribute("src", src);
  } else {
    src = srcImages[imgPosition];
    carruselImg.setAttribute("src", src);
  }
});
