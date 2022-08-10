// console.log('TODO:// Implement Home functionality');
function solve() {

    let classElements = Array.from(document.getElementsByClassName('active'));
    classElements.map(x => x.classList.remove('active'));
    let homeMenu = document.getElementById('home');
    homeMenu.classList.add('active');

    let catchesContainer = document.getElementById('main');
    catchesContainer.style.display = 'none';

    let addForm = document.getElementById('addForm');
    let addBtn = addForm.getElementsByTagName('button')[0];
    let loginBtn = document.getElementById('login');
    let logoutBtn = document.getElementById('logout');
    let registerBtn = document.getElementById('register');
    let loadBtn = document.querySelectorAll('button.load')[0];
    let spanName = document.getElementsByTagName('span')[0];
    let catchesDiv = document.getElementById('catches');

    loadBtn.addEventListener('click', onLoad);
    logoutBtn.addEventListener('click', onLogout);
    addForm.addEventListener('submit', onAdd);

    let username = localStorage.getItem('email');

    if (username) {
        logoutBtn.style.display = 'inline';
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        spanName.textContent = localStorage.getItem('email');
        addBtn.disabled = false;
    } else {
        logoutBtn.style.display = 'none';
    }

    function onLoad(ev) {
        let url = 'http://localhost:3030/data/catches';
        let userId = localStorage.getItem('id');

        fetch(url)
            .then(res => res.json())
            .then(data => {
                catchesDiv.innerHTML = '';
                for (let item of data) {
                    let id = item._ownerId;
                    let newDiv = document.createElement('div');
                    newDiv.classList.add('catch');
                    newDiv.id = item._id;

                    let newLabelAngler = document.createElement('label');
                    newLabelAngler.textContent = 'Angler';
                    newDiv.appendChild(newLabelAngler);
                    let newInputAngler = document.createElement('input');
                    newInputAngler.type = 'text';
                    newInputAngler.classList.add('angler');
                    newInputAngler.value = `${item.angler}`;
                    newDiv.appendChild(newInputAngler);

                    let newLabelWeight = document.createElement('label');
                    newLabelWeight.textContent = 'Weight';
                    newDiv.appendChild(newLabelWeight);
                    let newInputWeight = document.createElement('input');
                    newInputWeight.type = 'text';
                    newInputWeight.classList.add('weight');
                    newInputWeight.value = `${item.weight}`;
                    newDiv.appendChild(newInputWeight);

                    let newLabelSpecies = document.createElement('label');
                    newLabelSpecies.textContent = 'Species';
                    newDiv.appendChild(newLabelSpecies);
                    let newInputSpecies = document.createElement('input');
                    newInputSpecies.type = 'text';
                    newInputSpecies.classList.add('species');
                    newInputSpecies.value = `${item.species}`;
                    newDiv.appendChild(newInputSpecies);

                    let newLabelLocation = document.createElement('label');
                    newLabelLocation.textContent = 'Location';
                    newDiv.appendChild(newLabelLocation);
                    let newInputLocation = document.createElement('input');
                    newInputLocation.type = 'text';
                    newInputLocation.classList.add('location');
                    newInputLocation.value = `${item.location}`;
                    newDiv.appendChild(newInputLocation);

                    let newLabelBait = document.createElement('label');
                    newLabelBait.textContent = 'Bait';
                    newDiv.appendChild(newLabelBait);
                    let newInputBait = document.createElement('input');
                    newInputBait.type = 'text';
                    newInputBait.classList.add('bait');
                    newInputBait.value = `${item.bait}`;
                    newDiv.appendChild(newInputBait);

                    let newLabelCaptureTime = document.createElement('label');
                    newLabelCaptureTime.textContent = 'Capture Time';
                    newDiv.appendChild(newLabelCaptureTime);
                    let newInputCaptureTime = document.createElement('input');
                    newInputCaptureTime.type = 'number';
                    newInputCaptureTime.classList.add('captureTime');
                    newInputCaptureTime.value = `${item.captureTime}`;
                    newDiv.appendChild(newInputCaptureTime);

                    let newUpdateBtn = document.createElement('button');
                    newUpdateBtn.textContent = 'Update';
                    newUpdateBtn.classList.add('update');
                    newUpdateBtn.setAttribute('data-id', item._ownerId);
                    newUpdateBtn.addEventListener('click', onUpdate);
                    newDiv.appendChild(newUpdateBtn);

                    let newDeleteBtn = document.createElement('button');
                    newDeleteBtn.textContent = 'Delete';
                    newDeleteBtn.classList.add('delete');
                    newDeleteBtn.setAttribute('data-id', item._ownerId);
                    newDeleteBtn.addEventListener('click', onDelete);
                    newDiv.appendChild(newDeleteBtn);

                    catchesDiv.appendChild(newDiv);

                    if (username) {
                        if (id === userId) {
                            newUpdateBtn.disabled = false;
                            newDeleteBtn.disabled = false;
                        } else {
                            newUpdateBtn.disabled = true;
                            newDeleteBtn.disabled = true;
                        }
                    } else {
                        newUpdateBtn.disabled = true;
                        newDeleteBtn.disabled = true;
                    }
                }

                catchesContainer.style.display = 'inline';

            })
            .catch(err => console.log(err));

        function onUpdate(ev) {
            let parent = ev.target.parentElement;
            let id = parent.id;
            let url = `http://localhost:3030/data/catches/${id}`;
            let token = localStorage.getItem('accessToken');

            let angler = parent.getElementsByTagName('input')[0];
            let weight = parent.getElementsByTagName('input')[1];
            let species = parent.getElementsByTagName('input')[2];
            let location = parent.getElementsByTagName('input')[3];
            let bait = parent.getElementsByTagName('input')[4];
            let captureTime = parent.getElementsByTagName('input')[5];

            let data = {
                angler: angler.value,
                weight: weight.value,
                species: species.value,
                location: location.value,
                bait: bait.value,
                captureTime: captureTime.value
            }

            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    "X-Authorization": token
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    onLoad();
                })
                .catch(err => console.log(err))
        }

        function onDelete(ev) {
            let parent = ev.target.parentElement;
            let id = parent.id;
            let url = `http://localhost:3030/data/catches/${id}`;
            let token = localStorage.getItem('accessToken');

            fetch(url, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    "X-Authorization": token
                }
            })
                .then(res => res.json())
                .then(data => {
                    onLoad();
                })
                .catch(err => console.log(err))
        }
    }

    function onLogout(ev) {
        let url = 'http://localhost:3030/users/logout';
        let token = localStorage.getItem('accessToken');

        fetch(url, {
            headers: {
                "X-Authorization": token
            }
        })
            .then(res => {
                window.localStorage.clear();
                window.location.replace('index.html');
            })
            .catch(err => console.log(err));
    }

    function onAdd(ev) {
        ev.preventDefault();
        let formData = new FormData(addForm);
        let angler = formData.get('angler');
        let weight = formData.get('weight');
        let species = formData.get('species');
        let location = formData.get('location');
        let bait = formData.get('bait');
        let captureTime = formData.get('captureTime');

        let inputsCheckArr = [angler, weight, species, location, bait, captureTime];
        let isEmpty = false;
        for (let input of inputsCheckArr) {
            if (input === '') {
                isEmpty = true;
                break;
            }
        }

        if (isEmpty === false) {
            let url = 'http://localhost:3030/data/catches';
            let token = localStorage.getItem('accessToken');

            let data = {
                angler: angler,
                weight: weight,
                species: species,
                location: location,
                bait: bait,
                captureTime: captureTime
            }

            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    "X-Authorization": token
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    addForm.reset();
                    onLoad();
                })
                .catch(err => console.log(err))
        }
    }

}

solve()