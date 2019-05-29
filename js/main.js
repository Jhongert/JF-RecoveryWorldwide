/** 
 * Form validation
 *  For required input, the input element must have a required attribute
 *  To validate email, the input must be type email
 *  Each element must have a span with class error after it
 */

// Get the from element
const form = document.forms[0];


// Avoid revalidate the field when pressing one of the following keys (tab, Shift, Ctrl...)
const excludedKeys = [
    9, 16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225
];


/**
 * Validate an input element.
 *
 * @param  input element instance
 * @return Boolean 
 */

function validate(element){
    let valid = true;
    //Validate a required input
    if(element.hasAttribute('required')){
        if(element.value.trim() === ""){
            showError(element, 'This field is required')
            valid = false
        } else {
            hideError(element)
            valid = true
        }
    }

    //Validate an email input
    if(valid && element.type === "email"){
        //Check if the element value mach the regex
        if(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test( element.value )){
            hideError(element)
            valid = true
        } else {
            showError(element, 'Enter a valid email')
            valid = false
        }
    }

    return valid;
}


/**
 * Display the error message after the specific element.
 *
 * @param html element instance
 * @param message
 */
function showError(element, msg){
    // Get the span that contains the error message after the input element
    var spanErr = element.nextElementSibling;

    spanErr.style.display = 'block';
    spanErr.innerHTML = msg;
}


/**
 * Hide the error message after the specific element.
 *
 * @param html element instance
 */
function hideError(element){
    // Get the label that contains the error message after the input element
    var spanErr = element.nextElementSibling;

    spanErr.style.display = 'none'
    spanErr.innerHTML = ''
}


/** 
 * Form submit handler
 *  Validate all inputs when the form is submitted
 * 
 */
form.onsubmit = function(e){

    e.preventDefault(); //Cancel form submition
    var valid = true;

    // Get all inputs elemets
    var elements = document.querySelectorAll('input');

    // Validate each input element 
    elements.forEach(element => {
        if(!validate(element)) {
            valid = false;
        }
    });

    //If all elements are valid. Show message and clear the form
    if(valid){
        alert('form submitted successfully');
        //Form submition code gos here
        form.reset();
    }
}

/** 
 * Form keyup handler
 *  Validate an input when a key is pressed 
 * 
 */
form.onkeyup =  function(e){
    if(excludedKeys.indexOf(event.keyCode) === -1){
        //Call validate function with the current target element
        validate(e.target)
    }
}

// Set the body height to 524px when the height of the screen is smaller than the #container
// and set it to 100% when is greater, to center the container vertically
window.onresize = function(){
    if(window.innerHeight < 524){
        document.body.style.height = 524 + 'px'
    } else {
        document.body.style.height = 100 + '%'
    }
}