// document.addEventListener("DOMContentLoaded", function() {
//     document.getElementById("btn-buscar-cep").addEventListener("click", function() {
//         const xhttp = new XMLHttpRequest();
//         const cep = document.getElementById("cep").value;
//         const endpoint = `https://viacep.com.br/ws/${cep}/json`;

//         xhttp.open("GET", endpoint);
//         xhttp.send();
//     })
// });

$(document).ready(function() {
    $("#cep").mask("00000-000")

    $("#btn-buscar-cep").click(function() {
        const cep = $("#cep").val();
        const endpoint = `https://viacep.com.br/ws/${cep}/json/`;
        const button = $(this);
        $(button).find("i").addClass("d-none");
        $(button).find("span").removeClass("d-none");

        // $.ajax(endpoint).done(function(answer) {
        //     setTimeout(function() {
        //         const logradouro = answer.logradouro;
        //         const bairro = answer.bairro;
        //         const cidade = answer.localidade;
        //         const estado = answer.uf;
        //         const endereco = `${logradouro}, ${bairro}, ${cidade} - ${estado}`;
        //         $("#endereco").val(endereco);
        //         $(button).find("i").removeClass("d-none");
        //         $(button).find("span").addClass("d-none");
        //     }, 1000);
        // });

        fetch(endpoint)
        .then(function(answer) {
            return answer.json();
        })
        .then(function(json) {
            setTimeout(function() {
                const logradouro = json.logradouro;
                const bairro = json.bairro;
                const cidade = json.localidade;
                const estado = json.uf;
                const endereco = `${logradouro}, ${bairro}, ${cidade} - ${estado}`;
                $("#endereco").val(endereco);
            }, 1000);
        })
        .catch(function(error) {
            alert("Ocorreu um erro ao buscar um endereço, tente novamente mais tarde.");
        })
        .finally(function() {
            setTimeout(function() {
                $(button).find("i").removeClass("d-none");
                $(button).find("span").addClass("d-none");
            }, 1000);
        })
    });

    $("#formulario-pedido").submit(function(event) {
        event.preventDefault();

        if ($("#nome").val().length === 0 || $("#sobrenome").val().length === 0 || $("#email").val().length === 0 || $("#cep").val().length === 0 || $("#numero").val().length === 0) {
            throw new Error("Preencha o campo vazio");
        }
    });
});