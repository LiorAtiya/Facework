window.onload = function(){

    fetchBookmarks();
}

// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);


// Save Bookmark
function saveBookmark(e){
  // Get form values
  var name = document.getElementById('siteName').value;
  var msg = document.getElementById('siteUrl').value;
  var stars = document.querySelector('.stars').attributes[1].value;

  var bookmark = {
    name: name,
    url: msg,
    rate: stars,
  }

  function userlength(){
    return name.length;
  }

  function msglength(){
    return msg.length;
  }

  function ratelength(){
    return stars.length;
  }

  /*
    // Local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */
  if(userlength() > 0 && msglength() > 0 && ratelength() > 0){
    // Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
      // Init array
      var bookmarks = [];
      // Add to array
      bookmarks.push(bookmark);
      // Set to localStorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
      // Get bookmarks from localStorage
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      // Add bookmark to array
      bookmarks.push(bookmark);
      // Re-set back to localStorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  }

  // Clear form
  document.getElementById('myForm').reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through the bookmarks
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks(){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    var rate = bookmarks[i].rate;

    bookmarksResults.innerHTML += '<div class="well card">'+
                                  '<h3 class="text-right col px-md-3"><strong>'+name+'<strong>'+
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger col-1 float-left p-1" href="#">מחק</a> ' +
                                  '</h3></br>'+
                                  '<h5 class="text-right pr-3">'+url+'</h5>'+
                                  `<h4 class="text-right pr-3"> ${rate}/5 ⭐<h4>`+
                                  '</div>';
  }
}

// ------------ Stars -----------------------

     //initial setup
     document.addEventListener('DOMContentLoaded', function(){
        let stars = document.querySelectorAll('.star');
        stars.forEach(function(star){
            star.addEventListener('click', setRating); 
        });
        
        let rating = parseInt(document.querySelector('.stars').getAttribute('data-rating'));
        let target = stars[rating - 1];
        target.dispatchEvent(new MouseEvent('click'));
    });
    function setRating(ev){
        let span = ev.currentTarget;
        let stars = document.querySelectorAll('.star');
        let match = false;
        let num = 0;
        stars.forEach(function(star, index){
            if(match){
                star.classList.remove('rated');
            }else{
                star.classList.add('rated');
            }
            //are we currently looking at the span that was clicked
            if(star === span){
                match = true;
                num = index + 1;
            }
        });
        document.querySelector('.stars').setAttribute('data-rating', num);
    }


