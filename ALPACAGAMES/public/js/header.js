window.onload = function(){
    let icon = document.querySelector('#logo');
    let icon2 = document.querySelector('#icon-user');
    let login = document.querySelector('.link-header-login-header');
    let register = document.querySelector('.link-header-register-header');
    let navBar = document.querySelector('form')
    let button = document.querySelector('#submit')
    let saludo = document.querySelector('#saludo')
    let avatar = document.querySelector('.logo-header-2-a')
    if(avatar){
        if(innerWidth < 450){
        avatar.addEventListener('click', function(){
            let visibilityIcon2 = window.getComputedStyle(icon).getPropertyValue('visibility')
            if(visibilityIcon2 === "hidden" && innerWidth <= 410){
                icon.style.visibility = "visible"
            }else if(innerWidth <= 410){
                icon.style.visibility = "hidden"
            }
            let visibilityButton = window.getComputedStyle(button).getPropertyValue('visibility')
            if(visibilityButton === "hidden"){
                button.style.visibility = "visible"
            }else{
                button.style.visibility = "hidden"
            }
            let visibilitySaludo = window.getComputedStyle(saludo).getPropertyValue('visibility')
            if(visibilitySaludo === "hidden"){
                saludo.style.visibility = "visible"
            }else{
                saludo.style.visibility = "hidden"
            }
            let border = window.getComputedStyle(avatar).getPropertyValue('border');
            let boxShadow = window.getComputedStyle(avatar).getPropertyValue('box-shadow')
            if (border === "1px solid rgb(255, 255, 255)" && boxShadow === "rgb(255, 255, 255) 0px 0px 10px 0px") {
                avatar.style.border = "1px solid rgb(0, 0, 255)"
                avatar.style.boxShadow = "rgb(0, 0, 255) 0px 0px 10px 0px"
            } else if (border === "1px solid rgb(0, 0, 255)" && boxShadow === "rgb(0, 0, 255) 0px 0px 10px 0px") {
                avatar.style.border = "1px solid rgb(255, 255, 255)"
                avatar.style.boxShadow = "rgb(255, 255, 255) 0px 0px 10px 0px"
            }
        })
    }else if(innerWidth <= 860 && innerWidth >= 640){
        avatar.addEventListener('click', function(){
            console.log('yes')
            let visibilityNavBar = window.getComputedStyle(navBar).getPropertyValue('visibility');
            if (visibilityNavBar === "hidden" && innerWidth >= 640) {
                navBar.style.visibility = "visible"
            } else if(innerWidth >= 640){
                navBar.style.visibility = "hidden"
            }
            let visibilityButton = window.getComputedStyle(button).getPropertyValue('visibility')
            if(visibilityButton === "hidden"){
                button.style.visibility = "visible"
            }else{
                button.style.visibility = "hidden"
            }
            let visibilitySaludo = window.getComputedStyle(saludo).getPropertyValue('visibility')
            if(visibilitySaludo === "hidden"){
                saludo.style.visibility = "visible"
            }else{
                saludo.style.visibility = "hidden"
            }
            let border = window.getComputedStyle(avatar).getPropertyValue('border');
            let boxShadow = window.getComputedStyle(avatar).getPropertyValue('box-shadow')
            if (border === "1px solid rgb(255, 255, 255)" && boxShadow === "rgb(255, 255, 255) 0px 0px 10px 0px") {
                avatar.style.border = "1px solid rgb(0, 0, 255)"
                avatar.style.boxShadow = "rgb(0, 0, 255) 0px 0px 10px 0px"
            } else if (border === "1px solid rgb(0, 0, 255)" && boxShadow === "rgb(0, 0, 255) 0px 0px 10px 0px") {
                avatar.style.border = "1px solid rgb(255, 255, 255)"
                avatar.style.boxShadow = "rgb(255, 255, 255) 0px 0px 10px 0px"
            }
        })
    }
}
    if (icon2) {
        if (innerWidth < 500) {
            icon2.addEventListener('click', function () {
                console.log('yes')
                let visibilityIcon = window.getComputedStyle(icon).getPropertyValue('visibility');
                if(visibilityIcon === "hidden" && innerWidth <= 370){
                    icon.style.visibility = "visible"
                }else if(innerWidth <= 370){
                    icon.style.visibility = "hidden"
                }
                let visibilityLogin = window.getComputedStyle(login).getPropertyValue('visibility');
                if (visibilityLogin === "hidden") {
                    login.style.visibility = "visible"
                } else {
                    login.style.visibility = "hidden"
                }
                let visibilityRegister = window.getComputedStyle(register).getPropertyValue('visibility');
                if (visibilityRegister === "hidden") {
                    register.style.visibility = "visible"
                } else {
                    register.style.visibility = "hidden"
                }
                let color = window.getComputedStyle(icon2).getPropertyValue('color');
                if (color === "rgb(255, 255, 255)") {
                    icon2.style.color = "rgb(128, 128, 128)"
                } else if (color === "rgb(128, 128, 128)") {
                    icon2.style.color = "rgb(255, 255, 255)"
                }

            })

        }
        else if (innerWidth <= 764 && innerWidth >= 640) {
            icon2.addEventListener('click', function () {
                console.log('yes')
                let visibilityNavBar = window.getComputedStyle(navBar).getPropertyValue('visibility');
                if (visibilityNavBar === "hidden") {
                    navBar.style.visibility = "visible"
                } else {
                    navBar.style.visibility = "hidden"
                }
                let visibilityLogin = window.getComputedStyle(login).getPropertyValue('visibility');
                if (visibilityLogin === "hidden") {
                    login.style.visibility = "visible"
                } else {
                    login.style.visibility = "hidden"
                }
                let visibilityRegister = window.getComputedStyle(register).getPropertyValue('visibility');
                if (visibilityRegister === "hidden") {
                    register.style.visibility = "visible"
                } else {
                    register.style.visibility = "hidden"
                }
                let color = window.getComputedStyle(icon2).getPropertyValue('color');
                if (color === "rgb(255, 255, 255)") {
                    icon2.style.color = "rgb(128, 128, 128)"
                } else if (color === "rgb(128, 128, 128)") {
                    icon2.style.color = "rgb(255, 255, 255)"
                }

            })
        }
    }
    
}