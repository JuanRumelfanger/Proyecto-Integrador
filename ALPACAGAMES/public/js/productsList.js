window.onload = function(){
    let informationBoxes = document.querySelectorAll('.information-box')
    let products = document.querySelectorAll('.product')
    let imgs = document.querySelectorAll('.imagen-product')
    console.log(informationBoxes)
    if(innerWidth < 303){
        console.log('a')
        informationBoxes.forEach(function(box) {
            box.style.visibility = "hidden";
            
        })    
        products.forEach(function(p, i){
            p.style.height = "240px"
            p.style.transition = "height 0.5s"
            p.addEventListener('mouseenter', function(){
                p.style.height = "360px"
            })
            p.addEventListener('transitionend', function(){
                if (p.style.height === '360px') {
                    informationBoxes[i].style.visibility = "visible";
                }
            })
            p.addEventListener('mouseleave', function(){
                p.style.height = "240px"  
                informationBoxes[i].style.visibility = "hidden";       
            })
            
        })

    }else if(innerWidth < 450 && innerWidth >= 303){
        informationBoxes.forEach(function(box) {
            box.style.visibility = "hidden";
            
        })    
        products.forEach(function(p, i){
            p.style.height = "240px"
            p.style.transition = "height 0.5s"
            p.addEventListener('mouseenter', function(){
                p.style.height = "330px"
            })
            p.addEventListener('transitionend', function(){
                if (p.style.height === '330px') {
                    informationBoxes[i].style.visibility = "visible";
                }
            })
            p.addEventListener('mouseleave', function(){
                p.style.height = "240px"  
                informationBoxes[i].style.visibility = "hidden";       
            })
            
        })
    }else if(innerWidth >= 450){

            products.forEach(function(product, i){
                product.addEventListener('mouseover', function(){
                    imgs[i].style.width = "90%"
                    imgs[i].style.height = "250px"
            })
                product.addEventListener('mouseout', function(){
                    imgs[i].style.width = "80%"
                    imgs[i].style.height = "200px"
            })
            })
            
        
    }
}