var newInputname = document.querySelector("#id_inputname");
var newInput = document.querySelector("#id_input");
var button = document.querySelector("#id_button");
var ul = document.querySelector("ol");


window.onload = function(){
    createElement();
}

function withMouse(){
    if(inputLength() > 0){

        var dataReview = {
            name: newInputname.value,
            massage: newInput.value
        }

            // Test if reviews is null
        if(localStorage.getItem('reviews') === null){
            // Init array
            var reviews = [];
            // Add to array
            reviews.push(dataReview);
            // Set to localStorage
            localStorage.setItem('reviews', JSON.stringify(reviews));
            } else {
            // Get reviews from localStorage
            var reviews = JSON.parse(localStorage.getItem('reviews'));
            // Add bookmark to array
            reviews.push(dataReview);
            // Re-set back to localStorage
            localStorage.setItem('reviews', JSON.stringify(reviews));
        }
    }
    // אורך התווים באינפוט
        function inputLength(){
        return newInput.value.length;
        }
        
        createElement();
        console.log(localStorage.reviews);

}

function createElement(){

    // Get bookmarks from localStorage
     var reviews = JSON.parse(localStorage.getItem('reviews'));

    for(var i = 0; i < reviews.length; i++){
        var name = reviews[i].name;
        var massage = reviews[i].massage;

        var newli = document.createElement("li");
        newli.setAttribute('class' , 'newli card');
        newli.innerHTML += "<h3 style='font-weight:bold;' class='col-9' id='id_name'>"+name+"</h3>";
        newli.innerHTML += "<h6 class='col-9' id='id_massage'>"+massage+"</h6>";
        // newli.appendChild(document.createTextNode(newInput));

        var btn = document.createElement("button");
        btn.innerHTML += 'מחק תגובה';
        btn.setAttribute('class' , 'btn btnX col-3');
        
        ul.appendChild(newli);
        newli.appendChild(btn);
        newInput.value = "";
        newInputname.value = "";
    }
        
        function delItem() {
            // newli.remove();
            
            // Get bookmarks from localStorage
            var reviews = JSON.parse(localStorage.getItem('reviews'));
            // Loop through the bookmarks
            for(var i =0;i < reviews.length;i++){
                if(reviews[i].name == name){
                // Remove from array
                reviews.splice(i, 1);
                }
            }
            // Re-set back to localStorage
            localStorage.setItem('reviews', JSON.stringify(reviews));

        }
    

        if(checkLis() === 0) {
            var emptyList = document.querySelector('h2');
            emptyList.style.display = "block";
        }

        if(checkLis()> 0) {
        var emptyList = document.querySelector('h2');
        emptyList.style.display = "none";
        }

        function checkLis(){
            return document.getElementsByTagName('li').length;
        }

        btn.addEventListener('click', delItem); 
}



function withPress(event){
    if(inputLength() > 0 && event.keyCode === 13){
        createElement();
    }
}

// newInput.addEventListener('keypress', withPress);
button.addEventListener("click", withMouse);

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