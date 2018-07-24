const hostname = "165.246.34.25";
const port = "1665";

const express = require("express");
const cors = require("cors");
const app = express();

//const data-utils = require("data-utils");
app.use(express.json());
app.use(cors());
app.use(express.static("static"));

const mysql = require("mysql");
const dateutils = require("date-utils");
const conn = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "todtod2018",
	database : "ICESA"
});
conn.connect(function(err) {
	if(err) throw err;
});
// read
app.get("/info/rental", function(req, res) {
	console.log("rent log");
	conn.query("SELECT * FROM rent_product", function(err,result,fields){
		if(err)	res.send({status : "error"});
		else{
			console.log("read");
			res.send({
				status : "success",
				result : JSON.stringify(result)
			});
		}
	});
});
// create
app.post("/info/rental/db/rent", function(req, res, err) {
		console.log("rent");
			if(!err) res.send({status : "error"});
			else {
				console.log(req.body);
				var information = (req.body);
				var sql1 = "INSERT INTO rent_log (pro_name,pro_num,rent_student,student_num,student_phone,rent_sa,rent_time) VALUES (?,?,?,?,?,?,?)";
						sql2 = "UPDATE rent_product SET pro_possible=? WHERE pro_name=? AND pro_num=?";
				var pro_name = information.pro_name;
				 		pro_num = information.pro_num;
				 		rent_student = information.rent_student;
				 		student_num = information.student_num;
				 		student_phone = information.student_phone;
				 		rent_sa = information.rent_sa;
				 		newDate = new Date();
				 		rent_time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
				var params1 = [pro_name,pro_num,rent_student,student_num,student_phone,rent_sa,rent_time];
						params2 = [pro_name,pro_num];
				conn.query("SELECT * FROM rent_product WHERE pro_name=?, pro_num=?",params2, function(err,result,fields) {
					if(result.pro_possible=="O") {
						conn.query(sql1,params1);
						conn.query(sql2,params2);
						res.send({status : "success"});
					}
				});
			}
		});

app.post("/info/rental/db/return", function(req, res, err) {
	console.log("return");
		if(!err) res.send({status : "error"});
		else {
			console.log(req.body);
			var information = (req.body);
			var sql1 = "SELECT * FROM rent_log WHERE pro_name=? AND pro_num=?";
			 		sql2 = "INSERT INTO rent_log (return_sa,return_time) VALUES (?,?)";
			 		sql3 = "SELECT * FROM rent_product WHERE pro_name=? AND pro_num=?";
					sql4 = "UPDATE rent_product SET pro_possible=? WHERE pro_name=? AND pro_num=?";
			var pro_name = information.pro_name;
			 		pro_num = information.pro_num;
			 		return_sa = information.return_sa;
			 		newDate = new Date();
			 		return_time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
			var params1 = [pro_name, pro_num];
					params2 = [return_sa, return_time];
			conn.query(sql1, params1, function(err, result, fields) {
				var temp = JSON.stringify(resutl);
				var manager = JSON.parse(temp);
					for(var i=0;i<temp.length;i++) {
						if(manager[i].return_sa=='association')
							conn.query(sql2,params2);
					}
			});
			conn.query(sql4,"O",params1);
			res.send({status : "success"});
		}
});

// update
app.put("/info/rental/db/update", function(req,res,err) {
	console.log("information update");
	if(!err) res.send({status : "error"});
	else {
		var information = req.body.information;
		var sql = "UPDATE rent_log SET pro_name=?, pro_num=?, rent_student=?, student_num=?, student_phone=?, rent_sa=?, return_sa=?, return_time=?";
		var log_sq = information.log_sq;
		 		pro_name = information.pro_name;
		 		pro_num = information.pro_num;
		 		rent_student = information.rent_student;
		 		student_num = information.student_num;
		 		student_phone = information.student_phone;
		 		rent_sa = information.rent_sa;
		 		return_sa = information.return_sa;
		 		newDate = new Date();
		 		return_time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
		var params = [pro_name,pro_num,rent_student,student_num,student_phone,rent_sa,return_sa,return_time];
		conn.query("SELECT * FROM rent_log WHERE log_sq=?",log_sq);
		conn.query(sql,params);
		res.send({status : "success"});
	}
});

// delete
app.delete("/info/rental/db/delete", function(req,res,err) {
	console.log("information delete");
	if(!err) res.send({status : "error"});
	else {
		var log_sq = req.log_sq;
		conn.query("DELETE FROM rent_log WHERE log_sq=?",log_sq);
		res.send({status : "success"});
	}
});
const server = app.listen(port, hostname, () => {
	console.log("Server running at http://"+hostname+":"+port+"/");
});
