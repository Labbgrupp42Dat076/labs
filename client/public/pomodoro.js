// code that dynamically sets the time

var sliders = document.querySelectorAll('.form-control-range');

sliders.forEach(slider => {
    let time = document.getElementById('time' + slider.id);
    console.log(time);
    slider.addEventListener('input', function() {
        time.innerHTML = slider.value + ' minutes'; 
    });
});