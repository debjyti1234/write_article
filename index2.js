// alert("i am here");
let add_article = document.getElementById("add_article_details");

//   get list of authors name
fetch(`https://gorest.co.in/public/v2/users`,
    {
        method: "GET",
        headers: { 'Authorization': 'Bearer b2fa90a661beea72b6fa3398287516df9479220814f517acfd9a3e5012ba01ae' },
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        updateauthorLista(data);
    })

    .catch(error => {
        // console.log("catch")
        console.error('Error:', error);
    });

 function updateauthorLista(data) {
    // console.log("yes i'm here");
    // console.log(data);
    let author_list = data.length;
    // console.log(author_list);
    var author_names = [];
    var auther_id = [];

    // console.log("hiiighjh");

    for (let i = 0; i < author_list; i++) {

        author_names.push(data[i].name);
        auther_id.push(data[i].id);

    }
    // console.log(author_names);
    // console.log(auther_id);
    var select = document.getElementById("select_author");


    for (var i = 0; i < author_names.length; i++) {
        var val = auther_id[i]
        var opt = author_names[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = val;
       select.appendChild(el);
    }

 }



//   create article post request

document.querySelector("#create_article_list").addEventListener("click", (e) => {
    e.preventDefault();

    var select_author_value = document.getElementById("select_author");
    var user_a = select_author_value.options[select_author_value.selectedIndex].value;
    var user_name = select_author_value.options[select_author_value.selectedIndex].text;

    console.log(select_author_value);
    console.log(user_a);
    console.log(user_name);


    const data1 = {
        user_id: user_a,
        title: document.getElementById("title2").value,
        body: document.getElementById("article_body2").value,
    };

    console.log(data1);
    // console.log(body);


    fetch(`https://gorest.co.in/public/v2/users/${user_a}/posts`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer b2fa90a661beea72b6fa3398287516df9479220814f517acfd9a3e5012ba01ae'
            },
            body: JSON.stringify(data1)
        })
        .then(response => response.json())
        .then(result => {
            // Handle the response from the server
            let grid_element = document.createElement("div");
            grid_element.classList.add("grid-item");



            // console.log("bbbbbbbb");
            // console.log(result);


            grid_element.innerHTML = `
        <h3>${result.title}</h3>
        <p>${result.body}</p>
        `;
            // add_article.appendChild(grid_element);
            add_article.insertBefore(grid_element, add_article.firstChild);

        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });
});


// get all articles
var all_article = document.getElementById("add_article_details")
fetch(`https://gorest.co.in/public/v2/posts`,
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
    // console.log(author_list);



    // loop for get grid value
    for (let i = 0; i < author_list; i++) {
        // console.log("deb");

        let grid_element = document.createElement("div");
        grid_element.classList.add("grid-item");

        let author_title = data[i].title;
        let author_body = data[i].body;


        grid_element.innerHTML = `
        <h3>${author_title}</h3>
        <p>${author_body}</p>
        `;
        // all_article.appendChild(grid_element);
        all_article.insertBefore(grid_element, all_article.lastChild);

    }
}



