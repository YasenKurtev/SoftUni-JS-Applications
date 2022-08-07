function attachEvents() {

    let sendBtn = document.getElementById('submit');
    let refreshBtn = document.getElementById('refresh');
    let nameInput = document.getElementsByTagName('input')[0];
    let messageInput = document.getElementsByTagName('input')[1];
    let textarea = document.getElementById('messages');

    sendBtn.addEventListener('click', ev => {
        if (nameInput.value !== '' && messageInput.value !== '') {
            let url = 'http://localhost:3030/jsonstore/messenger';
            let name = nameInput.value;
            let message = messageInput.value;

            let data = {
                author: name,
                content: message
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
                    console.log(data);
                })

            nameInput.value = '';
            messageInput.value = '';
        }
    })

    refreshBtn.addEventListener('click', ev => {
        let url = 'http://localhost:3030/jsonstore/messenger';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                textarea.value = '';
                for (let item of Object.values(data)) {
                    textarea.value += `${item['author']}: ${item['content']}\n`;
                }
            })
    })
}

attachEvents();