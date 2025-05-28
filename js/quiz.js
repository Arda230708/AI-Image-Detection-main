const questions = [
    {
      question: "1. Was ist das Ziel des Projekts?",
      options: ["Eine App zum Zeichnen von Tieren", "Eine Webseite, die per Kamera Bilder erkennt", "Eine Datenbank für Tierarten"],
      answer: 1
    },
    {
      question: "2. Wie erkennt die Webseite, was sich auf dem Bild befindet?",
      options: ["Durch manuelle Eingabe", "Durch eine Zufallsauswahl", "Durch künstliche Intelligenz"],
      answer: 2
    },
    {
      question: "3. Was muss man tun, damit die KI ein Objekt erkennen kann?",
      options: ["Einen Text beschreiben", "Ein gedrucktes Bild vor die Kamera halten", "Eine Audiodatei abspielen"],
      answer: 1
    },
    {
      question: "4. Was kann die KI alles erkennen?",
      options: ["Nur Katzen", "Nur Texte", "Viele verschiedene Dinge"],
      answer: 2
    },
    {
      question: "5. Welche Technologie wird in diesem Projekt zur Bilderkennung verwendet?",
      options: ["Photoshop", "TensorFlow", "Excel"],
      answer: 1
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let playerName = "";
  const players = [];
  
  function startQuiz() {
    const nameInput = document.getElementById("playerName").value.trim();
    if (!nameInput) return alert("Bitte gib deinen Namen ein.");
    playerName = nameInput;
    score = 0;
    currentQuestion = 0;
    document.getElementById("start").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    showQuestion();
  }
  
  function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("questionText").innerText = q.question;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    q.options.forEach((optionText, index) => {
      const label = document.createElement("label");
      label.className = "list-group-item list-group-item-action bg-dark text-light border-secondary"; // Added classes for Bootstrap styling
      label.htmlFor = "opt" + index;

      const radio = document.createElement("input");
      radio.className = "form-check-input me-1"; // Bootstrap class
      radio.type = "radio";
      radio.name = "option"; // Consistent name for radio group
      radio.value = index;
      radio.id = "opt" + index;
      
      label.appendChild(radio);
      label.appendChild(document.createTextNode(" " + optionText)); // Add option text after radio

      optionsDiv.appendChild(label);
    });
  }
  
  function nextQuestion() {
    const selected = document.querySelector('input[name="option"]:checked');
    if (!selected) return alert("Bitte eine Antwort auswählen!");
    if (parseInt(selected.value) === questions[currentQuestion].answer) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }
  
  function endQuiz() {
    players.push({ name: playerName, score });
    players.sort((a, b) => b.score - a.score);
    const list = document.getElementById("scoreList");
    list.innerHTML = "";
    players.forEach(p => {
      const li = document.createElement("li");
      li.className = "list-group-item bg-secondary text-light border-dark"; // Added classes for Bootstrap styling
      li.innerText = `${p.name}: ${p.score} Punkte`;
      list.appendChild(li);
    });
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
  }
  
  function restart() {
    document.getElementById("playerName").value = "";
    document.getElementById("result").classList.add("hidden");
    document.getElementById("start").classList.remove("hidden");
  }