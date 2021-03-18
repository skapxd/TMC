
        let drawer = document.getElementById('drawer')
        // let iconMenu = document.getElementById('menu');
        let contentDrawer = document.getElementById('contentDrawer')

        var toggleDrawer = false;

        let formDesktop = document.getElementById('formDesktop');
        let formMobile = document.getElementById('formMobile');


        formDesktop.addEventListener( 'submit', function(e){
            console.log('eje')

            e.preventDefault();
            
            let datos = new FormData(formDesktop)

            let email = datos.get('email')
            let telefono = datos.get('telefono')
            let nombre = datos.get('nombre')

            let post =  {
                email,
                telefono,
                nombre
            };

            let jsonPost = JSON.stringify(post);

            console.log( post )
            console.log( jsonPost )

            fetch('/form', {
                method: 'POST',
                body: jsonPost,
                headers: {
                    "content-type" : "application/json"
                }
            })
            .then( res => res.json() )
            .then( data =>{
                
                console.log( data );

                window.location = "/gracias";
            })

        });

        formMobile.addEventListener( 'submit', function(e){
            console.log('eje')

            e.preventDefault();
            
            let datos = new FormData(formMobile)

            let email = datos.get('email')
            let telefono = datos.get('telefono')
            let nombre = datos.get('nombre')

            let post =  {
                email,
                telefono,
                nombre
            };

            let jsonPost = JSON.stringify(post);

            console.log( post )
            console.log( jsonPost )

            fetch('/form', {
                method: 'POST',
                body: jsonPost,
                headers: {
                    "content-type" : "application/json"
                }
            })
            .then( res => res.json() )
            .then( data =>{
                
                console.log( data );

                window.location = "/gracias";
            })

        });

        $(document).ready(function(){

            
            // Add smooth scrolling to all links
            $("a").on('click', function(event) {

                // Make sure this.hash has a value before overriding default behavior
                if (this.hash !== "") {

                    

                    // Prevent default anchor click behavior
                    event.preventDefault();

                    // Store hash
                    var hash = this.hash;

                    // Using jQuery's animate() method to add smooth page scroll
                    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
                    $('html, body').animate({

                        scrollTop: $(hash).offset().top  
                        //console.log(  $(hash).offset().top  - ( vw * 0.1) )
                    }, 50, function(){

                        // Add hash (#) to URL when done scrolling (default click behavior)
                        window.location.hash = hash;
                    });
                
                } // End if
            });
            
        });