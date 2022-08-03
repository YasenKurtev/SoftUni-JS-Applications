function solution() {

    let mainSection = document.getElementById('main');

    let url = 'http://localhost:3030/jsonstore/advanced/articles/list';

    fetch(url)
        .then(res => res.json())
        .then(data => {
            for (let item of data) {
                let id = item[Object.keys(item)[0]];
                console.log(id);

                let url2 = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

                fetch(url2)
                    .then(res => res.json())
                    .then(data => {
                        let newDiv1 = document.createElement('div');
                        newDiv1.classList.add('accordion');
                        let newDiv2 = document.createElement('div');
                        newDiv2.classList.add('head');
                        let newSpan = document.createElement('span');
                        newSpan.textContent = data['title'];
                        let newBtn = document.createElement('button');
                        newBtn.classList.add('button');
                        newBtn.id = data['_id'];
                        newBtn.textContent = 'MORE';
                        let newDiv3 = document.createElement('div');
                        newDiv3.classList.add('extra');
                        newDiv3.style.display = 'none';
                        let newP = document.createElement('p');
                        newP.textContent = data['content'];
                        newBtn.addEventListener('click', ev => {
                            let parent = ev.target.parentElement.parentElement;
                            let hiddenDiv = parent.getElementsByTagName('div')[1];
                            if (newBtn.textContent === 'MORE') {
                                hiddenDiv.style.display = 'block';
                                newBtn.textContent = 'LESS';
                            } else if (newBtn.textContent === 'LESS') {
                                hiddenDiv.style.display = 'none';
                                newBtn.textContent = 'MORE';
                            }
                        })
                        newDiv2.appendChild(newSpan);
                        newDiv2.appendChild(newBtn);
                        newDiv3.appendChild(newP);
                        newDiv1.appendChild(newDiv2);
                        newDiv1.appendChild(newDiv3);
                        mainSection.appendChild(newDiv1);
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));

}

solution();