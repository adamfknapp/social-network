
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
    fetch('/Post/user_only')
      //.then(response => response.json())
      //.then(data => {  
      //    console.log(Object.values(data))   
     // })
      //.catch(err => alert(err))
    }
    
// function add_post_to_view(posts){
//         //
//         // Create a row to be added to view
//         //
//         const row = document.createElement('div');
//         row.classList.add('email-entry');
        
      
//         if (email.read === true) {
//           row.classList.add('email-read');
//       }
      
//         row.innerHTML = `${email.id} <span class='email-sender'>${email.sender}</span>  <span class='email-subject'>${email.subject}</span>  <span class='email-timestamp'>${email.timestamp}</span>`;
      
//         //On email click
//         row.addEventListener('click', function() {
//           // get the current mailbox name
//           const current_mailbox = document.querySelector('h3').innerHTML
//           single_email_view(email.id, current_mailbox);  
//         });
      
//         document.querySelector('#emails-view').append(row);
//       }