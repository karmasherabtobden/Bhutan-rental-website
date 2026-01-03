// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCip7LHn4xv45pZOIhj1AW1V5fu4p7RQwY",
  authDomain: "bhutan-rental.firebaseapp.com",
  projectId: "bhutan-rental",
  storageBucket: "bhutan-rental.firebasestorage.app",
  messagingSenderId: "259342389102",
  appId: "1:259342389102:web:a61f6c607464c408c7fb7f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ==============================
// POST HOUSE
// ==============================
const form = document.getElementById("postForm");
const auth = firebase.auth();
if (form) {
  form.addEventListener("submit", function (e) {
    const user = auth.currentUser;

if (!user) {
  alert("You must be logged in to post a house.");
  window.location.href = "auth.html";
  return;
}
    e.preventDefault();

    const location = document.getElementById("location").value;
    const rent = document.getElementById("rent").value;
    const description = document.getElementById("description").value;

    const house = {
    location,
    rent,
    description,
    createdAt: new Date(),
    userId: user.uid,
    userEmail: user.email
};

    db.collection("houses")
      .add(house)
      .then(() => {
        alert("House posted successfully!");
        form.reset();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        alert("Something went wrong. Try again.");
      });
  });
}

// ==============================
// LISTINGS PAGE
// ==============================
const listingsContainer = document.getElementById("listings");

if (listingsContainer) {
  db.collection("houses")
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      listingsContainer.innerHTML = "";

      if (snapshot.empty) {
        listingsContainer.innerHTML = "<p>No houses posted yet.</p>";
        return;
      }

      snapshot.forEach((doc) => {
        const house = doc.data();

        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
          <h3>${house.location}</h3>
          <p><strong>Rent:</strong> BTN ${house.rent}</p>
          <p><small>Posted by: ${house.userEmail}</small></p>
        `;

        listingsContainer.appendChild(div);
      });
    });
}
// ==============================
// AUTHENTICATION
// ==============================
const authForm = document.getElementById("authForm");

if (authForm) {
  authForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("authMessage");

    // Try login first
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        message.innerText = "Logged in successfully!";
        message.style.color = "green";
      })
      .catch(() => {
        // If login fails, create account
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => {
            message.innerText = "Account created & logged in!";
            message.style.color = "green";
          })
          .catch((error) => {
            message.innerText = error.message;
            message.style.color = "red";
          });
      });
  });
}

