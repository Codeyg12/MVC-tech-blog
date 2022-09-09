const newComment = async (e) => {
  e.preventDefault();

  const content = document.querySelector("#commentInput").value.trim();
  const post_id = window.location.pathname.split("/")[2];

  if (content) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ content, post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      location.reload()
    } else {
      alert(response.statusText);
    }
  }
};

const deleteComment = async (e) => {
  if (e.target.hasAttribute('data-id')) {
      const id = e.target.getAttribute('data-id');

      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
  console.log(response)
      if (response.ok) {
        location.reload()
      } else {
        alert(response.statusText);
      }
    }
};

document.querySelector("#commentForm").addEventListener("submit", newComment);

document
  .querySelector("#commentDelete")
  .addEventListener("click", deleteComment);
