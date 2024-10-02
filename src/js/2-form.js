let formData = { email: "", message: "" };
const form = document.querySelector(".feedback-form");
const STORAGE_KEY = "feedback-form-state";

fillFromLocalStorage(form);

form.addEventListener("input", handleFormInput);
form.addEventListener("submit", handleFormSubmit);

function fillFromLocalStorage(form) {
  let hasDataInLocalStorage = JSON.parse(
    localStorage.getItem(STORAGE_KEY, JSON.stringify(formData)),
  );

  if (hasDataInLocalStorage === null) {
    return;
  } else if (hasDataInLocalStorage.message || hasDataInLocalStorage.email) {
    for (const key in hasDataInLocalStorage) {
      form.elements[key].value = hasDataInLocalStorage[key];
      formData[key] = hasDataInLocalStorage[key];
    }
  }
}

function handleFormInput(evt) {
  const { name, value } = evt.target;

  if (name in formData) {
    formData[name] = value.trim();
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  const { email, message } = evt.target.elements;

  if (!email.value.trim() || !message.value.trim()) {
    alert("Please fill out all fields.");
    return;
  }

  console.log(localStorage.getItem(STORAGE_KEY, JSON.stringify(formData)));

  localStorage.removeItem(STORAGE_KEY);
  form.reset();

  for (const key in formData) {
    formData[key] = "";
  }
}
