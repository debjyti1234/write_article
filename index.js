let authors = document.getElementById("author_details");


fetch(`https://gorest.co.in/public/v2/users`,
  {
    method: "GET",
    headers: { 'Authorization': 'Bearer b2fa90a661beea72b6fa3398287516df9479220814f517acfd9a3e5012ba01ae' },
  })
  .then(response => response.json())
  .then(data => {
    updateauthorList(data);
  })

  .catch(error => {
    console.error('Error:', error);
  });

function updateauthorList(data) {
  //    console.log(data);
  let author_list = data.length;
  console.log(author_list);



  // loop for get grid value
  for (let i = 0; i < author_list; i++) {
    // console.log("deb");

    let grid_element = document.createElement("div");
    grid_element.classList.add("grid-item");
    grid_element.classList.add("get_article_class");

    let author_name = data[i].name;
    let author_email = data[i].email;
    let author_gender = data[i].gender;
    let author_status = data[i].status;

    grid_element.innerHTML = `
        <h3>${author_name}</h3>
        <p>${author_email}</p>
        <div class="row">
            <div class="col-6">Gender:${author_gender}</div>
            <div class="col-6">Status:${author_status}</div>
        </div>`;
    authors.appendChild(grid_element);

  }






// get individual authors article list
for (let i = 0; i < author_list; i++) {
  document.querySelectorAll(".grid-item")[i].addEventListener("click", (e) => {
    e.preventDefault();
    console.log(data[i].id);

    let autherArticleId = data[i].id;
    


  

// call indivudial authors article list

fetch(`https://gorest.co.in/public/v2/users/${autherArticleId}/posts`,
  {
    method: "GET",
    headers: { 'Authorization': 'Bearer b2fa90a661beea72b6fa3398287516df9479220814f517acfd9a3e5012ba01ae' },
  })
  .then(response => response.json())
  .then(data2 => {
    updateauthorListAuthersarticle(data2);
  })

  .catch(error => {
    console.error('Error:', error);
  });

function updateauthorListAuthersarticle(data) {
  //    console.log(data);
  let author_list = data.length;
  for(let i=0; i<author_list; i++){

  }
  let datalist = data;
  // let artTitle = data[1].title;
  // let artBody = data[0].body;
  console.log(author_list);
  // console.log(artTitle);
  // console.log(data[0].title);
  // console.log(data[0].body);
  // console.log(data[1].body);
  // console.log(artBody);
  // console.log(data[0].id);


// call model for authors articles
articleModel(author_list,datalist);

// document.getElementById("authors_articles").modal('show');
let myModal = new bootstrap.Modal(document.getElementById("authors_articles"), {});
myModal.show();

// show authors articles list by popup window
// var m1 = articleModel(author_list,datalist); // I would want to skip creating an HTML element with jQuery.
  // document.body.insertAdjacentHTML('beforeend', m1);
  // m1.modal('show');






}



});
}
}


function articleModel(lengthit,datalist){
  let grid_element = document.createElement("div");
  grid_element.classList.add("articleMiniList");
  

  for(let i=0; i<lengthit; i++){
    console.log("kii");
    let grid_item = document.createElement("div");
    grid_item.classList.add("articleMiniList2");
    console.log(datalist[i].title);
    console.log(datalist[i].body);

    grid_item.innerHTML = `
        <h3>${datalist[i].title}</h3>
        <p>${datalist[i].body}</p>
        `;
        grid_element.appendChild(grid_item);
  }

  // document.getElementById("check").innerHTML = grid_element.innerHTML;
  // return grid_element.innerHTML;

  // model for show authors article list
  document.getElementById("authors_articles").innerHTML = `
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
     
      <div class="modal-body">
        ${grid_element.innerHTML}
      </div>
      
  </div>`;



  

  
}







// create authors post request

document.querySelector("#add_author").addEventListener("click", (e) => {
  e.preventDefault();


  let gender = document.querySelector('input[name="gender"]:checked').value;
  let active = document.querySelector('#status').checked;

  // console.log(gender);
  // console.log(active);

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    status: active == true ? "active" : "inactive",
    gender: gender
  };
  fetch(`https://gorest.co.in/public/v2/users`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer b2fa90a661beea72b6fa3398287516df9479220814f517acfd9a3e5012ba01ae'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      // Handle the response from the server
      let grid_element = document.createElement("div");
      grid_element.classList.add("grid-item");

      // console.log("aaaaaaaaaaa");
      // console.log(result);

      grid_element.innerHTML = `
        <h3>${result.name}</h3>
        <p>${result.email}</p>
        <div class="row">
            <div class="col-6">Gender:${result.gender}</div>
            <div class="col-6">Status:${result.status}</div>
        </div>`;
      authors.insertBefore(grid_element, authors.firstChild);
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    });
});

