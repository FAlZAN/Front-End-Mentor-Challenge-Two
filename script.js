const container = document.querySelector(".container");
const mobileCommentTemplate = document.querySelector(
  ".mobile-comment-template"
);
const mobileReplyTemplate = document.querySelector(".mobile-reply-template");
const commentField = document.querySelector(".comment-field");
const sendBtn = document.querySelector(".send");

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    //all comments
    const comments = data.comments;

    comments.forEach((comment) => {
      const mobileCommentTemplateClone =
        mobileCommentTemplate.content.cloneNode(true).children[0];

      let userAvatar =
        mobileCommentTemplateClone.querySelector(".user-avatar img");
      userAvatar.src = comment.user.image.webp;

      let userName = mobileCommentTemplateClone.querySelector(".user-name");
      userName.textContent = comment.user.username;

      //you tag enable
      if (userName.innerText === "juliusomo") {
        userName.nextElementSibling.classList.remove("hide");
      }

      let createdAt = mobileCommentTemplateClone.querySelector(".createdAt");
      createdAt.textContent = comment.createdAt;

      let commentContent = mobileCommentTemplateClone.querySelector(".comment");
      commentContent.textContent = comment.content;

      let score = mobileCommentTemplateClone.querySelector(".score-count");
      score.textContent = comment.score;

      container.appendChild(mobileCommentTemplateClone);

      // Replies on existing comment
      const replies = comment.replies;
      replies.forEach((reply) => {
        const mobileReplyTemplateClone =
          mobileReplyTemplate.content.cloneNode(true).children[0];

        let userAvatar =
          mobileReplyTemplateClone.querySelector(".user-avatar img");
        userAvatar.src = reply.user.image.webp;

        let userName = mobileReplyTemplateClone.querySelector(".user-name");
        userName.textContent = reply.user.username;

        //you tag enable
        if (userName.innerText === "juliusomo") {
          //mobile section
          userName.parentNode.parentNode.lastElementChild.lastElementChild.remove();
          userName.nextElementSibling.classList.remove("hide");
          userName.parentNode.parentNode.lastElementChild.firstElementChild.nextElementSibling.classList.remove(
            "hide"
          );

          //desktop section
          userName.parentNode.lastElementChild.remove();
          console.log(
            userName.parentNode.childNodes[9].classList.remove("hide")
          );
        }

        let createdAt = mobileReplyTemplateClone.querySelector(".createdAt");
        createdAt.textContent = reply.createdAt;

        let commentContent = mobileReplyTemplateClone.querySelector(".comment");
        commentContent.textContent = reply.content;

        let score = mobileReplyTemplateClone.querySelector(".score-count");
        score.textContent = reply.score;

        container.appendChild(mobileReplyTemplateClone);
      });
    });
  });
