async function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chatBox");
  const text = input.value.trim();
  if (!text) return;

  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.textContent = "👩‍🎓 You: " + text;
  chat.appendChild(userMsg);
  input.value = "";

  const thinking = document.createElement("div");
  thinking.className = "message thinking";
  thinking.textContent = "🤖 StudyBot is thinking...";
  chat.appendChild(thinking);
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch("http://localhost:3001/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    thinking.remove();

    const reply = data?.reply || "📢 Demo Fallback: No reply received.";
    const botMsg = document.createElement("div");
    botMsg.className = "message bot";
    botMsg.textContent = "🤖 StudyBot: " + reply;
    chat.appendChild(botMsg);
    chat.scrollTop = chat.scrollHeight;

  } catch (err) {
    thinking.remove();
    const errorMsg = document.createElement("div");
    errorMsg.className = "message bot";
    errorMsg.textContent = "❌ Failed to reach StudyBot server.";
    chat.appendChild(errorMsg);
  }
}

async function generateSyllabus() {
  const chat = document.getElementById("chatBox");

  const plan = document.createElement("div");
  plan.className = "message bot";
  plan.textContent =
    "📅 Study Plan:\n\n" +
    "Day 1: Maths - Algebra\n" +
    "Day 2: Science - Physics\n" +
    "Day 3: English - Grammar\n" +
    "Day 4: History - Independence Movement\n" +
    "Day 5: Computer - HTML/CSS basics\n" +
    "Day 6: Revision\n" +
    "Day 7: Mock Tests";
  chat.appendChild(plan);
  chat.scrollTop = chat.scrollHeight;
}

window.sendMessage = sendMessage;
window.generateSyllabus = generateSyllabus;
