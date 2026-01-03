
  const firebaseConfig = {
    apiKey: "AIzaSyCip7LHn4xv45pZOIhj1AW1V5fu4p7RQwY",
    authDomain: "bhutan-rental.firebaseapp.com",
    projectId: "bhutan-rental",
    storageBucket: "bhutan-rental.firebasestorage.app",
    messagingSenderId: "259342389102",
    appId: "1:259342389102:web:a61f6c607464c408c7fb7f"
 };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

// Handle post house form
const form = document.getElementById("postForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const location = document.getElementById("location").value;
    const rent = document.getElementById("rent").value;
    const description = document.getElementById("description").value;

    const house = {
      location,
      rent,
      description,
    };

    let houses = JSON.parse(localStorage.getItem("houses")) || [];
    houses.push(house);
    localStorage.setItem("houses", JSON.stringify(houses));

    alert("House posted successfully!");

    form.reset();
  });
}

// Display house listings
const listingsContainer = document.getElementById("listings");

if (listingsContainer) {
  const houses = JSON.parse(localStorage.getItem("houses")) || [];

  if (houses.length === 0) {
    listingsContainer.innerHTML = "<p>No houses posted yet.</p>";
  } else {
    houses.forEach((house) => {
      const div = document.createElement("div");
      div.style.background = "#fff";
      div.style.padding = "15px";
      div.style.marginBottom = "10px";

      div.innerHTML = `
        <h3>${house.location}</h3>
        <p><strong>Rent:</strong> BTN ${house.rent}</p>
        <p>${house.description}</p>
      `;

      listingsContainer.appendChild(div);
    });
  }
}
