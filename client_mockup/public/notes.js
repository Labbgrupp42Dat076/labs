var expandButtons = document.getElementsByClassName("expand");

for (var i = 0; i < expandButtons.length; i++) {
    let content = document.getElementById("note" + i);
    let currentButton = expandButtons[i];
    expandButtons[i].addEventListener("click", function(e) {
    
        content.classList.toggle("expanded");
        content.scrollTop = 0;
        currentButton.style.transform = content.classList.contains("expanded") ? "rotate(180deg)" : "rotate(0deg)";
    }   
    );
    }