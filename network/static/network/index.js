
document.addEventListener('DOMContentLoaded', function() {
    //start new post
    document.querySelector('#postBtn').addEventListener('click', () => postOnClick());

    //submit new post
    document.querySelector('#sendNewPost').addEventListener('click', () => sendNewPost());

    document.querySelector('#lnkProfile').addEventListener('click', () => {
      const author = document.querySelector('#lnkProfile').textContent  
      listPosts(`Profile: ${author}`, 'user_posts', 1, author )
      });

    document.querySelector('#lnkAllPosts').addEventListener('click', () => listPosts('All Posts', 'all_posts', 1));
  
    document.querySelector('#lnkFollowing').addEventListener('click', () => listPosts('Following', 'following_only', 1));

   
  
  });


function postOnClick() {
    //     
    // Handle event when post button is clicked
    // also handle closing modal or navigating away
    // 

    const modal = document.getElementById("newPostModal");
    const span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
        }

    window.onclick = function(event) {
        if (event.target == modal) {
         modal.style.display = "none";
        }
      }
}


function sendNewPost() {
    //
    // Handle a user clicking the new post button
    //To do: (1) clear input box, (2) close modal
    //

    //grab the body
    const content = document.querySelector('#postContent').value;
    
    //Check if it is blank
    var completePost = true;
    if (content.length === 0) {
        completePost = false;
        alert('What say you?');
        } 
   
    //submit post
    if (completePost) {
        fetch('/Post', {
        method: 'POST', 
        body: JSON.stringify({
            content: content
            })
        })
        .then(response => response.json())
        .then(data => {     
            alert(Object.values(data))
        })
        .catch(err => alert(err))
        } 
      
    }


function listPosts(headline, filter, page_num, author) {
  //
  // List all posts on page
  //

  //clear data on the page
  document.querySelector('#posts-view').innerHTML = ``;

  //set page heading
  document.querySelector('#pageHeader').innerHTML = `<h1>${headline}</h1>`;
  
  // Get the data
  fetch(`Post/${filter}/${page_num}/${author}/`)
    .then(response => response.json())
    .then(data => {
      //console.log(data['objects']);
      data['objects'].forEach(posts2view);
    })
} 

function posts2view(post){
  //
  // create a new row in the view for each post
  //  
  const row = document.createElement('div');
  row.classList.add('post-entry');

  row.innerHTML = `<span id='lnkPostProfile' class='postAuthor'> ${post.author}</span> <span class='postContent'> ${post.content}</span> <span class='postLikes'>${post.likes}</span> <span class='postCrt_dt'>${post.crt_dt}</span>`;

  //On profile click get profile by name
  row.addEventListener('click', function() {
      listPosts(`Profile: ${post.author}`, 'user_posts', 1, `${post.author}` ); 
      });

 
  document.querySelector('#posts-view').append(row);
}
