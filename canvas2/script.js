document.addEventListener('DOMContentLoaded', () => {
  const canva = document.querySelector('canvas');
  const ctx = canva.getContext('2d');
  const pencil = { enabled: false };
  const lineWidthRange = document.querySelector('#test');

  canva.addEventListener('mousedown', (ev) => {
    ctx.beginPath();
    ctx.moveTo(ev.offsetX, ev.offsetY);
    pencil.enabled = true;
  });

  canva.addEventListener('mousemove', (ev) => {
    if (pencil.enabled) {
      ctx.lineTo(ev.offsetX, ev.offsetY);
      ctx.stroke()
    }
  });

  ['mouseup', 'mouseleave'].forEach((val) => {
    canva.addEventListener(val, () => {
      pencil.enabled = false;
    });
  });

  Array.from(Array(6)).forEach(() => {
    const elem = document.createElement('div');
    const randomColor = `#${(Math.trunc(Math.random() * 1e6)).toFixed(0)}`;

    elem.className = 'color';

    elem.style.width = '100px';
    elem.style.height = '100px';
    elem.style.backgroundColor = randomColor.length < 7 ? randomColor + 'f' : randomColor;
    const container = document.querySelector('#color-picker');
    container.appendChild(elem);

    elem.addEventListener('click', () => {
      ctx.strokeStyle = elem.style.backgroundColor;
    })
  });

  document.querySelector('#default-color').addEventListener('click', () => {
    ctx.strokeStyle = "#000";
  });

  lineWidthRange.addEventListener('change', () => {
    const width = lineWidthRange.value === '0' ? 1 : lineWidthRange.value;
    console.log(lineWidthRange.value);
    ctx.lineWidth = width;
  });
});
