console.log('Script is loaded')
const weatherBtn = document.querySelector('.weather')
const pError = document.querySelector('.error')

const currentLocationButton = document.querySelector('.current')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const options = {
    enableHighAccuracy: true
}

const currentSuccess = (pos, dom) => {

}

currentLocationButton.addEventListener('click', e => {
    e.preventDefault()
    pError.innerText = 'Loading...'
    if(navigator.geolocation){
        window.navigator.geolocation.getCurrentPosition(data => {
                const lat = data.coords.latitude
                const long = data.coords.longitude
                const url = `/weather?lat=${lat}&long=${long}`
                fetch(url).then(res => {
                    res.json().then(data => {
                        if(data.error){
                
                            pError.innerText = `${data.error}`
                            weatherBtn.firstElementChild.innerHTML = ''
                            weatherBtn.childNodes[3].innerHTML = ''
                            weatherBtn.lastElementChild.innerHTML = ''
                        }
                        else{
                            weatherBtn.firstElementChild.innerHTML =''
                            weatherBtn.childNodes[3].innerHTML = `Temperature : ${data.temperature}`
                            weatherBtn.lastElementChild.innerHTML = `Description : ${data.description}`
                            pError.innerText = ''
                            console.log('data received')
                        }
                    })
                })

            
        }, error => {
            weatherBtn.firstElementChild.innerHTML ='Please allow access to the location to use this feature'
            weatherBtn.childNodes[3].innerHTML = ''
            weatherBtn.lastElementChild.innerHTML = ''
            pError.innerText = ''
        })
    }else {
        pError.innerHTML = 'This browser does not support this feature'
    }
    // console.log(location)

})

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    pError.innerText = 'Loading...'
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
            weatherBtn.childNodes[3].innerHTML = `Temperature : ${data.temperature}`
            weatherBtn.lastElementChild.innerHTML = `Description : ${data.description}`
            pError.innerText = ''
            console.log('data received')
        }
    })
})
})


