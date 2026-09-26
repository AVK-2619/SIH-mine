const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());
const connection = mysql.createConnection({
    host: "192.168.1.58",
    port: 3306,
    user: "Admin",
    password: "R@hman786",
    database: "SIHGit"
});

app.post(`/Login`, (req, res) => {
    const {Username, Password, UserType} = req.body;
    connection.query(`select UserID from Users where binary Username = "${Username}" and binary Password = "${Password}" and UserType = '${UserType}';`, (err, result) => {
        if (err) return res.status(500).send(err);
        if(result.length == 0){
            res.json({text: "User does not exist"});
        } else {
            res.redirect(303, `/Login/${UserType}/${result[0]['UserID']}`);
        }
    });
});

app.get(`/Login/:UserType/:UserID`, (req, res) => {
    const UserID = req.params.UserID;
    const UserType = req.params.UserType;
    connection.query(`select Username, Age, Qualification, Skills, CompanyName from UserInfo where UserID = ${UserID} and UserType = '${UserType}'`, (err, result) => {
        if (err) return res.status(500).send(err);
        result[0].UserType = UserType;
        result[0].UserID = UserID;
        res.json(result);
    });
});

app.post(`/SignUpSandG`, (req, res) => {
    const {Username, Password, UserType, Age, Qualification} = req.body;
    connection.query(`select count(*) from Users;`, (err, result) => {
        if(err) return res.status(500).send(err);
        connection.query(`insert into Users values (${result[0]['count(*)']+1}, "${Username}", "${Password}", '${UserType}')`);
        connection.query(`insert into UserInfo(UserID, Username, UserType, Age, Qualification) values (${result[0]['count(*)']+1}, "${Username}", '${UserType}', ${Age}, "${Qualification}")`);
        res.redirect(`http://localhost:3000/Login/${UserType}/${result[0]['count(*)']+1}`);
    });
});

app.post(`/SignUpC`, (req, res) => {
    const {Username, Password, UserType, CompanyName, Registration} = req.body;
    connection.query(`select count(*) from Users;`, (err, result) => {
        if(err) return res.status(500).send(err);
        connection.query(`insert into Users values (${result[0]['count(*)']+1}, "${Username}", "${Password}", '${UserType}')`);
        connection.query(`insert into UserInfo(UserID, Username, UserType,  CompanyName, Registration) values (${result[0]['count(*)']+1}, "${Username}", '${UserType}', "${CompanyName}", '${Registration}')`);
        res.redirect(`http://localhost:3000/Login/${UserType}/${result[0]['count(*)']+1}`);
    });
});

app.post(`/Edit`, (req, res) => {
    const {NewUsername, OldUsername, Age, Qualification, UserID, UserType} = req.body;
    connection.query(`update Users set Username="${NewUsername}" where Username="${OldUsername}";`);
    connection.query(`update UserInfo set Username="${NewUsername}", Age=${Age}, Qualification="${Qualification}" where UserId=${UserID};`);
    res.redirect(`http://localhost:3000/Login/${UserType}/${UserID}`)
});

app.get(`/Clear`, (req, res) => {
    connection.query(`truncate table Users;`);
    connection.query(`truncate table UserInfo;`);
    res.send("Done");
})

app.listen(3000);
