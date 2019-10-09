// Reseteo del estilo de los textos (para que aquellos corregidos se visualicen)

const styleReset = () => {
  for (i = 0; i < document.adoption.length - 1; i++) {
    if (i === 4) {
      i = 7;
      continue;
    }
    document.adoption[i].style.border = "1px solid rgb(169, 169, 169)";
    document.adoption[i].style.backgroundColor = "white";
  }
};

let alertMessage = ""; // Inicialización del string contenedor de los mensajes de alerta
let errorsArray = []; // Inicialización del array contenedor los input con errores

// Manejador de los estilos para campos con errores

const errorStyling = inputName => {
  errorsArray.push(inputName);
  document.adoption[inputName].style.border = "2px solid red";
  document.adoption[inputName].style.backgroundColor = "yellow";
  errorsArray.length === 0 ? null : document.adoption[errorsArray[0]].focus();
};

// Manejador de mensajes de alerta

const alertHandler = (string, trigger = false) => {
  alertMessage = alertMessage.concat(`${string}\n`);
  trigger !== false ? alert(alertMessage) : null;
};

// Validación de los campos requeridos al presionar submit

const validationHandler = () => {
  alertMessage = ""; // Reseteo de los mensajes de alerta
  errorsArray = []; // Reseteo de los input con errores

  // Validación de cada campo

  event.preventDefault();
  styleReset();
  [firstName, lastName, age, email, , , , , country] = document.adoption;
  let unfilledFields = [],
    unfilledFieldsString = "";

  if (firstName.value.trim() === "") {
    unfilledFields.push("First name");
    errorStyling("fname");
  } else if (!isNaN(firstName.value)) {
    alertHandler("The first name you entered is invalid\n");
    errorStyling("fname");
  }

  if (lastName.value.trim() === "") {
    unfilledFields.push("Last name");
    errorStyling("lname");
  } else if (!isNaN(lastName.value)) {
    alertHandler("The last name you entered is invalid\n");
    errorStyling("lname");
  }

  if (age.value.trim() === "") {
    unfilledFields.push("Age");
    errorStyling("age");
  } else if (isNaN(age.value)) {
    alertHandler("You entered an invalid age value\n");
    errorStyling("age");
  } else if (age.value < 1 || age.value > 120) {
    alertHandler("The age you entered is an off-limits value\n");
    errorStyling("age");
  }

  if (email.value.trim() === "") {
    unfilledFields.push("Email");
    errorStyling("email");
  } else if (
    !/(\w\.*)+@[a-z]+\.[a-z]{3}/.test(email.value) ||
    !/[a-z]/.test(email.value.charAt(email.value.length - 1)) ||
    email.value.match(/@/g).length > 1 ||
    email.value.length > 320
  ) {
    alertHandler("The email you entered is invalid\n");
    errorStyling("email");
  }

  // Aquí valido los radiobutton con el name children, aunque no sean requeridos en el formulario

  if (document.adoption.children.value === "") {
    unfilledFields.push("Children");
  }

  if (country.value.trim() === "") {
    unfilledFields.push("Country");
    errorStyling("country");
  } else if (!isNaN(country.value)) {
    alertHandler("The country you entered is invalid\n");
    errorStyling("country");
  } else if (country.value) {
    for (i = 0; i <= 194; i++) {
      let optionValue = document.getElementById("countryList").children[i]
        .value;
      if (optionValue === country.value) {
        break;
      } else if (i === 194) {
        alertHandler("The country you entered is not in the list\n");
        errorStyling("country");
      }
    }
  }

  // Generación del string de alerta para aquellos campos incompletos

  if (unfilledFields.length > 0) {
    unfilledFieldsString = unfilledFields
      .map(field => unfilledFieldsString.concat(`${field}\n`))
      .join("");
    alertHandler(
      `You must fulfill the following fields:\n${unfilledFieldsString}`
    );
  }

  alertMessage === ""
    ? alertHandler("Form sent succesfully!", true)
    : alertHandler("", true);
};

// Validación de inputs en tiempo real

const letterInputHandler = () => {
  if (!/[a-z]/i.test(event.key)) {
    event.preventDefault();
    alert(`The field "${event.target.id}" only accepts letters`);
  } else if (event.target.value.length > 16) {
    event.preventDefault();
    alert(
      `The max length for the ${event.target.id.toLowerCase()} should be 17 characters`
    );
  }
};

const ageInputHandler = () => {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
    alert(`The field "${event.target.id}" only accepts numbers`);
  } else if (
    (event.target.value.length > 2 &&
      window.getSelection().toString() === "") ||
    (window.getSelection().toString() !== "" &&
      window.getSelection().anchorOffset !== 10)
  ) {
    event.preventDefault();
    alert("The age you are trying to enter is an off-limits value");
  }
};

const writingInputHandler = () => {
  if (document.adoption.writing.value.length === 300) {
    event.preventDefault();
  }
};

// Validación de pastes

const namePasteHandler = () => {
  if (
    event.clipboardData.getData("text").length +
      document.adoption[event.target.name].value.length >
    17
  ) {
    event.preventDefault();
    alert(
      `The max length for the ${event.target.id.toLowerCase()} should be 17 characters`
    );
  }
};

const agePasteHandler = () => {
  event.preventDefault();
};

const writingPasteHandler = () => {
  if (
    event.clipboardData.getData("text").length +
      document.adoption[event.target.name].value.length >
    300
  ) {
    event.preventDefault();
  }
};
