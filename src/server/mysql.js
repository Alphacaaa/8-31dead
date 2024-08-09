const mysql = require('mysql')
const db_config = {
    host: 'localhost',
    user:'root',
    password:'root',
    port:'3306',
    database:'test'
}

function conMysql(sql){
    let Myconnect = mysql.createConnection(db_config)
    Myconnect.connect(function(err){
        if(err){
            console.log(`mysql err:${err}`)
        }else{
            console.log('sucess')
        }
    })
    return new Promise((resolve,reject) =>{
        Myconnect.query(sql,(err,result)=>{
            if(err){
                reject(err)
            }else{
                let res = JSON.parse(JSON.stringify(result))
                closeMysql(Myconnect)
                resolve(res)
            }
        })
    })
}
function closeMysql(Myconnect){
    Myconnect.end((err)=>{
        if(err){
            console.log(`err:${err}`)
        }else{
            console.log('sucess')
        }
    })
}
exports.conMysql = conMysql

const express = require('express')
const app = express()

const cors =require('express')
app.use(cors())

