const newComment = async (e) => {
  e.preventDefault();

  const commentInput = document.querySelector("#commentInput").value.trim();
  const currentPost = window.location.pathname.split("/")[2];

  if (commentInput) {
    const response = await fetch("/api/comments", {
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

const deleteComment = async (e) => {
  if (e.target.hasAttribute("data-id")) {
    const id = e.target.getAttribute("data-id");

    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      location.reload();
    } else {
      alert("Failed to delete comment");
    }
  }
};

document.querySelector("#commentForm").addEventListener("submit", newComment);

document
  .querySelector("#commentDelete")
  .addEventListener("click", deleteComment);
