import "./styles/main.scss"
import { default as $ } from "jquery"
console.info("Page is loaded!")

$(document).ready(function() {
    const menuCloseBtn = `<a href="javascript:void(0)" class="nav__close">&times;</a>`
    const burgerBtn = `<a href="javascript:void(0)" class="burger_btn nav__open">&#9776;</a>`
    $(".nav").prepend(menuCloseBtn)
    $(".heading").append(burgerBtn)
    $(".nav__close").on("click", function() {
        $(".nav__close").hide()
        $(".nav").hide()
    })
    $(".nav__open").on("click", function() {
        $(".nav").show()
        $(".nav__close").show()
    })

    // resize fix
    $(window).resize(() => {
        if (window.innerWidth <= 1024) {
                $(".nav__close").hide()
                $(".nav").hide()
        } else {
                $(".nav__close").hide()
                $(".nav").show()
        }
    })
})
