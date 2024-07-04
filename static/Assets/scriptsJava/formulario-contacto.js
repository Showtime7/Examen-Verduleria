/*  FUNCIÓN QUE PERMITE ALMACENAR LA INFORMACIÓN DEL FORMULARIO
    DE CONTACTO. */
    function save(){
        try{
            let messageError = "";
            let nombres = document.getElementById('nombres').value;
            console.log('NOMBRES: ' + nombres);
            let apellidoPaterno = document.getElementById('apellido-paterno').value;
            console.log('APELLIDO PATERNO: ' + apellidoPaterno);
            let apellidoMaterno = document.getElementById('apellido-materno').value;
            console.log('APELLIDO MATERNO: ' + apellidoMaterno);
            let email = document.getElementById('email').value;
            console.log('EMAIL: ' + email);
            let genero = document.querySelector('input[name="genero"]:checked');
            let consulta = document.getElementById('floatingTextarea').value;
    
            // Validar el campo de nombres
            if(nombres == ""){
                console.log('nombres vació');
                messageError = `${messageError} Debe ingresar sus <b>nombres</b>.<br>`;
                console.log(`messageError: ${messageError}`);
            }
            
            // Validar el campo de apellido paterno
            if(apellidoPaterno == ""){
                console.log('apellidoPaterno vació');
                messageError = `${messageError} Debe ingresar su <b>apellido paterno</b>.<br>`;
                console.log(`messageError: ${messageError}`);
            }
            
            // Validar el campo de apellido materno
            if(apellidoMaterno == ""){
                console.log('apellidoMaterno vació');
                messageError = `${messageError} Debe ingresar su <b>apellido materno</b>.<br>`;
                console.log(`messageError: ${messageError}`);
            }
    
            // Validar el campo de correo electrónico
            if(email == ""){
                console.log('email vacío');
                messageError = `${messageError} Debe ingresar su <b>correo electrónico</b>.<br>`;
                console.log(`messageError: ${messageError}`);
            } else {
                // Validar formato del correo electrónico
                let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if(!emailPattern.test(email)){
                    console.log('email no válido');
                    messageError = `${messageError} El <b>correo electrónico</b> no es válido.<br>`;
                    console.log(`messageError: ${messageError}`);
                }
            }
            
            // Validar el campo de género
            if(!genero){
                console.log('genero no seleccionado');
                messageError = `${messageError} Debe seleccionar su <b>género</b>.<br>`;
                console.log(`messageError: ${messageError}`);
            }
    
            // Validar el campo de consulta
            if(consulta.trim() == ""){
                console.log('consulta vacía');
                messageError = `${messageError} Debe ingresar su <b>consulta</b>.<br>`;
                console.log(`messageError: ${messageError}`);
            } 
            
            // Mostrar mensaje de éxito o error
            if(messageError == ""){
                document.getElementById('message-error').classList.add('show');
                document.getElementById('message-error').classList.remove('alert-danger');
                document.getElementById('message-error').classList.add('alert-success');
                document.getElementById('message').innerHTML = 'Consulta enviada!!! Trataremos de responder a tu correo lo antes posible. Gracias por preferirnos!';
            }else{
                document.getElementById('message-error').classList.add('show');
                document.getElementById('message-error').classList.remove('alert-success');
                document.getElementById('message-error').classList.add('alert-danger');
                document.getElementById('message').innerHTML = messageError;
            }
            
            console.log('messageError: ' + messageError);
        }catch(e){
            console.log("Error", e.stack);
            console.log("Error", e.name);
            console.log("Error", e.message);
        }
    }
    
    