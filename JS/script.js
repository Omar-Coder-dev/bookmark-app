var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var tBody = document.getElementById("tBody");
var alertBox = document.getElementById("alertBox");

var sites;
if (localStorage.getItem("bookmarks")) {
  sites = JSON.parse(localStorage.getItem("bookmarks"));
} else {
  sites = [];
}
displaySites();

function isValidURL(url) {
  var pattern = /^https?:\/\/(www\.)?[\w-]+\.[a-z]{2,}(\/[\w-./?%&=]*)?$/i;
  return pattern.test(url);
}

function validateSiteName() {
  var name = siteNameInput.value.trim();
  handleValidation(siteNameInput, name !== "");
}

function validateSiteURL() {
  var url = siteURLInput.value.trim();
  handleValidation(siteURLInput, isValidURL(url));
}

function addSite() {
  var name = siteNameInput.value.trim();
  var url = siteURLInput.value.trim();

  var isNameValid = name !== "";
  var isUrlValid = isValidURL(url);

  handleValidation(siteNameInput, isNameValid);
  handleValidation(siteURLInput, isUrlValid);

  if (!isNameValid || !isUrlValid) {
    showAlert("❗ Please enter a valid name and a full URL like https://www.example.com");
    return;
  }

  sites.push({ name: name, url: url });
  localStorage.setItem("bookmarks", JSON.stringify(sites));
  displaySites();
  clearForm();
}

function handleValidation(input, isValid) {
  var icon = input.nextElementSibling.nextElementSibling;
  if (isValid) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    icon.className = "status-icon fa-solid fa-circle-check text-success";
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    icon.className = "status-icon fa-solid fa-circle-xmark text-danger";
  }
}

function clearForm() {
  siteNameInput.value = "";
  siteURLInput.value = "";
  resetValidation(siteNameInput);
  resetValidation(siteURLInput);
}

function resetValidation(input) {
  input.classList.remove("is-valid", "is-invalid");
  var icon = input.nextElementSibling.nextElementSibling;
  icon.className = "status-icon";
}

function showAlert(message) {
  alertBox.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show mt-3 shadow" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
}

function displaySites() {
  var rows = "";
  for (var i = 0; i < sites.length; i++) {
    rows += `
      <tr>
        <td>${i + 1}</td>
        <td class="fw-semibold text-info">${sites[i].name}</td>
        <td>
          <a href="${sites[i].url}" target="_blank" class="btn btn-success btn-sm px-3 rounded-pill shadow-sm">
            <i class="fa-solid fa-arrow-up-right-from-square me-1"></i> Visit
          </a>
        </td>
        <td>
          <button onclick="deleteSite(${i})" class="btn btn-danger btn-sm px-3 rounded-pill shadow-sm">
            <i class="fa-solid fa-trash me-1"></i> Delete
          </button>
        </td>
      </tr>
    `;
  }
  tBody.innerHTML = rows;
}

function deleteSite(index) {
  sites.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(sites));
  displaySites();
}
