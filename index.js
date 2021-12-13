// Your web app's Firebase configuration

//Set up our register function
function register() {
    //GET all our input fields
    full_name = document.getElementById('full_name').value
    password = document.getElementById('password').value
    email = document.getElementById('email').value
    phoneNumber = document.getElementById('phoneNumber').value
        //Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('NHẬP EMAIL HOẶC PASSWORD SAI !')
        return
    }
    if (validate_field(full_name) == false || validate_phone(phoneNumber) == false) {
        alert('NHẬP SAI TÊN HOẶC SAI SỐ ĐIỆN THOẠI!')
        return
    }
    auth.createUserWithEmailAndPassword(email, password)
        .then(function() {

            var user = auth.currentUser

            //Add this user to Firebase Database
            var database_ref = database.ref()
            var user_data = {
                email: email,
                full_name: full_name,
                phoneNumber: phoneNumber,
                last_login: Date.now()
            }
            database_ref.child('users/' + user.uid).set(user_data)

            alert('User created!')

        })
        .catch(function(error) {
            //Firebase will use this to alert of
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}

function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        //email is good
        return true
    } else {
        //email is not good
        return false
    }
}

function validate_password(password) {
    //Firebase only accepts length password > 6 
    if (password < 6) {
        //email is good
        return false
    } else {
        //email is not good
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }
    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}