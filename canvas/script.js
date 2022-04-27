const img = document.querySelector('#image');
const canvas = document.querySelector('#canvas');
const contex = canvas.getContext('2d');
const { naturalHeight: height, naturalWidth: width } = img;

img.addEventListener('load', () => {
  contex.drawImage(img, 0, 0, width, height, 0, 0, 200, 200);
  contex.globalCompositeOperation='destination-in';
  contex.beginPath();
  contex.arc(100, 100, 50, 0, 2 * Math.PI);
  contex.closePath();
  contex.fill();
  const image = canvas.toDataURL();
  const newImage = new Image();
  newImage.src = image;
  document.querySelector('body').append(newImage);
});