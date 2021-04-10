
document.addEventListener('DOMContentLoaded', function() {
    //start new post
    document.querySelector('#postBtn').addEventListener('click', () => postOnClick());

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

    //grab the body
    const content = document.querySelector('#postContent').value;
    
    //Check if it is blank
    var completePost = true;
    if (content.length === 0) {
        completePost = false;
        alert('What say you?');
        } 
    console.log(completePost);
    console.log(content.length)
   
    //submit post
    if (completePost) {
        fetch('/newPost', {
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
