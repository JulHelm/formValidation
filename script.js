const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

//Functions
//Show input error message
const showError = (input, message) => {
	const formControl = input.parentElement;
	formControl.classList.add('error');
	const small = formControl.querySelector('small');
	small.innerHTML = message;
};

//Success
const showSuccess = (input) => {
	const formControl = input.parentElement;
	formControl.classList.add('success');
	formControl.classList.remove('error');
	const small = formControl.querySelector('small');
	small.innerHTML = '';
};

//Check Email formatting
const checkEmail = (input) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(String(input.value).toLowerCase())) {
		showSuccess(input);
	} else {
		showError(input, 'Invalid Email format.');
	}
};

//Check required field or not
const checkRequired = (inputArr) => {
	inputArr.forEach((input) => {
		if (input.value.trim() === '') {
			showError(
				input,
				`${
					input.name.charAt(0).toUpperCase() + input.name.slice(1)
				} is required.`
			);
		} else {
			showSuccess(input);
		}
	});
};

//Check Lenght of input
const checkLength = (input, min, max) => {
	if (max < input.value.length) {
		showError(
			input,
			`${
				input.name.charAt(0).toUpperCase() + input.name.slice(1)
			} needs to be below ${max} long.`
		);
	} else if (min > input.value.length) {
		showError(
			input,
			`${
				input.name.charAt(0).toUpperCase() + input.name.slice(1)
			} needs to be longer than ${min}.`
		);
	} else {
		showSuccess(input);
	}
};

//check password match
const checkPasswords = (password, password2) => {
	checkLength(password, 6, 25);
	checkLength(password2, 6, 25);
	if (password.value === password2.value) {
		if (password2.value.length > 6) {
			showSuccess(password2);
		}
	} else {
		showError(password, 'Passwords are not the same');
		showError(password2, 'Passwords are not the same');
	}
};

//Event Listeners
form.addEventListener('submit', (e) => {
	e.preventDefault();
	checkRequired([username, email]);
	checkLength(username, 3, 15);
	checkEmail(email);
	checkPasswords(password, password2);
	/* if (username.value === '') {
		showError(username, 'Username is required.');
	} else {
		showSuccess(username);
	}
    if (email.value === '') {
		showError(email, 'Email is required.');
	} else {
		isValidEmail(email);
	}

	if (password.value === '') {
		showError(password, 'Password is required.');
	} else {
		showSuccess(password);
	}
	if (password2.value === '') {
		showError(password2, 'Confirm password.');
	} else {
		showSuccess(password2);
	} */
});
