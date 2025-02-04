// code that dynamically sets the time

var sliders = document.querySelectorAll('.form-control-range');

sliders.forEach(slider => {
    let time = document.getElementById('time' + slider.id);
    console.log(time);
    slider.addEventListener('input', function() {
        time.innerHTML = slider.value + ' minutes'; 
    });
});

var minutesEl = document.getElementById("minutes");
var secondsEl = document.getElementById("seconds");

function coundownTimer (){
    minutesEl.innerHTML = 55;
    secondsEl.innerHTML = 44;
}

coundownTimer();