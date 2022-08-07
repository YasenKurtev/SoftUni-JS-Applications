function attachEvents() {

    let phonebook = document.getElementById('phonebook');
    let loadBtn = document.getElementById('btnLoad');
    let person = document.getElementById('person');
    let phone = document.getElementById('phone');
    let createBtn = document.getElementById('btnCreate');

    let url = 'http://localhost:3030/jsonstore/phonebook';

    loadBtn.addEventListener('click', ev => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                phonebook.innerHTML = '';
                loadPhonebook(data);
            })
            .catch(err => console.log(err));
    })

    function onDelete(ev) {
        let id = ev.target.parentElement.id;
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                ev.target.parentElement.remove();
            })
            .catch(err => console.log(err));
    }

    createBtn.addEventListener('click', ev => {
        if (person.value !== '' && phone.value !== '') {
            let personName = person.value;
            let phoneNumber = phone.value;
            let data = {
                person: personName,
                phone: phoneNumber
            };

            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {

                })
                .catch(err => console.log(err));

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    phonebook.innerHTML = '';
                    loadPhonebook(data);
                })
                .catch(err => console.log(err));

            person.value = '';
            phone.value = '';
        }
    })

    function loadPhonebook(data) {
        for (let item of Object.values(data)) {
            let newLi = document.createElement('li');
            newLi.id = item['_id'];
            newLi.textContent = `${item['person']}: ${item['phone']}`;
            let newDeleteBtn = document.createElement('button');
            newDeleteBtn.textContent = 'Delete';
            newDeleteBtn.addEventListener('click', onDelete);
            newLi.appendChild(newDeleteBtn);
            phonebook.appendChild(newLi);
        }
    }

}

attachEvents();