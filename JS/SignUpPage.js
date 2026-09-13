function UserType(){
    const UserType = document.querySelector(`input[name="SignUpUserType"]:checked`).value;
    const SandG = `
    Age: <br>
    <input type="number", class="SignUpInputs", id="SignUpAge"><br><br>
    Qualification: <br>
    <input type="text", class="SignUpInputs", id="SignUpQualification"><br> `;

    const C = `
    Company Name: <br>
    <input type="text", class="SignUpInputs", id="SignUpCompanyName"><br><br>
    Registration: <br>
    <input type="radio", name="Registration", id="Registered", value="Registered", checked>
    <label for="Registered">Registered</label>
    <input type="radio", name="Registration", id="NotRegistered", value="NotRegistered", checked>
    <label for="NotRegistered">Not Registered</label>`;

    if((UserType == "Student")||(UserType == "Graduate")){
        document.getElementById("UserTypeSignUp").innerHTML = SandG;
    }
    else if(UserType == "Company"){
        document.getElementById("UserTypeSignUp").innerHTML = C;
    }
}

async function SignUp(){
    const Username = document.getElementById("SignUpUsername").value;
    const Password = document.getElementById("SignUpPassword").value;
    const UserType = document.querySelector(`input[name="SignUpUserType"]:checked`).value;

    if((UserType == "Student") || (UserType == "Graduate")){
        const Age = document.getElementById("SignUpAge").value;
        const Qualification = document.getElementById("SignUpQualification").value;
        console.log(Username, Password, Age, Qualification);

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
    
    window.location.href = "../HTML/Dashboard.html";
}

function Login(){
    window.location.href="../HTML/LoginPage.html";
}