const loginHandler = async (e) => {
  e.preventDefault();

  const email = document.querySelector("#emailLog").value.trim();
  const password = document.querySelector("#passLog").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
     location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};


document.querySelector(".loginForm").addEventListener("submit", loginHandler);
