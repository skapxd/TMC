
let form = document.getElementById('form');
let emailInput = document.getElementById('email');
let emailLabel = document.getElementsByClassName('Auth__wrapper__labels')


let passInput = document.getElementById('pass');
let passLabel = document.getElementsByClassName('Auth__wrapper__labels')

let errorUser = document.getElementById('errorUser');
let errorPass = document.getElementById('errorPass');

function setCookie(name,value,days) {
   var expires = '';
       if (days) {
           var date = new Date();
           date.setTime(date.getTime() + (days*24*60*60*1000));
           expires = '; expires=' + date.toUTCString();
       }
   document.cookie = name + '=' + (value || '')  + expires + '; path=/';
}
function getCookie(name) {
   var nameEQ = name + '=';
   var ca = document.cookie.split(';');
   for( var i = 0; i < ca.length; i++ ) {
       var c = ca[i];
       while (c.charAt(0)==' ') c = c.substring(1,c.length);
       if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
   }
   return null;
}

emailInput.addEventListener('focus', function(e) {
    // e.preventDefault();
    // emailLabel.classList.add(' active')
        
    emailLabel[0].classList.add("active")
    

})

emailInput.addEventListener('blur', function(e) {

    let data = new FormData(form);

    let email = data.get('email');

    if (!email || email === '') {
        
        emailLabel[0].classList.remove("active")
    }


})




passInput.addEventListener('focus', function(e) {
    // e.preventDefault();
    // emailLabel.classList.add(' active')
        
    emailLabel[1].classList.add("active")
    

})

passInput.addEventListener('blur', function(e) {

    let data = new FormData(form);

    let email = data.get('pass');

    if (!email || email === '') {
        
        emailLabel[1].classList.remove("active")
    }


})

errorUser.addEventListener('click', function(e){

    
    fetch('recuperar-credenciales', { })
        .then( res => res.json())
        .then( data => console.log(data))
})
errorPass.addEventListener('click', function(e){

    
    fetch('recuperar-credenciales', { })
        .then( res => res.json())
        .then( data => console.log(data))
})


// Eventos
form.addEventListener('submit', function(e){

    e.preventDefault();

    let data = new FormData(form);

    let email = data.get('email');
    let pass = data.get('pass');


    let post =  {
        email,
        pass
    };

    let jsonPost = JSON.stringify(post);


    fetch('/auth', {
        method: 'POST',
        body: jsonPost,
        headers: {
            "content-type" : "application/json"
        }
    })
    .then( res => res.json() )
    .then( data =>{
        
        console.log( data.usuario );

        if ( data.usuario === false ) {

            errorUser.classList.add('active_error')
            
        } else if( data.pass === false ){
            
            errorPass.classList.add('active_error')

        } else {

            setCookie('token',  data.token, 1)

            window.location = "/admin" ;
            // window.location = "/admin/" + data.token;

        }
        
    })
})