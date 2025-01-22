var navButton = document.querySelector('#navButton');

navButton.addEventListener('click', function() {
    var nav = document.querySelector('#navbarNavAltMarkup');
    nav.classList.toggle("collapsing");

    nav.classList.toggle('collapse');

    nav.classList.toggle('collapse');
    nav.classList.toggle("collapsing");
    nav.classList.toggle('show');
    });