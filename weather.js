let title = document.querySelector('#title');
let temp = document.querySelector('.temp');
let button = document.querySelector('.switch');
let statusW = document.querySelector('.status');
let icon = document.querySelector('.icon');
let main = document.getElementById("main");
let container = document.querySelector('#container')

window.addEventListener('load', () => {
        let lat;
        let lon;
    if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition((position) => {
           lat = position.coords.latitude;
           lon = position.coords.longitude;

           const response = async () => {
            const res =  await fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`);
            const data =  await res.json();
            title.innerText = `${data.name}`
            temp.innerText = `${(data.main.temp).toFixed(1)}`
            statusW.innerText = `${data.weather[0].main}`
            icon.src = `${data.weather[0].icon}`
            const changeTemp = () => {
                if(button.innerText === 'C') {
                    button.innerText = 'F';
                    temp.innerText = `${((data.main.temp).toFixed(1) * 9/5) + 32}`
                }
                else {
                    button.innerText = 'C';
                    temp.innerText = `${(data.main.temp).toFixed(1)}`
                }
            }
            button.addEventListener("click", changeTemp)
            
        }
        response()
       }) 
    }
})

container.addEventListener('mousemove', (e) => {
     let xAxis = (e.clientX - window.innerWidth / 2) / 10;
    let yAxis = (window.innerHeight / 2 - e.clientY) / 10;
    // let xAxis = (window.innerWidth / 2 - e.clientX) / 10;
    console.log(xAxis, yAxis)
    console.log(e.clientX)
    main.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
    
})

container.addEventListener("mouseleave", () => {
    main.style.transform = 'rotateY(0deg) rotateX(0deg)',
    main.style.transition = 'all 1s ease'
    icon.style.transform = 'translateZ(0px)'
    temp.style.transform = 'translateZ(0px)';
    button.style.transform = 'translateZ(0px)';
    title.style.transform = 'translateZ(0px)';
    statusW.style.transform = 'translateZ(0px)';

})

container.addEventListener("mouseenter", () => {
    main.style.transition = 'none';
    icon.style.transform = 'translateZ(120px)'
    temp.style.transform = 'translateZ(120px) rotate(-30deg)'
    button.style.transform = 'translateZ(120px)'
    title.style.transform = 'translateZ(120px)'
    statusW.style.transform = 'translateZ(120px)'
})
