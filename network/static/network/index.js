
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#myBtn').addEventListener('click', () => postOnClick());
  });


function postOnClick() {
    //     
    // Handle event when post button is clicked
    // also handle closing modal or navigating away
    // 
    const modal = document.getElementById("myModal");
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
