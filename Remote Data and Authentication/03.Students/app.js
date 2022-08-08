window.onload = function () {

    let table = document.getElementsByTagName('tbody')[0];
    let formElement = document.getElementById('form');

    let url = 'http://localhost:3030/jsonstore/collections/students';

    fetch(url)
        .then(res => res.json())
        .then(data => {
            for (let item of Object.values(data)) {
                let firstName = item['firstName'];
                let lastName = item['lastName'];
                let facNum = item['facultyNumber'];
                let grade = item['grade'];
                addRow(firstName, lastName, facNum, grade);
            }
        })
        .catch(err => console.log(err));

    formElement.addEventListener('submit', ev => {
        ev.preventDefault();

        let formData = new FormData(formElement);

        let firstName = formData.get('firstName');
        let lastName = formData.get('lastName');
        let facNum = formData.get('facultyNumber');
        let grade = Number(formData.get('grade'));

        if (firstName !== '' && lastName !== '' && facNum !== '' && grade !== 0 && typeof grade === 'number') {
            let data = {
                firstName: firstName,
                lastName: lastName,
                facultyNumber: facNum,
                grade: grade
            }

            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    addRow(firstName, lastName, facNum, grade);
                })
                .catch(err => console.log(err));
        }
    })

    function addRow(firstName, lastName, facNum, grade) {
        let newTr = document.createElement('tr');
        let newThFirstName = document.createElement('th');
        newThFirstName.textContent = firstName;
        newTr.appendChild(newThFirstName);
        let newThLastName = document.createElement('th');
        newThLastName.textContent = lastName;
        newTr.appendChild(newThLastName);
        let newThFacNum = document.createElement('th');
        newThFacNum.textContent = facNum;
        newTr.appendChild(newThFacNum);
        let newThGrade = document.createElement('th');
        newThGrade.textContent = Number(grade).toFixed(2);
        newTr.appendChild(newThGrade);
        table.appendChild(newTr);
    }

}