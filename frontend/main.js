const paragraph = document.getElementById("mainParagraph");
const userForm = document.getElementById("testForm");
const serverURL = "http://192.168.31.180:8000";

fetch(serverURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const textToShow = `Request Successful, message: ${data.message}`;
    paragraph.innerText = textToShow;
  })
  .catch((error) => {
    const textToShow = `Request Unsuccessful, message: ${error}`;
    paragraph.innerText = textToShow;
    console.error("Error:", error);
  });

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const { email, firstName, lastName, age } = Object.fromEntries(formData);
  console.table({ email, firstName, lastName, age });

  const dataToSend = {
    useremail: email,
    userfirst: firstName,
    userlast: lastName,
    userage: age,
  };

  console.log(dataToSend);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  };

  try {
    const response = await fetch(serverURL, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const result = `Data Sent successfully - Response: ${data.message} - name: ${data.name}`;
    document.getElementById("submitResult").textContent = result;
  } catch (error) {
    console.error("Error:", error);
  }
  userForm.reset();
});

document.getElementById("fetchUser").addEventListener("click", fetchUser);
async function fetchUser() {
  const response = await fetch(`${serverURL}/users`)
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data =  response;
  console.log(data);
}
