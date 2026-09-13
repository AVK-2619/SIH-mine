const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "babu",
    password: "password",
    database: "SIHGit"
});

app.post(`/Login`, (req, res) => {
    const {Username, Password, UserType} = req.body;
    connection.query(`select UserID from Users where Username = "${Username}" and Password = "${Password}" and UserType = '${UserType}';`, (err, result) => {
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
        res.json(result[0]);
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

app.listen(3000);