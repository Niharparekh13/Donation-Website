var checked = false;

$(document).ready(function () {
    $('#form').validate({
        rules: {
            firstname: {
                required: true,
                minlength: 3,
                lettersonly: true
            },
             lastname: {
                 required: true,
                 minlength: 3,
                lettersonly: true
             },
            staddress: {
                required: true,
                minlength: 3,
                address: true
            },
            
            city: {
                required: true,
                minlength: 3,
               lettersonly: true
            },
            state: {
                required: true,
                minlength: 3,
                lettersonly: true
             },
            zipcode: {
                required: true,
                minlength: 6,
                maxlength: 6,
                zipcode: true
            },
            phonenumber: {
                required: true,
                minlength: 6,
                 phone: true
            },
            email: {
                required: true,
                minlength: 3,
                email: true,
            }
 


          },
        // errorPlacement: function (error, element) {
        //     if (element.attr("name") == "gender") {
        //         error.insertAfter('#here');
        //     }
        //     else {
        //         error.insertAfter(element);
        //     }
        //   },
           });
    });
    $.validator.addMethod('lettersonly', function (value) {
        return /^[a-zA-Z]*$/.test(value);
    }, 'The field can only contains letters');
    $.validator.addMethod('address', function (value) {
        return /^[\w',-\\/.\s]*$/.test(value);
    }, 'Invalid Address');
    $.validator.addMethod('zipcode', function (value) {
        return /[0-9]{6}$/.test(value);
    }, 'Invalid Zip-code');
    $.validator.addMethod('phone', function (value) {
        return /\(([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{3})$/.test(value);
    }, 'Phone Number should be of given format');

$('#form').submit(function (event) {
    event.preventDefault();
    // debugger


  

    if (
        $('#firstname').valid() &&
        $('#lastname').valid()  &&
        $('#staddress').valid() &&
        $('#city').valid() &&
        $('#state').valid()  &&
        $('#zipcode').valid()  &&
        $('#phone').valid() &&
        $('#email').valid() &&
        $('#password').valid()&&
        $('#feedback').valid() &&
        $('#suggestion').valid() &&
        $("input[name='gender']:checked") != undefined
    )


        // let firstname = $('#firstname').val();
        // let lastname = $('#lastname').val();
        // let staddress = $('#staddress').val();
        // let city = $('#city').val();
        // let state = $('#state').val();
        // let zipcode = $('#zipcode').val();
        // let phonenumber = $('#phone').val();
        // let email = $('#email').val();
        // let feedback = $('#feedback').val();
        // let suggestion = $('#suggestion').val();
        // let gender = $("input[name='gender']:checked").val();
    
// {
//          const userData = {
//         firstname : firstname,
//         lastname : lastname,
//           staddress :staddress,
//           city:city,
//           state : state,
//           zipcode : zipcode,
//           phonenumber:phone,
//           email:email,
//           feedback:feedback,
//           suggestion:suggestion,
//           gender:gender,
//         }
       
//       }

//         console.log("userData",userData)
//         localStorage.setItem("userData", JSON.stringify(userData));




        {
   
         location.href='/login.ejs'
        }
        
        // $(document).ready(function() {
        //     $("#submit").on('click', function() {
        //         //append previously saved data with comma separator
        //         localStorage.firstname = localStorage.firstname + "," + $('#firstname').val();
        //         console.log("data saved");
        //     });
        // });


    //{
            // $('#displayArea').
            // append(
            //     "<tr><td>" + firstname + " " + lastname +
            //      "</td><td>" 
            //      + staddress + 
            //     "</td><td>" + city +
            //     "</td><td>" + state +
            //     "</td><td>" + zipcode +
            //     "</td><td>" + phonenumber +
            //     "</td><td>" + email +
            //     "</td><td>" + feedback +
            //      "</td><td>" + suggestion +
            //      "</td><td>" + gender +
            //      "</td></tr>"
            // )
    //}
});