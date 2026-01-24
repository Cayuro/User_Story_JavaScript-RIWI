function userInfo(){
    let name =prompt('Please insert your name');
    let age = prompt('Please insert your age');
    return [name,age]
}
function validateNumber(userInfo){
    if(isNaN(userInfo[1])){return alert('invalid argument')}
    if (userInfo[1] >= 18) {return alert(`Hola ${userInfo[0]}, eres mayor de edad,¡Prepárate para grandes oportunidades en el mundo de la programación!`)}
    return alert(`Hola ${userInfo[0]}, eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!`)
}

validateNumber(userInfo())