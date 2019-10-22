let filterInput = document.getElementById('filterInput');

        // var queryString = decodeURIComponent(window.location.search);
        // queryString = queryString.substring(1);
        // var queries = queryString.split("&");
        // for (var i = 0; i < queries.length; i++)
        // {
        // console.log(queries[i] + "<br>");
        // }

        filterInput.addEventListener('keyup', filterNames);

        function filterNames(){
            let filterValue = document.getElementById('filterInput').value.toUpperCase();

            let ul = document.getElementById('names');
            let li = ul.querySelectorAll('li.collection-item');

            for(let i=0 ; i < li.length; i++){
                let a = li[i].getElementsByTagName('a')[0];

                if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1){
                    li[i].style.display = '';
                }else{
                    li[i].style.display = 'none';
                }
            }
        }


        function handleCreateButtonPress() {
            let name = document.querySelector('#nameInput').value;
            let phone = document.querySelector('#phoneInput').value;
            createContacts(phone, name);

        }

        function createContacts(number, name) {
            let firstLetter = name[0]
            let newLi = document.createElement("li");
            newLi.className = "collection-item";
            newLi.innerHTML += `<a href="#" onclick="alert('${number}')">${name}</a>`;

            let elParent = document.querySelector(`[data-first-letter="${firstLetter}"]`)
            if(!elParent) elParent = createDivWithLetter(firstLetter)
            
            elParent.appendChild(newLi);
        }

        function createDivWithLetter(letter) {
            let div = document.createElement('div');
            div.setAttribute('data-first-letter', letter)

            div.innerHTML = `
            <li class="collection-header">
            <h5>${letter}</h5>
            </li>`

            let divCard = document.createElement('div');
            divCard.className = "card col-3";

            let ul = document.querySelector('#names');
            ul.appendChild(divCard);

            divCard.appendChild(div);

            return div
        }