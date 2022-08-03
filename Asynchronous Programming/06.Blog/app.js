function attachEvents() {

    let loadBtn = document.getElementById('btnLoadPosts');
    let selectMenu = document.getElementById('posts');
    let viewBtn = document.getElementById('btnViewPost');
    let postTitle = document.getElementById('post-title');
    let postBody = document.getElementById('post-body');
    let postComments = document.getElementById('post-comments');
    let postsData;

    loadBtn.addEventListener('click', ev => {
        let url = 'http://localhost:3030/jsonstore/blog/posts';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                postsData = data;
                for (let key of Object.keys(data)) {
                    let newOption = document.createElement('option');
                    newOption.value = key;
                    newOption.textContent = data[key]['title'];
                    selectMenu.appendChild(newOption);
                }
            })
            .catch(err => console.log(err));
    })

    viewBtn.addEventListener('click', ev => {
        let id = selectMenu.value;
        let url = `http://localhost:3030/jsonstore/blog/comments/`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                postTitle.textContent = postsData[id]['title'];
                postBody.textContent = postsData[id]['body'];
                let comments = Object.values(data).filter(obj => obj['postId'] === id);
                postComments.innerHTML = '';
                for (let item of comments) {
                    let newLi = document.createElement('li');
                    newLi.id = item['id'];
                    newLi.textContent = item['text'];
                    postComments.appendChild(newLi);
                }
            })
            .catch(err => console.log(err));
    })

}

attachEvents();