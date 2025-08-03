const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const log = document.getElementById('log');

const websiteMap = {
  "google": "https://www.google.com",
  "youtube": "https://www.youtube.com",
  "whatsapp": "https://web.whatsapp.com",
  "gmail": "https://mail.google.com",
  "instagram": "https://www.instagram.com",
  "facebook": "https://www.facebook.com",
  "twitter": "https://twitter.com",
  "chatgpt": "https://chat.openai.com",
  "flipkart": "https://www.flipkart.com",
  "amazon": "https://www.amazon.in",
  "linkedin": "https://www.linkedin.com",
  "github": "https://www.github.com",
  "stackoverflow": "https://stackoverflow.com",
  "spotify": "https://open.spotify.com",
  "netflix": "https://www.netflix.com",
  "hotstar": "https://www.hotstar.com",
  "disney": "https://www.disneyplus.com",
  "canva": "https://www.canva.com",
  "notion": "https://www.notion.so",
  "telegram": "https://web.telegram.org",
  "reddit": "https://www.reddit.com",
  "quora": "https://www.quora.com",
  "medium": "https://medium.com",
  "zoom": "https://zoom.us",
  "meet": "https://meet.google.com",
  "teams": "https://teams.microsoft.com",
  "microsoft": "https://www.microsoft.com",
  "apple": "https://www.apple.com",
  "bing": "https://www.bing.com",
  "weather": "https://www.accuweather.com",
  "news": "https://news.google.com",
  "wikipedia": "https://www.wikipedia.org",
  "udemy": "https://www.udemy.com",
  "coursera": "https://www.coursera.org",
  "edx": "https://www.edx.org",
  "khanacademy": "https://www.khanacademy.org",
  "geeksforgeeks": "https://www.geeksforgeeks.org",
  "leetcode": "https://leetcode.com",
  "codeforces": "https://codeforces.com",
  "codechef": "https://www.codechef.com",
  "hackerrank": "https://www.hackerrank.com",
  "hackerearth": "https://www.hackerearth.com",
  "replit": "https://replit.com",
  "vercel": "https://vercel.com",
  "githubpages": "https://pages.github.com",
  "heroku": "https://www.heroku.com",
  "firebase": "https://firebase.google.com",
  "jntu": "https://www.jntuh.ac.in",
  "iitbombay": "https://www.iitb.ac.in",
  "iitdelhi": "https://home.iitd.ac.in",
  "iitmadras": "https://www.iitm.ac.in",
  "mit": "https://www.mit.edu",
  "stanford": "https://www.stanford.edu",
  "oxford": "https://www.ox.ac.uk",
  "harvard": "https://www.harvard.edu",
  "hercollege": "https://www.hercollege.edu",
  "resumeworded": "https://resumeworded.com",
  "jobscan": "https://www.jobscan.co"
};

// Speech to Text Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onstart = () => {
    console.log("🎤 Voice recognition started...");
};

recognition.onspeechend = () => {
    recognition.stop();
    console.log("🔇 Voice input ended.");
};

recognition.onerror = (event) => {
    console.error("❌ Voice recognition error:", event.error);
    speak("I couldn't hear you. Please try again.");
};

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("🎙️ Transcript:", transcript);
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

recognition.onend = () => {
    console.log("🔁 Restarting recognition...");
    setTimeout(() => recognition.start(), 500);
};

btn.addEventListener('click', () => {
    console.log("🎧 Listening started...");
    content.textContent = "Listening...";
    recognition.start();
});

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.volume = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
}

function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) speak("Good Morning Boss...");
    else if (hour >= 12 && hour < 17) speak("Good Afternoon Master...");
    else speak("Good Evening Sir...");
}

function logCommand(userText, aiText) {
    log.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;
    log.innerHTML += `<p><strong>KIWI-X:</strong> ${aiText}</p>`;
    log.scrollTop = log.scrollHeight;
}

async function askGPT(message) {
    const apiKey = "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";
    const endpoint = "https://api.openai.com/v1/chat/completions";

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }]
            })
        });

        const data = await response.json();
        const aiText = data.choices[0].message.content.trim();
        speak(aiText);
        logCommand(message, aiText);
    } catch (error) {
        console.error("🔌 GPT API error:", error);
        speak("Sorry, I couldn't connect to the server.");
        logCommand(message, "Connection failed.");
    }
}

function takeCommand(message) {
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes("hello") || lowerMsg.includes("hey")) {
        const reply = "Hello Sir, How may I assist you?";
        speak(reply);
        logCommand(message, reply);

    } else if (lowerMsg.includes("time")) {
        const time = new Date().toLocaleTimeString();
        const reply = "The current time is " + time;
        speak(reply);
        logCommand(message, reply);

    } else if (lowerMsg.includes("date")) {
        const date = new Date().toLocaleDateString();
        const reply = "Today's date is " + date;
        speak(reply);
        logCommand(message, reply);

    } else if (lowerMsg.startsWith("open ")) {
        const siteKey = lowerMsg.replace("open ", "").replace(/\s+/g, "");
        if (websiteMap[siteKey]) {
            window.open(websiteMap[siteKey], "_blank");
            const reply = `Opening ${siteKey}`;
            speak(reply);
            logCommand(message, reply);
        } else {
            const url = `https://www.${siteKey}.com`;
            window.open(url, "_blank");
            const reply = `Trying to open ${siteKey}`;
            speak(reply);
            logCommand(message, reply);
        }
    } else {
        speak("Let me think...");
        askGPT(message);
    }
}

window.addEventListener('load', () => {
    console.log("🚀 KIWI-X is initializing...");
    speak("Initializing KIWI-X...");
    wishMe();
});