// import { without } from '../lodash';
// console.log(without);

var _ = require('lodash');
console.log(_);

var array = [1,2,3,4,5,6,7];
console.log('Answer', _.without(array, 3));

var database = [
    {
    user: "Dikla",
    pass: 1234,
    status: function(){
        document.querySelector("#id_button").setAttribute("href", "./Profile/lior-profile-page.html");
        }
    },
    {
    user: "Lior",
    pass: 1996,
    status: function(){
        document.querySelector("#id_button").setAttribute("href", "./Profile/lior-profile-page.html");
        }
    },
    {
    user: "David",
    pass: 4007,
    status: function(){
        document.querySelector("#id_button").setAttribute("href", "./Profile/lior-profile-page.html");
        }
    },
];

var button = document.querySelector('#id_button');

button.addEventListener('click', check);

function check(){

    var name = document.querySelector("#id_user").value;
    var password = document.querySelector("#id_pass").value;

    var faceLength = database.length;
    
    for (var i = 0 ; i <= faceLength ; i++ ){
        if(String(name) === database[i].user && Number(password) === database[i].pass){
            database[i].status();
            return true;
        }
        else {
            document.querySelector(".status").innerHTML = "*Sorry, wrong username and password!";
            document.querySelector(".status").classList.add("wrong");
        }
    }
    return false;
}
