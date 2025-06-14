function loadContent(file, title) {
  fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error("Error : " + response.status);
      return response.text();
    })
    .then((data) => {
      document.getElementById("content").innerHTML = data;
      document.getElementById("main-title").innerText = title;
      document.getElementById("page-position").innerText = title;
    })
    .catch((error) => {
      console.error("Error loading component:", error);
    });
}

window.onload(loadContent("dashboard.html", "Dashboard"));
