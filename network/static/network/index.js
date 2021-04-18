
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
          document.querySelector('#postContent').value ='';
          document.getElementById("newPostModal").style.display = "none";
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
      //add follower information if a profile page
      if(document.querySelector('#pageHeader').innerText.includes('Profile')){
        followers(data);
        }
      data['objects'].forEach(posts2view);
      pagination_buttons(data);
    })
} 

function followers(data){
    //add follower data if profile
    console.log(data)
      const row = document.createElement('div');
      row.classList.add('follower-data');
      row.innerHTML = `<span class='follower_data'>Following: ${data['num_following']} | Followers: ${data['num_followers']}</span>`
      document.querySelector('#posts-view').append(row);
    };


function pagination_buttons(data){
    
    //Define buttons
    const nxt_pg_btn = document.createElement('button'); 
    nxt_pg_btn.id = 'btnNxtPage';
    nxt_pg_btn.innerHTML='Next >';

    const prv_pg_btn = document.createElement('button'); 
    prv_pg_btn.id = 'btnPrvPage';
    prv_pg_btn.innerHTML='< Prev';

    // Add event listeners
    // to incriment the page number
    nxt_pg_btn.addEventListener('click', () => change_page(data, 1));
    prv_pg_btn.addEventListener('click', () => change_page(data,-1));

    // Disable buttons if needed
    nxt_pg_btn.disabled=false;
    if (data['has_next']===false){
      nxt_pg_btn.disabled=true;
    }

    prv_pg_btn.disabled=false;
    if (data['has_prev']===false){
      prv_pg_btn.disabled=true;
    }

    // Add buttons to screen
    document.querySelector('#posts-view').append(prv_pg_btn);
    document.querySelector('#posts-view').append(nxt_pg_btn);
}

function change_page(data, inc){
    //get headline
    const headline = document.querySelector('#pageHeader').innerText; 
    listPosts(headline, data['filter'], data['cur_page']+inc,
                `${data['author']}` ); 
}

function posts2view(post){
  //
  // create a new row in the view for each post
  //  
  const row = document.createElement('div');
  row.classList.add('post-entry');

  row.innerHTML = `<span id='lnkPostProfile' class='postAuthor'> ${post.author}</span> <span class='postContent'> ${post.content}</span> <span class='postLikes'>Likes: ${post.likes}</span> <span class='postCrt_dt'>Created: ${post.crt_dt}</span>`;

  //On profile click get profile by name
  row.addEventListener('click', function() {
      listPosts(`Profile: ${post.author}`, 'user_posts', 1, `${post.author}` ); 
      });

 
  document.querySelector('#posts-view').append(row);
}
