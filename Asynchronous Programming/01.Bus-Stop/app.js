function getInfo() {

    let stopId = document.getElementById('stopId');
    let stopNameDiv = document.getElementById('stopName');
    let list = document.getElementById('buses');

    let baseUrl = 'http://localhost:3030/jsonstore/bus/businfo/';

    list.innerHTML = '';
    fetch(`${baseUrl}/${stopId.value}`)
        .then(res => res.json())
        .then(data => {
            stopNameDiv.textContent = `${data['name']}`;
            for (let key of Object.keys(data['buses'])) {
                let newLi = document.createElement('li');
                newLi.textContent = `Bus ${key} arrives in ${data['buses'][key]} minutes`;
                list.appendChild(newLi);
            }
        })
        .catch(err => stopNameDiv.textContent = 'Error');

}