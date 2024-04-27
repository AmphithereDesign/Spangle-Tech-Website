`use strict`

// --- function on Contact page
function sendEmail() {
    if(isValid()) {
        //send button add class with display none
        document.getElementById("emailBtn").classList.add("hide")
        document.getElementById("ellipsis-loader").classList.remove("hide")
        document.getElementById("sentMessage").classList.remove("hide")

        axios.post('https://amphithere-design-api.herokuapp.com/api/posts', {
            to: "contactus@spangletech.com",
            subject: document.getElementById('name').value + " sent you a message.",
            text: document.getElementById('email').value + "\n\n\n" + document.getElementById('content').value
        })
        .then(function (response) {
            //clear form, remove send button display none class
            document.getElementById("emailBtn").classList.remove("hide")
            document.getElementById("ellipsis-loader").classList.add("hide")
            document.getElementById("sentMessage").classList.add("hide")

            var form = document.getElementById("contactForm");
            form.reset();
            //alert("Your message has been sent!");
            console.log(response);
        })
        .catch(function (error) {
            document.getElementById("emailBtn").classList.remove("hide")
            document.getElementById("ellipsis-loader").classList.add("hide")
            document.getElementById("sentMessage").classList.add("hide")

            new Notification("Your message has been sent");

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // remove send button display none class
                console.log(error.response.status, error.response.data.message)
                console.log('Response', error.response.headers)
                console.log('Request', error.config)
              } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request)
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log(error)
              }
        });
    } else {
        //alert("Please fill out necessary fields");
    }
}

function spawnNotification(body, icon, title) {
    const notification = new Notification(title, { body, icon });
}

// --- Validation
function isEmail(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(email).toLowerCase().trimEnd());
}

function isValid() {
    var nameValid = document.getElementById('name');
    var emailValid = document.getElementById('email');
    var contentValid = document.getElementById('content');

    if (!nameValid.value) {
        nameValid.classList.add("mystyle");
        return false
    } else {
        nameValid.classList.remove("mystyle");
    }

    if (!emailValid.value && !isEmail(emailValid.value)){
        emailValid.classList.add("mystyle");
        return false
    } else {
        emailValid.classList.remove("mystyle");
    }

    if (!contentValid.value) {
        contentValid.classList.add("mystyle");
        return false
    } else {
        contentValid.classList.remove("mystyle");
    }

    return true;
}

// --- Facebook Messenger Bubble
function fbMsgOpen() {
    document.getElementById('msgerForm').style.display = "flex";
}

function fbMsgClose() {
    document.getElementById('msgerForm').style.display = "none";
}

function refreshTime() {
    var today = new Date();
    var day = today.getDay();
    var time = today.getHours();
    var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
    var timelist = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", 
                    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    var datetime = daylist[day] + ", " + timelist[time - 1] + ":" + today.getMinutes();

    //console.log(datetime);
    document.getElementById('time').innerHTML = datetime; 
}

setInterval(refreshTime, 1000);
// ---