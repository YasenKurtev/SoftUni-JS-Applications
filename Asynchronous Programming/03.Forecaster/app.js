function attachEvents() {

    let location = document.getElementById('location');
    let getBtn = document.getElementById('submit');
    let currentDiv = document.getElementById('current');
    let upcomingDiv = document.getElementById('upcoming');
    let forecastDiv = document.getElementById('forecast');
    let degrees = `&#176`;
    let code;
    let divCurrent = document.createElement('div');
    let divUpcoming = document.createElement('div');

    getBtn.addEventListener('click', ev => {
        divCurrent.innerHTML = '';
        divUpcoming.innerHTML = '';

        let url = 'http://localhost:3030/jsonstore/forecaster/locations';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                for (let item of data) {
                    if (item['name'] === location.value) {
                        code = item['code'];
                    }
                }

                let url2 = `http://localhost:3030/jsonstore/forecaster/today/${code}`;

                fetch(url2)
                    .then(res => res.json())
                    .then(data => {
                        let city = data['name'];
                        let condition = data['forecast']['condition'];
                        let high = data['forecast']['high'];
                        let low = data['forecast']['low'];
                        divCurrent.classList.add('forecasts');
                        let newSpan0 = document.createElement('span');
                        newSpan0.classList.add('condition', 'symbol');
                        newSpan0.innerHTML = conditionSymbol(condition);
                        let newSpan1 = document.createElement('span');
                        newSpan1.classList.add('condition');
                        let newSpan2 = document.createElement('span');
                        newSpan2.classList.add('forecast-data');
                        newSpan2.textContent = city;
                        let newSpan3 = document.createElement('span');
                        newSpan3.classList.add('forecast-data');
                        newSpan3.innerHTML = `${low}${degrees}/${high}${degrees}`;
                        let newSpan4 = document.createElement('span');
                        newSpan4.classList.add('forecast-data');
                        newSpan4.textContent = condition;
                        newSpan1.appendChild(newSpan2);
                        newSpan1.appendChild(newSpan3);
                        newSpan1.appendChild(newSpan4);
                        divCurrent.appendChild(newSpan0);
                        divCurrent.appendChild(newSpan1);
                        currentDiv.appendChild(divCurrent);
                        forecastDiv.style.display = 'inline';
                    })
                    .catch(err => {
                        forecastDiv.style.display = 'inline';
                        forecastDiv.innerHTML = '';
                        forecastDiv.textContent = 'Error';
                    })

                let url3 = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

                fetch(url3)
                    .then(res => res.json())
                    .then(data => {
                        divUpcoming.classList.add('forecast-info');
                        for (let item of data['forecast']) {
                            let condition = item['condition'];
                            let high = item['high'];
                            let low = item['low'];
                            let newSpan0 = document.createElement('span');
                            newSpan0.classList.add('upcoming');
                            let newSpan1 = document.createElement('span');
                            newSpan1.classList.add('symbol');
                            newSpan1.innerHTML = conditionSymbol(condition);
                            let newSpan2 = document.createElement('span');
                            newSpan2.classList.add('forecast-data');
                            newSpan2.innerHTML = `${low}${degrees}/${high}${degrees}`;
                            let newSpan3 = document.createElement('span');
                            newSpan3.classList.add('forecast-data');
                            newSpan3.textContent = condition;
                            newSpan0.appendChild(newSpan1);
                            newSpan0.appendChild(newSpan2);
                            newSpan0.appendChild(newSpan3);
                            divUpcoming.appendChild(newSpan0);
                        }
                        upcomingDiv.appendChild(divUpcoming);
                    })
                    .catch(err => {
                        forecastDiv.style.display = 'inline';
                        forecastDiv.innerHTML = '';
                        forecastDiv.textContent = 'Error';
                    })
            })
            .catch(err => {
                forecastDiv.style.display = 'inline';
                forecastDiv.innerHTML = '';
                forecastDiv.textContent = 'Error';
            })


    })

    function conditionSymbol(condition) {
        let symbol;

        if (condition === 'Sunny') {
            symbol = `&#x2600`;
        } else if (condition === 'Partly sunny') {
            symbol = `&#x26C5`;
        } else if (condition === 'Overcast') {
            symbol = `&#x2601`;
        } else if (condition === 'Rain') {
            symbol = `&#x2614`;
        }

        return symbol;
    }

}

attachEvents();