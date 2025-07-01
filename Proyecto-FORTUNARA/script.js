const wheel = document.getElementById('wheel');
const container = document.getElementById('wheelContainer');
const optionsContainer = document.getElementById('optionsContainer');

const data = [
  { title: "Rutas extremas", desc: "Adrenalina pura por senderos difíciles.", img: "imagenes/021.jpg" },
  { title: "Paradas estrategicas", desc: "Disfruta de nuestras cascadas naturales.", img: "imagenes/PARADAS.jpg" },
  { title: "Refrigerio", desc: "Disfruta de snacks en medio de la jungla.", img: "imagenes/REFRIGERIO.jpg" },
  { title: "Fotos del tour", desc: "Sesión fotográfica en puntos estratégicos.", img: "imagenes/FOTOS.jpg" },
  { title: "Nocturna", desc: "Tour bajo las estrellas, solo para valientes.", img: "imagenes/NOCHE.jpg" },
  { title: "Seguridad", desc: "Guías debidamente capacitados.", img: "imagenes/SEGURIDAD.jpeg" }
];

const total = data.length;
const angleStep = 360 / total;
const radius = 350; 
let active = 0;

optionsContainer.innerHTML = data.map((d, i) => `
  <div class="option-card" data-index="${i}">
    <img src="${d.img}" />
    <span>${d.title}</span>
    <div class="option-text">${d.desc}</div>
  </div>
`).join('');

function updateDisplay(delta = 0) {
  active = (active + delta + total) % total;
  const rot = -active * angleStep;
  wheel.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;

  document.querySelectorAll('.option-card').forEach((card, i) => {
    const offset = ((i - active + total) % total) * angleStep;
    const rad = (offset - 90) * Math.PI / 180;
    const x = radius * Math.cos(rad);
    const y = radius * Math.sin(rad);
    card.style.left = `calc(50% + ${x}px)`;
    card.style.top = `calc(50% + ${y}px)`;
    card.classList.toggle('active', i === active);
    card.classList.toggle('visible',
      i === (active + 1) % total ||
      i === (active + total - 1) % total
    );
  });
}

container.addEventListener('click', e => {
  const half = window.innerWidth / 2;
  updateDisplay(e.clientX < half ? -1 : 1);
});

updateDisplay(0);
