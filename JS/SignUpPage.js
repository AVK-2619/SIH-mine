function UserType(){
    const UserType = document.querySelector(`input[name="SignUpUserType"]:checked`).value;

    if((UserType == "Student")||(UserType == "Graduate")){
        document.getElementById("UserTypeSignUpSandG").style.display = "block";
        document.getElementById("UserTypeSignUpC").style.display = "none";
    }
    else if(UserType == "Company"){
        document.getElementById("UserTypeSignUpSandG").style.display = "none";
        document.getElementById("UserTypeSignUpC").style.display = "block";
    }
}

async function SignUp(){
    const Username = document.getElementById("SignUpUsername").value;
    const Password = document.getElementById("SignUpPassword").value;
    const UserType = document.querySelector(`input[name="SignUpUserType"]:checked`).value;

    if((Username == "") || (Password == "")){
        window.alert("Fill all fields");
        return;
    }

    if((UserType == "Student") || (UserType == "Graduate")){
        const Age = document.getElementById("SignUpAge").value;
        const Qualification = document.getElementById("SignUpQualification").value;

        if((Age == "") || (Qualification == "")){
            window.alert("Fill all fields");
            return;
        }

        const data = {
            Username: Username,
            Password: Password,
            UserType: 'S',
            Age: Age,
            Qualification: Qualification
        };

        const response = await fetch(`http://localhost:3000/SignUpSandG`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const ResponseData = await response.json();
        localStorage.setItem("Data", JSON.stringify(ResponseData));
    }

    else if (UserType == "Company"){
        const CompanyName = document.getElementById("SignUpCompanyName").value;
        const Registration = document.querySelector(`input[name="Registration"]:checked`).value;

        if(CompanyName == ""){
            window.alert("Fill all fields");
            return;
        }

        const data = {
            Username: Username,
            Password: Password,
            UserType: 'C',
            CompanyName: CompanyName,
            Registration: Registration.charAt(0)
        };

        const response = await fetch(`http://localhost:3000/SignUpC`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const ResponseData = await response.json();
        localStorage.setItem("Data", JSON.stringify(ResponseData));
    }
    
    window.location.href = "SIH-mine/HTML/Dashboard.html";
}

function Login(){
    window.location.href="HTML/LoginPage.html";
}

document.addEventListener("keydown", (event) => {
    if(event.key == "Enter"){
        SignUp();
    }
});