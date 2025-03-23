const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin-btn");
const cards = document.querySelectorAll(".card");

const categories = {
  1: "🫁 **Latihan Napas (4-7-8 Breathing)**\n\nTarik napas selama **4 detik**, tahan selama **7 detik**, lalu embuskan perlahan selama **8 detik**.",
  2:"💖 **Afirmasi Positif (Self Love Reminder)**\n\nBerikan afirmasi positif ke diri sendiri, seperti:\n- 'Aku berharga dan pantas bahagia.'\n- 'Aku menerima diriku apa adanya dengan penuh kasih.'",
  3:"🗣️ **Tantangan sosial (Tanya, Dengar, Respon)**\n\nCoba tanyakan kabar temanmu dengan tulus, misalnya:\n- 'Hari ini gimana?'\n- 'Ada kejadian seru atau ngeselin'\nDengarkan dengan baik sebelum merespons.",
  4:"📖 **Jurnal Refleksi (Mood Tracker 1-10)**\n\nBeri rating **1-10** untuk moodmu hari ini dan berikan alasannya. Apa yang membuat harimu baik atau buruk?",
  5:"🍀 **Mindfulness & Relaksasi (5-4-3-2-1 Grounding)**\n\n- Sebutkan **5 hal** yang dapat kamu lihat.\n- Sebutkan **4 hal** yang dapat kamu sentuh.\n- Sebutkan **3 suara** yang dapat kamu dengar.\n- Sebutkan **2 bau** yang dapat kamu cium.\n- Sebutkan **1 hal** yang dapat kamu rasakan."
};

const sections = 5;
const angle = (2 * Math.PI) / sections;
const colors = ["#FF5733", "#33FF57", "#5733FF", "#FFC300", "#C70039"];

let curentAngle = 0;

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < sections; i++) {
      ctx.beginPath();
      ctx.moveTo(160, 160);
      ctx.arc(160, 160, 150, i * angle, (i + 1) * angle);
      ctx.fillStyle = colors[i];
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";

      let textAngle = i * angle + angle / 2;
      let x = 160 + Math.cos(textAngle) * 100;
      let y = 160 + Math.sin(textAngle) * 100;
    
      ctx.fillText(i + 1, x, y);
  }
}

function spinWheel() {
  let randomSpins = Math.floor(Math.random() * 5) + 5;
  let randomFinalAngle = Math.floor(Math.random() * 360);
  let targetAngle = 360 * randomSpins + randomFinalAngle;

  canvas.style.transition = "transform 3s ease-out";
  canvas.style.transform = `rotate(${targetAngle}deg)`;

  setTimeout(() => {
    let finalAngle = (targetAngle % 360);
    let selectedNumber = Math.ceil((360 - finalAngle) / (360 / sections));

    if (selectedNumber > sections) selectedNumber = 1;

    console.log('Angka yang terpilih: ${selectedNumber}');
    animateCard(selectedNumber);
  }, 3000);
}

function animateCard(number) {
  cards.forEach(card => {
    let cardNumber = parseInt(card.getAttribute("data-number"));
    
    if (cardNumber === number) {
      setTimeout(() => {
        card.classList.add("zoom-in");
        card.innerHTML = `<p class="text fade-in">${categories[number]}</p>`;
    }, 500);
  } else {
      card.classList.remove("zoom-in");
      card.innerHTML = card.dataset.number;
    }
  });
}

spinBtn.addEventListener("click", spinWheel);
drawWheel();