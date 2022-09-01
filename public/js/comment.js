const newComment = async (e) => {
  e.preventDefault();

  const commentInput = document.querySelector("#commentInput").value.trim();
  const currentPost = window.location.pathname.replace("/single/", "");

  if (commentInput) {
    await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        commentInput,
        currentPost,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert("Failed to post comment!");
    }
  }
};

document.querySelector("#commentForm").addEventListener("submit", newComment);
