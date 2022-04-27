const img = document.querySelector('#image');
const canvas = document.querySelector('#canvas');
const contex = canvas.getContext('2d');
const { naturalHeight: height, naturalWidth: width } = img;

img.addEventListener('load', () => {
  contex.drawImage(img, 0, 0, width, height, 0, 0, 140, 120);
  contex.globalCompositeOperation = 'destination-in';
  contex.beginPath();
  contex.arc(100, 75, 50, 0, 2 * Math.PI);
  contex.closePath();
  contex.fill();
});