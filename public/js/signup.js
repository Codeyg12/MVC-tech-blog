const signupHandler = async (e) => {
  e.preventDefault();

  // Grabs inputted info from the sign up page
  const username = document.querySelector("#nameSign").value.trim();
  const email = document.querySelector("#emailSign").value.trim();
  const password = document.querySelector("#passSign").value.trim();

  if (username && email && password) {
    // Sends POST request to API
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    // If everything checks out sends you to the dashboard
    if (response.ok) {
      location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector(".signupForm").addEventListener("submit", signupHandler);
