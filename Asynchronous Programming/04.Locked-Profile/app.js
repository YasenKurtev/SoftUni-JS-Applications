function lockedProfile() {

    let profileDiv = Array.from(document.getElementsByTagName('div'))[1];
    let hiddenDiv = Array.from(document.getElementsByTagName('div'))[2];
    hiddenDiv.style.display = 'none';
    let mainContainer = document.getElementById('main');

    let url = 'http://localhost:3030/jsonstore/advanced/profiles';

    fetch(url)
        .then(res => res.json())
        .then(data => {
            for (let i = 1; i < Object.keys(data).length; i++) {
                let clone = profileDiv.cloneNode(true);
                let inputs = Array.from(clone.getElementsByTagName('input'));
                inputs[0].name = `user${i + 1}Locked`;
                inputs[1].name = `user${i + 1}Locked`;
                inputs[2].name = `user${i + 1}Username`;
                inputs[3].name = `user${i + 1}Email`;
                inputs[4].name = `user${i + 1}Age`;
                mainContainer.appendChild(clone);
            }

            let profilesDivs = Array.from(document.getElementsByClassName('profile'));
            let counter = 0;

            for (let key of Object.keys(data)) {
                let inputs = Array.from(profilesDivs[counter].getElementsByTagName('input'));
                let lockRadio = Array.from(profilesDivs[counter].querySelectorAll('input[type=radio]'))[0];
                lockRadio.checked = true;
                inputs[2].value = data[key]['username'];
                inputs[3].value = data[key]['email'];
                inputs[4].value = data[key]['age'];
                let btn = Array.from(profilesDivs[counter].getElementsByTagName('button'))[0];
                btn.addEventListener('click', ev => {
                    let parent = ev.target.parentElement;
                    let div = Array.from(parent.getElementsByTagName('div'))[0];
                    let unlockRadio = Array.from(parent.querySelectorAll('input[type=radio]'))[1];
                    if (unlockRadio.checked === true && btn.textContent === 'Show more') {
                        div.style.display = 'inline';
                        btn.textContent = 'Hide it';
                    } else if (unlockRadio.checked === true && btn.textContent === 'Hide it') {
                        div.style.display = 'none';
                        btn.textContent = 'Show more';
                    }
                })
                counter++;
            }

        })
        .catch(err => console.log(err));

}