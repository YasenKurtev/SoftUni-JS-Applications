function solve() {

    let infoSpan = Array.from(document.getElementsByTagName('span'))[0];
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let stopName;
    let id = 'depot';

    arriveBtn.disabled = true;

    function depart() {
        departBtn.disabled = true;
        let url = `http://localhost:3030/jsonstore/bus/schedule/${id}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                stopName = data['name'];
                infoSpan.textContent = `Next stop ${stopName}`;
                id = data['next'];
            })
            .catch(err => {
                infoSpan.textContent = 'Error';
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            })

        arriveBtn.disabled = false;
    }

    function arrive() {
        infoSpan.textContent = `Arriving at ${stopName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();