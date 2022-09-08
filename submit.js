const formAddServerDictory = document.getElementById('formAddServerDictory');
const urlPost = 'http://localhost:3000/api/upload';
const urlJson = './app-data/albumCache.json';

formAddServerDictory.addEventListener('submit', async event => {
    event.preventDefault();

    //Create the key/value pairs used in the form
    const formData = new FormData(formAddServerDictory);
    try {
        //send the data using post and await the reply
        const response = await fetch(urlPost, {
            method: 'post',
            body: formData
        });
        const result = await response.text();

        if (response.ok) {

            const response = await fetch(urlJson);
            const data = await response.text();

            alert(`Thank you for submitting the information. It has been recieved:\n`+
                `${data}`);
        }
        else {
            alert("Transmission error");
        }
        console.log(result);
    }
    catch {
        alert("Transmission error");
    }
})