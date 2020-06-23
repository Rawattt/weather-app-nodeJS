console.log('Script is loaded')
const weatherBtn = document.querySelector('.weather')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const url = `http://localhost:3000/weather?address=${encodeURIComponent(search.value)}`
    fetch(url).then(res => {
    res.json().then(data => {
        if(data.error){

            weatherBtn.innerHTML = `${data.error}`
        }
        else{
            weatherBtn.innerHTML = `${data.description} , ${data.temperature}, ${data.address}`
        }
    })
})
})


