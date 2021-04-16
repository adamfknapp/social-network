
document.addEventListener('DOMContentLoaded', function() {
    //start new post
    document.querySelector('#postBtn').addEventListener('click', () => postOnClick());

    //get posts data
    document.querySelector('#getPostBtn').addEventListener('click', () => getPosts());


    //submit new post
    document.querySelector('#sendNewPost').addEventListener('click', () => sendNewPost());
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
    //
    //To do: if success: (1) clear input box, (2) close modal
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

function getPosts() {
    const filter = 'all_posts';
    const page_num = 2;
    fetch(`Post/${filter}/${page_num}/`)
    .then(response => response.json())
    .then(data => console.log(data));
} 