async function Login(){
    const Username = document.getElementById("LoginUsername").value;
    const Password = document.getElementById("LoginPassword").value;
    const UserType = document.querySelector('input[name="LoginUserType"]:checked').value;
    const data = {
        Username: Username,
        Password: Password,
        UserType: UserType.charAt(0)
    };
    const response = await fetch(`http://localhost:3000/Login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const ResponseData = await response.json();
    if(ResponseData['text'] == "User does not exist"){
        window.alert("User does not exist");
    } else {
        console.log(ResponseData);
        localStorage.setItem("Data", JSON.stringify(ResponseData));
        window.location.href = "../HTML/Dashboard.html";
    }
}

function SignUp(){
    window.location.href = "../HTML/SignUpPage.html"
}

window.addEventListener("keydown", (event) => {
    if(event.key == "Enter"){
        Login();
    }
});