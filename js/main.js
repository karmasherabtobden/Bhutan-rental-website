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
