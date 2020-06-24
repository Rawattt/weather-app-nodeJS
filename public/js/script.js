console.log('Script is loaded')
const weatherBtn = document.querySelector('.weather')
const pError = document.querySelector('.error')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const url = `/weather?address=${encodeURIComponent(search.value)}`
    fetch(url).then(res => {
    res.json().then(data => {
        if(data.error){

            pError.innerText = `${data.error}`
            weatherBtn.firstElementChild.innerHTML = ''
            weatherBtn.childNodes[3].innerHTML = ''
            weatherBtn.lastElementChild.innerHTML = ''
        }
        else{
            weatherBtn.firstElementChild.innerHTML = `Address : ${data.address}`
            weatherBtn.childNodes[3].innerHTML = `Temperature : ${data.temperature} C`
            weatherBtn.lastElementChild.innerHTML = `Description : ${data.description}`
            pError.innerText = ''
            console.log('data received')
        }
    })
})
})


