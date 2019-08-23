var hapi=require('@hapi/hapi');
require("dotenv").config();
var mysql=require('mysql');

var server=new hapi.Server({
    host:'localhost',
    port:7000,
    routes :{
    	cors :true
    },
});
server.route({
        method:"GET",
        path:"/",
        handler:(request,reply)=>{
      return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
                  connection.query(`SELECT * from mydetails `, function (error, results, fields) {
                    if (error) reject(error);
                    resolve(results);
                  });
            
            })
        }
    })
    // server.route({
    // method:"POST",
    //     path:"/add",
    //     handler:(request,reply)=>{
    //     	let item = request.payload;
    //     	console.log(item);
    //   return new Promise((resolve,reject)=>{
    //         var connection = mysql.createConnection({
    //             host     : process.env.DB_HOST,
    //             user     : process.env.DB_USER,
    //             password : process.env.DB_PASSWORD,
    //             database : process.env.DB_NAME
    //           });
    //           connection.connect();
    //               connection.query(`insert into mydetails (fname,lname,uname,password,dob,phoneno,gender,email,address) values('${item.Fname}','${item.Lname}','${item.Uname}','${item.pwd}','${item.dob}','${item.ph}','${item.gender}','${item.email}','${item.Add}')`, function (error, results, fields) {
    //                 if (error) reject(error);
    //                 resolve(results);
    //               });
            
    //         })
    //     }
    // })
    // server.route({
    //     method:"POST",
    //             path:"/edit/{id}",
    //             handler: (request,reply)=>{
    //                var  item = request.payload;
    //                var id=request.params.id;
    //                console.log(item,id);
    //                 return new Promise((resolve,reject)=>{
    //                     var connection = mysql.createConnection({
    //                         host     : process.env.DB_HOST,
    //                         user     : process.env.DB_USER,
    //                         password : process.env.DB_PASSWORD,
    //                         database : process.env.DB_NAME
    //                       });
    //                       connection.connect();
    //                      connection.query(`UPDATE mydetails SET fname ='${item.Fname}', lname ='${item.Lname}', uname = '${item.Uname}',password='${item.pwd}',gender='${item.gender}',email='${item.email}',address='${item.Add}',phoneno='${item.ph}' WHERE Id ='${id}'`, function (error, results, fields) {
    //                         if (error) reject(error);
                            
    //                         resolve(results);
    //                         });
                
    //             })
    //         }
    //     })

    
server.start((err)=>{
    if(err) throw err;
})
console.log("Server is started");