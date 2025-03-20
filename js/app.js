document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }
    //?seleccionar los elemento de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputEmail2 = document.querySelector('#email2');
    //console.log( inputEmail);

    const inputAsunto = document.querySelector('#asunto');
    //console.log(inpuAsunto);

    const inputMensaje = document.querySelector('#mensaje');
    //console.log(inputMensaje);
    const formulario = document.querySelector('#formulario');
    
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //?asignacion de evenetos
    inputEmail.addEventListener('blur',validar);
    inputEmail2.addEventListener('blur',validar);
    inputAsunto.addEventListener('blur',validar);
    inputMensaje.addEventListener('blur', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        //reiniciar el objeto
       resetFormulario();
    })

    function enviarEmail(e){
        e.preventDefault()
        console.log('enviando')
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        setTimeout(()=>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetFormulario();

            // Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove(); 
            }, 3000);

        },3000);

    }


    function validar (e){

        if (e.target.id ==='email2' && !validarEmail(e.target.value)){
            //console.log('email2')
            if (e.target.value.trim()!=''){
                mostrarAlerta(e.target.value +" : EMAIL NO VALIDO", e.target.parentElement);
                email[e.target.name]='';
                comprobarEmail();

            }else{
                limpiarAlerta(e.target.parentElement);

            }
              
            return;

        }
 
        
        if (e.target.value.trim()==='' ){ //?trim() metodo par eliminar esapcios en blanco
           
            let mensaje = e.target.id.toUpperCase() + ':  Campo Obligatorio'
            mostrarAlerta( mensaje, e.target.parentElement);
            e.target.value='';
            email[e.target.name]='';
            comprobarEmail();
            return;
        }
        //console.log  ('1as'+ !validarEmail(e.target.value))
        if (e.target.id ==='email' && !validarEmail(e.target.value)){
            
            mostrarAlerta(e.target.value +" : EMAIL NO VALIDO", e.target.parentElement);
            email[e.target.name]='';
            comprobarEmail();
            return;
        }

       

        limpiarAlerta(e.target.parentElement);

        //*asignar valores
        email[e.target.name]=e.target.value.trim().toLowerCase();
        //comprobar objeto email
        comprobarEmail();



    }

    function mostrarAlerta(mensaje ,referencia){

       limpiarAlerta(referencia);

        //generar alerta 
        //console.log(referencia)
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600','text-white','p-2','text-center');
        // insertar error al formulario
        referencia.appendChild(error);

    }

    function limpiarAlerta(referencia){

        const alerta= referencia.querySelector('.bg-red-600');

        if(alerta){
            alerta.remove();

        }
    }
    //console.log('this is end html');

    function validarEmail(email){
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado =regex.test(email);
        return resultado;

    }

    function comprobarEmail(){
        if (Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            
            btnSubmit.disabled = true;
            return
        }
        else{
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled=false;

    }
    }

    function resetFormulario(){

        email.email=''
        email.mensaje=''
        email.asunto=''
        
        formulario.reset();
        comprobarEmail();


    }

});
 