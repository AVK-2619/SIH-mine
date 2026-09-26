const ResponseData = JSON.parse(localStorage.getItem("Data"));

function SignOut(){
    localStorage.removeItem("Data");
    window.location.href = "../HTML/LoginPage.html";
}

function Loadd(){
    document.getElementById("Username").textContent += ResponseData[0].Username;
    document.getElementById("CompanyName").textContent += ResponseData[0].CompanyName;
    document.getElementById("Age").textContent += ResponseData[0].Age;
    document.getElementById("Qualification").textContent += ResponseData[0].Qualification;
    document.getElementById("Skills").textContent += ResponseData[0].Skills;
    if((ResponseData[0].UserType == 'S') || (ResponseData[0].UserType == "G")){
        document.getElementById("Age").style.display = "block";
        document.getElementById("Qualification").style.display = "block";
        document.getElementById("Skills").style.display = "block";
    } else if(ResponseData[0].UserType == "C"){
        document.getElementById("CompanyName").style.display = "block";
    }
}

function AddSkill(SkillName, SkillLevel){
    document.getElementById("Content").innerHTML += `
    <button type="button", class="Skills">
        <p id="SkillName">Skill name: ${SkillName}</p>
        <label for="SkillProgress">Level: ${SkillLevel}</label><br>
        <progress id="SkillProgress", value="${SkillLevel}", max="100"></progress>
    </button>`;
}

async function RenderSkills(UserID){
    const response = await fetch(`http://localhost:3000/GetSkills/${UserID}`);
    const ResponseData = await response.json();
    AddSkill("Java", ResponseData['Java']);
    AddSkill("Python", ResponseData['Python']);
    AddSkill("C", ResponseData['C']);
    AddSkill("HTML", ResponseData['Html']);
    AddSkill("CSS", ResponseData['Css']);
}

window.addEventListener("DOMContentLoaded", RenderSkills(ResponseData[0]['UserID']));
window.addEventListener("DOMContentLoaded", Loadd());