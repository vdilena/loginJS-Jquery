var usuariosValidos = [
    {
        usuario: "jperez",
        password: "asdf1234"
    },
    {
        usuario: "cgomez",
        password: "qwerty"
    },
    {
        usuario: "vdilena",
        password: "asdf1234"
    }
]

if(!localStorage.getItem("credenciales")) {

    localStorage.setItem("credenciales", JSON.stringify({}))
}

function validarCantCaracteres(input) {

    
    //var valorInput = input.value
    var valorInput = $(input)
    
    //if(valorInput.length < 6) {
        if(valorInput.val().length < 6) {
            
        console.log(input.id)
        //var divError = document.getElementById(`error_${input.id}_incorrecto`)
        var divError = $(`#error_${input.id}_incorrecto`)
        //divError.innerHTML = `Peligro!! Esta ingresando un ${input.id} incorrecto`
        divError.html(`Peligro!! Esta ingresando un ${input.id} incorrecto`)
        //divError.style.color = "red"
        divError.css("color", "red")
        //document.getElementById(input.id).className += " is-invalid"
        $(`#${input.id}`).addClass("is-invalid")
    }
}

function resetError(input) {

    var objetoInput = $(input)

    //var idDeInput = input.id
    var divDeError = null

    //if(idDeInput == "usuario") {
    if(objetoInput.attr("id") == "usuario") {
        //divDeError = document.getElementById("error_usuario_incorrecto")
        divDeError = $("#error_usuario_incorrecto")
    } else {
        //divDeError = document.getElementById("error_password_incorrecto")
        divDeError = $("#error_password_incorrecto")
    }

    //divDeError.innerHTML = ""
    divDeError.html("")
    //document.getElementById(idDeInput).className = "form-control"
    $(`#${input.id}`).removeClass("is-invalid")
    
}

function ingresar() {

    //var usuarioIngresado = document.getElementById("usuario").value
    var usuarioIngresado = $("#usuario").val()
    //var passwordIngresado = document.getElementById("password").value
    var passwordIngresado = $("#password").val()

    if(usuarioIngresado.length >= 6 &&  passwordIngresado.length >= 6) {

            for(var i = 0; i < usuariosValidos.length; i++) {

                var usuarioValido = usuariosValidos[i]
                if(usuarioValido.usuario == usuarioIngresado 
                        && usuarioValido.password == passwordIngresado) {

                            irAHome()

                            localStorage.setItem("credenciales", JSON.stringify({usuario:usuarioIngresado
                                , password: passwordIngresado }))

                            break
                        } else {

                            //var h2Error = document.getElementById("error_credenciales")
                            var h2Error = $("#error_credenciales")
                            //h2Error.innerHTML = "Credenciales incorrectas!"
                            h2Error.html("Credenciales incorrectas!")
                        }
            }
        }
}

function cerrarSesion() {

    localStorage.removeItem("credenciales")
    location.href = "ejemplo.html"
}

function irAHome() {
    location.href = "home.html"
}

$(document).ready(function () {
    
    $("#ver_usuarios").one("click", function (){
        
        for (var i = 0; i < usuariosValidos.length; i++) {

            var usuario = $(`<li class="list-group-item text-center" onclick = "quitarUsuario(this)">${usuariosValidos[i].usuario}</li>`)
            $("#lista-items").append(usuario)
        }
    })

    $("#usuario").keydown(function (evento) { 

        
        if(evento.which == 13) {
            console.log("entro a keydown")
            validarCantCaracteres(document.getElementById("usuario"))
        }
    });

    $("#mostrar-productos").one("click", function (e) {
        
        console.log("mostrar-productos")
        $("#caja-invisible").show(3000, function () {
            console.log("Termino de mostrarse!")
        })
    });
})

function quitarUsuario(objetoLI) {

    $(objetoLI).next().css("background-color", "cyan")
    
    $(objetoLI).hide(3000, function () {
        console.log("Termino de ocultarse!")
    })

    /*if($(".list-group-item").length == 1) {

        $(".list-group-item").removeClass("invisible")

        $("#lista-items").parent().css("font-size","30px")
    }*/
}