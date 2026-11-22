const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "Switch to light mode";
    } else {
        themeToggle.textContent = "Switch to dark mode";
    }
});

// 5-Question Interactive Quiz
const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink and Text Markup Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which CSS property is used to create a grid layout?",
        options: ["display: flex", "display: grid", "layout: grid", "position: grid"],
        answer: 1
    },
    {
        question: "Which DOM method selects an element by its ID in JavaScript?",
        options: ["querySelectorAll()", "getElementByClass()", "getElementById()", "findElement()"],
        answer: 2
    },
    {
        question: "Which keyword declares a block-scoped variable that cannot be reassigned?",
        options: ["var", "let", "static", "const"],
        answer: 3
    },
    {
        question: "Which Git command creates and switches to a new branch?",
        options: ["git branch -d", "git checkout -b", "git merge", "git push -u"],
        answer: 1
    }
];

let currentIdx = 0;
let score = 0;

const progressEl = document.getElementById("quiz-progress");
const questionEl = document.getElementById("question-text");
const optionsEl = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const quizActive = document.getElementById("quiz-active");
const quizResult = document.getElementById("quiz-result");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
    const current = quizQuestions[currentIdx];
    progressEl.textContent = `Question ${currentIdx + 1} of ${quizQuestions.length}`;
    questionEl.textContent = current.question;
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";

    current.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-opt-btn";
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(index, btn);
        optionsEl.appendChild(btn);
    });
}

function selectAnswer(selectedIdx, selectedBtn) {
    const correctIdx = quizQuestions[currentIdx].answer;
    const allBtns = optionsEl.querySelectorAll("button");
    allBtns.forEach(b => (b.disabled = true));

    if (selectedIdx === correctIdx) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
        allBtns[correctIdx].classList.add("correct");
    }
    nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
    currentIdx++;
    if (currentIdx < quizQuestions.length) {
        loadQuestion();
    } else {
        quizActive.style.display = "none";
        quizResult.style.display = "block";
        scoreText.textContent = `You scored ${score} out of ${quizQuestions.length}!`;
    }
});

restartBtn.addEventListener("click", () => {
    currentIdx = 0;
    score = 0;
    quizResult.style.display = "none";
    quizActive.style.display = "block";
    loadQuestion();
});

loadQuestion();