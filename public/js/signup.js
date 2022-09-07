const signupHandler = async (e) => {
  e.preventDefault();

  const username = document.querySelector("#nameSign").value.trim();
  const email = document.querySelector("#emailSign").value.trim();
  const password = document.querySelector("#passSign").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector(".signupForm").addEventListener("submit", signupHandler);
