function SignOut(){
    localStorage.removeItem("Data");
    window.location.href = "../HTML/LoginPage.html";
}

function Edit(){
    const ResponseData = JSON.parse(localStorage.getItem("Data"));
    document.getElementById("Username").textContent = "Username: ";
    document.getElementById("Age").textContent = "Age: ";
    document.getElementById("Qualification").textContent = "Qualification: ";

    document.querySelectorAll(".EditInput").forEach(input => {
        input.style.display = "inline";
    });

    document.getElementById("UsernameEdit").placeholder = ResponseData[0]["Username"];
    document.getElementById("AgeEdit").placeholder = ResponseData[0]["Age"];
    document.getElementById("QualificationEdit").placeholder = ResponseData[0]["Qualification"];

    document.getElementById("EditSubmit").style.display = "block";
}

async function EditDone(){
    const ResponseData = JSON.parse(localStorage.getItem("Data"));
    const data = {
        OldUsername: ResponseData[0]["Username"],
        NewUsername: document.getElementById("UsernameEdit").value,
        Age: document.getElementById("AgeEdit").value,
        Qualification: document.getElementById("QualificationEdit").value,
        UserID: ResponseData[0]["UserID"],
        UserType: ResponseData[0]["UserType"]
    };

    const response = await fetch(`http://localhost:3000/Edit`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const ResponseNewData = await response.json();

    localStorage.removeItem("Data");
    localStorage.setItem("Data", JSON.stringify(ResponseNewData));

    Load();
}

function Load(){
    const ResponseData = JSON.parse(localStorage.getItem("Data"));
    document.getElementById("Username").textContent += ResponseData[0]["Username"];
    document.getElementById("Age").textContent += ResponseData[0]["Age"];
    document.getElementById("Qualification").textContent += ResponseData[0]["Qualification"];

    document.querySelectorAll(".EditInput").forEach(input => {
        input.style.display = "none";
    });

    document.getElementById("EditSubmit").style.display = "none";
}

window.addEventListener("DOMContentLoaded", Load());