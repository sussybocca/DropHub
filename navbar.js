// navbar.js
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6xF5RTX6wy87TT17q61nUzoHI70JBkcA",
  authDomain: "funfu-b4ad8.firebaseapp.com",
  projectId: "funfu-b4ad8",
  storageBucket: "funfu-b4ad8.appspot.com",
  messagingSenderId: "400767863064",
  appId: "1:400767863064:web:xxxxxxxxxxxxxxxxxxxxx",
  measurementId: "G-XXXXXXXXXX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.body.insertAdjacentHTML("afterbegin", `
  <header style="background:#0a59a6;color:white;padding:10px 16px;display:flex;justify-content:space-between;align-items:center;">
    <div style="font-size:20px;font-weight:700;">DropHub</div>
    <nav style="display:flex;align-items:center;gap:14px;">
      <a href="index.html" style="color:white;text-decoration:none;">Home</a>
      <a href="ai.html" style="color:white;text-decoration:none;">AI Chat</a>
      <a href="linked.html" style="color:white;text-decoration:none;">Linked</a>
      <a id="profile-link" href="profile.html" style="display:flex;align-items:center;gap:10px;text-decoration:none;color:#ddd;">
        <img id="user-pic" src="" alt="User" style="width:32px;height:32px;border-radius:50%;display:none;">
        <span id="user-info" style="font-size:14px;color:#ddd;"></span>
      </a>
      <button id="logout-btn" style="background:#fff;color:#0a59a6;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;">
        Logout
      </button>
    </nav>
  </header>
`);

onAuthStateChanged(auth, (user) => {
  const infoEl = document.getElementById("user-info");
  const picEl = document.getElementById("user-pic");

  if (user) {
    const name = user.displayName || user.email || "Anonymous";
    infoEl.textContent = name;

    if (user.photoURL) {
      picEl.src = user.photoURL;
      picEl.style.display = "block";
    } else {
      picEl.style.display = "none";
    }
  } else {
    if (!location.pathname.endsWith("signup.html")) {
      window.location.href = "signup.html";
    }
  }
});

document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "logout-btn") {
    signOut(auth).then(() => {
      window.location.href = "signup.html";
    }).catch(err => {
      alert("Logout error: " + err.message);
    });
  }
});