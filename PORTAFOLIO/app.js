const formulario = document.querySelector('#formulario');
const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');

btn1.addEventListener('click', encriptar);
btn2.addEventListener('click', desencriptar);

const encriptObj = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'
}

const desencriptObj = {
    'ai': 'a',
    'enter': 'e',
    'imes': 'i',
    'ober': 'o',
    'ufat': 'u'
}

function encriptar(e) {
    e.preventDefault();
    
    let palabra = document.querySelector('#formulario textarea').value;
    
    if(palabra.trim() === '') {
        showAlert('El contenido esta vacio...!!!');
        return;
    }

    if(!sonMinusculas(palabra)){
        console.log(palabra)
        showAlert('Solo letras minusculas y sin acentos...!')
        return;
    }

    const palabrarr = palabra.split('');
    
    const palabraEncriptada = palabrarr.map(letra => {
        if(encriptObj[letra]){
            return encriptObj[letra];
        }else {
            return letra;
        }
    }).join('');

    encriptacionHTML(palabraEncriptada);
    
}

function desencriptar(e) {
    e.preventDefault();

    let palabra = document.querySelector('#formulario textarea').value;

    if(palabra.trim() === '') {
        showAlert('El contenido esta vacio...!!!');
        return;
    }
    
    for(const letra in desencriptObj) {
        
        palabra = palabra.replaceAll(letra, desencriptObj[letra]);
    }
    
    encriptacionHTML( palabra );
}

function showAlert( mensaje ){
    const alertaExists = document.querySelector('#alerta');

    if(alertaExists) return;

    const container = document.querySelector('.btns')
    const div = document.createElement('div');
    const alerta = document.createElement('p');
    alerta.style.color = 'red';
    alerta.style.fontWeight = '600';
    
    alerta.textContent = mensaje;

    div.style.backgroundColor = '#ffffff';
    div.style.padding = '10px';
    div.style.textAlign = 'center';
    div.style.margin = '10px';
    div.style.gridColumn = '1 / 3';
    div.id = 'alerta'

    document.querySelector('.btns p').style.display = 'none';
    div.appendChild(alerta);
    container.prepend(div);

    setTimeout(() => {
        div.remove();
    },3000);
}

function encriptacionHTML(palabraEncriptada) {
    const container = document.querySelector('.texto-encriptado .container');
    clearHTML( container );

    const palabra = document.createElement('p');
    palabra.style.marginTop = '3rem';
    palabra.textContent = palabraEncriptada;

    container.appendChild(palabra);

    if( container ) {
        let texto = document.querySelector('#formulario textarea');
        const copyBtn = document.createElement('button');
        copyBtn.classList.add('btn', 'btn2');
        copyBtn.style.marginTop = '2rem';
        copyBtn.textContent = 'Copiar';
        copyBtn.onclick = () => {
            texto.value = palabra.textContent;
        }

        container.appendChild(copyBtn);
    }
}

function clearHTML( contenedor ) {

    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild)
    }
}

function sonMinusculas(palabra) {
    
    return palabra.split(' ').every(word => /^[a-z]+$/.test(word));
}