function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(arr, i) {
  if (
    !(
      Symbol.iterator in Object(arr) ||
      Object.prototype.toString.call(arr) === "[object Arguments]"
    )
  ) {
    return;
  }
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

// Reseteo del estilo de los textos (para que aquellos corregidos se visualicen)

var styleReset = function styleReset() {
  for (i = 0; i < document.adoption.length - 1; i++) {
    if (i === 4) {
      i = 7;
      continue;
    }

    document.adoption[i].style.border = "1px solid rgb(169, 169, 169)";
    document.adoption[i].style.backgroundColor = "white";
  }
};

var alertMessage = ""; // Inicialización del string contenedor de los mensajes de alerta

var errorsArray = []; // Inicialización del array contenedor los input con errores

// Manejador de los estilos para campos con errores

var errorStyling = function errorStyling(inputName) {
  errorsArray.push(inputName);
  document.adoption[inputName].style.border = "2px solid red";
  document.adoption[inputName].style.backgroundColor = "yellow";
  errorsArray.length === 0 ? null : document.adoption[errorsArray[0]].focus();
};

// Manejador de mensajes de alerta

var alertHandler = function alertHandler(string) {
  var trigger =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  alertMessage = alertMessage.concat("".concat(string, "\n"));
  trigger !== false ? alert(alertMessage) : null;
};

// Validación de los campos requeridos al presionar submit

var validationHandler = function validationHandler() {
  alertMessage = ""; // Reseteo de los mensajes de alerta
  errorsArray = []; // Reseteo de los input con errores

  // Validación de cada campo

  event.preventDefault();
  styleReset();

  var _document$adoption = _slicedToArray(document.adoption, 9);

  firstName = _document$adoption[0];
  lastName = _document$adoption[1];
  age = _document$adoption[2];
  email = _document$adoption[3];
  country = _document$adoption[8];
  var unfilledFields = [],
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
      var optionValue = document.getElementById("countryList").children[i]
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
      .map(function(field) {
        return unfilledFieldsString.concat("".concat(field, "\n"));
      })
      .join("");
    alertHandler(
      "You must fulfill the following fields:\n".concat(unfilledFieldsString)
    );
  }

  alertMessage === ""
    ? alertHandler("Form sent succesfully!", true)
    : alertHandler("", true);
};

// Validación de inputs en tiempo real

var letterInputHandler = function letterInputHandler() {
  if (!/[a-z]/i.test(event.key)) {
    event.preventDefault();
    alert('The field "'.concat(event.target.id, '" only accepts letters'));
  } else if (event.target.value.length > 16) {
    event.preventDefault();
    alert(
      "The max length for the ".concat(
        event.target.id.toLowerCase(),
        " should be 17 characters"
      )
    );
  }
};

var ageInputHandler = function ageInputHandler() {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
    alert('The field "'.concat(event.target.id, '" only accepts numbers'));
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

var writingInputHandler = function writingInputHandler() {
  if (document.adoption.writing.value.length === 300) {
    event.preventDefault();
  }
};

// Validación de pastes

var namePasteHandler = function namePasteHandler() {
  if (
    event.clipboardData.getData("text").length +
      document.adoption[event.target.name].value.length >
    17
  ) {
    event.preventDefault();
    alert(
      "The max length for the ".concat(
        event.target.id.toLowerCase(),
        " should be 17 characters"
      )
    );
  }
};

var agePasteHandler = function agePasteHandler() {
  event.preventDefault();
};

var writingPasteHandler = function writingPasteHandler() {
  if (
    event.clipboardData.getData("text").length +
      document.adoption[event.target.name].value.length >
    300
  ) {
    event.preventDefault();
  }
};
