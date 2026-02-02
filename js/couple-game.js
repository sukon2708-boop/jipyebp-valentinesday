const questions = [
  {
    
    q: "What is my favorite color?",
    c: ["Blue", "Pink", "Black"],
    correct: 0, // อย่าลืมเปลี่ยนตามความจริงนะ!
  },
  {
    q: "Who is more stubborn (ดื้อกว่า)?",
    c: ["Me", "You", "Both of us"],
    correct: 1, 
  },
  {
    q: "What is my favorite hobby?",
    c: ["Playing games", "Sleeping", "Shopping"],
    correct: 2,
  },
  {
    q: "What season do I like the most?",
    c: ["Summer", "Rainy", "Winter"],
    correct: 0,
  },
  {
    q: "If we go to the cinema, what popcorn flavor do I choose?",
    c: ["Sweet", "Salty", "Cheese"],
    correct: 0,
  },
    
  
];

let index = 0;
let score = 0;

const questionText = document.getElementById("questionText");
const choicesBox = document.getElementById("choices");
const answerHint = document.getElementById("answerHint");
const gameCard = document.getElementById("gameCard");

function renderQuestion() {
  const q = questions[index];
  questionText.textContent = `${index + 1}. ${q.q}`;
  answerHint.textContent = "";
  choicesBox.innerHTML = "";

  q.c.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = choice;
    btn.onclick = () => selectAnswer(i);
    choicesBox.appendChild(btn);
  });
}

function selectAnswer(selected) {
  const q = questions[index];

  if (selected === q.correct) {
    score++;
    answerHint.textContent = " That’s exactly right!";
  } else {
    answerHint.textContent = " That’s okay, no worries";
  }

  answerHint.textContent += " — " + q.explain;

  index++;

  setTimeout(() => {
    if (index < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }, 1200);
}

function showResult() {
  gameCard.innerHTML = `
    <h2>Game Over </h2>
    <p class="subtle">You scored</p>
    <h6>${score} / ${questions.length}Final Score</h6>
    <p class="subtle">${resultMessage()}</p>
  `;
}

function resultMessage() {
  if (score === 5) return "An amazing match — truly meant for each other";
  if (score >= 3) return "Just the right amount of sweetness, so lovely ";
  return "Love isn’t about the score, it’s about the heart";
}

renderQuestion();
