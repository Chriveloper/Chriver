// Get a reference to the comment form in your HTML
const commentForm = document.getElementById('comment-form');

// Remove the const keyword from database to make it a global variable
// Add a comment to the Firebase Realtime Database
async function addComment(comment) {
  try {
    const commentsRef = window.firebaseRef(window.database, 'comments');
    const newCommentRef = window.firebasePush(commentsRef);
    await window.firebaseSet(newCommentRef, comment);

    // Get the key of the newly added comment
    const commentKey = newCommentRef.key;



  } catch (error) {
    console.error(error);
    // Handle the error gracefully (e.g. show an error message to the user)
  }
}

// Add an event listener to the form submit event
commentForm.addEventListener('submit', async (event) => {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get the value of the comment input field
  const commentInput = document.getElementById('comment-input');
  const comment = commentInput.value;

  // Call the addComment() function to add the comment to the Firebase Realtime Database
  await addComment(comment);

  // Clear the comment input field
  commentInput.value = '';
});

// Get a reference to the comments container in your HTML
const commentsContainer = document.getElementById('comments-container');

// Listen for changes to the comments in the Firebase Realtime Database
const commentsRef = window.firebaseRef(window.database, 'comments');
window.firebaseOnValue(commentsRef, (snapshot) => {
  // Get the comments data from the snapshot
  const comments = snapshot.val();

  // Reverse the order of the comments to display the latest message at the top
  const reversedComments = Object.values(comments).reverse();

  // Create an empty string to store the comments HTML
  let commentsHTML = '';

  // Loop through the comments and add them to the comments HTML
  for (const commentKey in reversedComments) {
    const comment = reversedComments[commentKey];
    
      commentsHTML += `<div class="comment">${comment}</div>`;
  
  }

  // Set the comments container's innerHTML to the comments HTML
  commentsContainer.innerHTML = commentsHTML;
});