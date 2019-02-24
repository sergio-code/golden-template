import "./styles/main.scss"

document.addEventListener("DOMContentLoaded", function() {
    const menuCloseBtnElement = document.createElement("a")
    menuCloseBtnElement.setAttribute("href", "javascript:void(0)")
    menuCloseBtnElement.setAttribute("class", "nav__close")
    menuCloseBtnElement.style.display = "none"
    menuCloseBtnElement.innerHTML = "&times;"
    menuCloseBtnElement.onclick = () => {
        document.querySelector(".nav__close").style.display = "none"
        document.querySelector(".nav").style.display = "none"
    }
    document.querySelector(".nav").appendChild(menuCloseBtnElement)

    const burgerBtnElement = document.createElement("a")
    burgerBtnElement.setAttribute("href", "javascript:void(0)")
    burgerBtnElement.setAttribute("class", "burger_btn nav__open")
    burgerBtnElement.innerHTML = "&#9776;"
    burgerBtnElement.onclick = () => {
        document.querySelector(".nav__close").style.display = "block"
        document.querySelector(".nav").style.display = "block"
    }
    document.querySelector(".heading").appendChild(burgerBtnElement)

    //resize fix
    window.onresize = () => {
        console.log("resized")
        if (window.innerWidth <= 1024) {
            document.querySelector(".nav__close").style.display = "none"
            document.querySelector(".nav").style.display = "none"
        } else {
            document.querySelector(".nav__close").style.display = "none"
            document.querySelector(".nav").style.display = "block"
        }
    }
})
