const inputName = document.querySelector ("#input-name");
const inputEmail = document.querySelector ("#input-email");
const inputCountry = document.querySelector ("#input-country");
const inputPhone = document.querySelector ("#input-phone");
const inputPassword = document.querySelector ("#input-password");
const inputMatch = document.querySelector ("#input-match");
const phoneCode = document.querySelector(".phone-code");
const form = document.querySelector("#form");
const formBtn = document.querySelector("#form-btn");

// regex
const NAME_REGEX = /^[A-ZÑ][a-zñ]{2,10} [A-ZÑ][a-zñ]{4,16}$/;
const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PHONE_REGEX = /^[0-9]*$/;
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[.!*+]).{8,20}$/;

// validations
let nameValidation = false;
let emailValidation = false;
let countryValidation = false;
let phoneValidation = false;
let passwordValidation = false;
let matchValidation = false;

// funciones
const validateInput = (input, regexValidation) => {
    const xIcon = input.parentElement.children.length === 3 ? input.parentElement.children[1] : input.parentElement.children[2];
    const checkIcon = input.parentElement.children.length === 3 ? input.parentElement.children[2] : input.parentElement.children[3];
    const helpText = input.parentElement.parentElement.children[1];

   
   
   
   
   
    if (nameValidation && emailValidation && countryValidation && phoneValidation && passwordValidation && matchValidation) {
        formBtn.disabled = false;
    }else{
        formBtn.disabled = true;
    }

    if(input.value === ""){
        xIcon.classList.remove("show");
        checkIcon.classList.remove("show");
        helpText.classList.remove("show");
    }else if(regexValidation){
        // si el input es correcto
        xIcon.classList.remove("show");
        checkIcon.classList.add("show");
        helpText.classList.remove("show");
    }else{
        // si el input es incorrecto
        xIcon.classList.add("show");
        checkIcon.classList.remove("show");
        helpText.classList.add("show");
    }
};
[...inputCountry.children].forEach(Option => {
    Option.innerHTML = Option.innerHTML.split("(+")[0];
});

const getIp = async () => {
 try{
    const response = await fetch('https://api.geoapify.com/v1/ipinfo?apiKey=5eb68f2e398d41569b9427ef2386ce3b  ')
const data = await response.json();
const isoCode = (data.country.iso_code);
const option = [...inputCountry.children].find (option => option.getAttribute('data-countryCode') === isoCode);
option.selected = true;
phoneCode.innerHTML = `+${inputCountry.value}`;
}catch (error) {
    alert('hubo un error')
 }
};

getIp();

inputName.addEventListener("input",e =>{
    nameValidation = NAME_REGEX.test(inputName.value);
   validateInput(inputName, nameValidation);
});

inputEmail.addEventListener("input",e =>{
    emailValidation = EMAIL_REGEX.test(inputEmail.value);
   validateInput(inputEmail, emailValidation);
});

inputCountry.addEventListener("input",e =>{
    countryValidation = inputCountry.value !== "";
   validateInput(inputCountry, countryValidation);
   phoneCode.innerHTML = `+${inputCountry.value}`;
});

inputPhone.addEventListener("input",e =>{
    phoneValidation = PHONE_REGEX.test(inputPhone.value);
   validateInput(inputPhone, phoneValidation);
});

inputPassword.addEventListener("input",e =>{
    passwordValidation = PASSWORD_REGEX.test(inputPassword.value);
   validateInput(inputPassword, passwordValidation);
   matchValidation = inputMatch.value === inputPassword.value;
   validateInput(inputMatch, matchValidation);
});

inputMatch.addEventListener("input",e =>{
    matchValidation = inputMatch.value === inputPassword.value;
   validateInput(inputMatch, matchValidation);
});

