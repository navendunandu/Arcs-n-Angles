const express = require("express");
const app = express();
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const { request } = require("https");
const port = 4000;
const mailer = require('nodemailer');
const axios = require('axios');
const fs = require('fs');

const PATH = "./public/images";
const upload = multer({
    storage: multer.diskStorage({
        destination: PATH,
        filename: function (req, file, cb) {
            let origialname = file.originalname;
            let ext = origialname.split(".").pop();
            let filename = origialname.split(".").slice(0, -1).join(".");
            cb(null, filename + "." + ext);
        },
    }),
});

//use express static folder
app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_arcsnangles",
    port: 3306,
});

// Check Database Connection

db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log("Database Connected");
});

app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => {
    console.log("Server is Running");
});

app.post("/District", (req, res) => {

    let qry3 = "insert into tbl_district (district_name) values('" + req.body.district_name + "')";
    db.query(qry3, (err, result) => {
        if (err) {
            console.log("Error");
            console.log(err);
        }
        else {
            res.send({
                message: "Data Saved",
            });
        }
    });
});

app.get("/District", (req, res) => {
    let sel1 = "select * from tbl_district";
    db.query(sel1, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                district: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.delete("/District/:id", (req, res) => {
    let id = req.params.id;
    let del1 = `delete from tbl_district where district_id='${id}'`;
    db.query(del1, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Data Deleted",
            });
        }
    })
})

app.post("/Category", (req, res) => {
    let qry4 = "insert into tbl_category (category_name) values('" + req.body.category_name + "')";
    db.query(qry4, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Data Saved",
            });
        }
    })
})

app.get("/Category", (req, res) => {
    let sel3 = "select * from tbl_category";
    db.query(sel3, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                Category: result,
            })
        }
        else {
            res.send({
                message: "No data found",
                Category: [],
            });
        }
    })
})

app.delete("/Category/:id", (req, res) => {
    let id = req.params.id;
    let del2 = `delete from tbl_category where category_id='${id}'`;
    db.query(del2, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Data Deleted",
            });
        }
    })
})

app.post("/Place", (req, res) => {

    let qry5 = "insert into tbl_place (place_name, district_id) values('" + req.body.place_name + "','" + req.body.district_id + "')";
    db.query(qry5, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Data Saved",
            });
        }
    })
})

app.get("/Place", (req, res) => {
    let sel4 = "select * from tbl_place p inner join tbl_district d on p.district_id=d.district_id";
    db.query(sel4, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                Place: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.get("/Place_Condition/:id", (req, res) => {
    const id = req.params.id;
    let sel1 = "select * from tbl_place where district_id='" + id + "'";
    db.query(sel1, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                Place: result,
            })
        }
        else {
            res.send({
                message: "No data found",
                Place: [],
            });
        }
    })
})

app.delete("/Place/:id", (req, res) => {
    let id = req.params.id;
    let del3 = `delete from tbl_place where place_id='${id}'`;
    db.query(del3, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Data Deleted",
            });
        }
    })
})

app.post("/SubCategory", (req, res) => {
    let qry6 = "insert into tbl_subcategory (subcategory_name, category_id) values('" + req.body.subcategory_name + "','" + req.body.category_id + "')";
    db.query(qry6, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Data Saved",

            });
        }
        console.log(qry6);
    })
})

app.get("/SubCategory", (req, res) => {
    let sel5 = "select * from tbl_subcategory s inner join tbl_category c on s.category_id=c.category_id";
    db.query(sel5, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                SubCategory: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.get("/SubCategory_Condition/:cid", (req, res) => {
    let sel6 = "select * from tbl_subcategory where category_id='" + req.params.cid + "'";
    console.log(sel6);
    db.query(sel6, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                SubCategory: result,
            })
        }
        else {
            res.send({
                message: "No data found",
                SubCategory: [],
            });
        }
    })
})

app.delete("/SubCategory/:id", (req, res) => {
    let id = req.params.id;
    let del4 = `delete from tbl_subcategory where subcategory_id='${id}'`;
    db.query(del4, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Data Deleted",
            });
        }
    })
})

app.post("/UserReg", upload.single("user_photo"), (req, res) => {
    console.log(req.file);
    var imgsrc = `http://127.0.0.1:${port}/images/${req.file.filename}`;
    let qry7 = "INSERT INTO tbl_user(user_name, user_email, user_password,user_contact, user_address, place_id, user_photo, user_gender) VALUES('" + req.body.user_name + "','" + req.body.user_email + "','" + req.body.user_password + "','" + req.body.user_contact + "','" + req.body.user_address + "','" + req.body.place_id + "','" + imgsrc + "','" + req.body.user_gender + "')";
    db.query(qry7, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Data Saved"
            })
        }
    })
})

app.get("/User", (req, res) => {
    let sel7 = "select * from tbl_user u inner join tbl_place p on p.place_id=u.place_id inner join tbl_district d on d.district_id=p.district_id";
    db.query(sel7, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                User: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.get("/UserCond/:id", (req, res) => {
    var id = req.params.id;
    let sel7 = `select * from tbl_user u inner join tbl_place p on p.place_id=u.place_id inner join tbl_district d on d.district_id=p.district_id where u.user_id=${id}`;

    db.query(sel7, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                User: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.get("/ArchCond/:id", (req, res) => {
    var id = req.params.id;
    let sel7 = `select * from tbl_architect u inner join tbl_place p on p.place_id=u.place_id inner join tbl_district d on d.district_id=p.district_id where u.architect_id=${id}`;
    console.log(sel7);
    db.query(sel7, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                Arch: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.get("/BuilderCond/:id", (req, res) => {
    var id = req.params.id;
    let sel7 = `select * from tbl_builder u inner join tbl_place p on p.place_id=u.place_id inner join tbl_district d on d.district_id=p.district_id where u.builder_id=${id}`;
    console.log(sel7);
    db.query(sel7, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                Builder: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.post("/ArchitectReg", upload.fields([{ name: 'architect_photo', maxCount: 1 }, { name: 'architect_proof', maxCount: 1 }]), (req, res) => {

    var fileValue = JSON.parse(JSON.stringify(req.files));
    var profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.architect_photo[0].filename}`;
    var proofimgsrc = `http://127.0.0.1:${port}/images/${fileValue.architect_proof[0].filename}`;
    let qry8 = "INSERT INTO `tbl_architect`(`architect_name`, `architect_contact`, `architect_email`, `architect_address`, `place_id`, `architect_password`, `architect_gender`, `architect_photo`, `architect_proof`) VALUES ('" + req.body.architect_name + "','" + req.body.architect_contact + "','" + req.body.architect_email + "','" + req.body.architect_address + "','" + req.body.place_id + "','" + req.body.architect_password + "','" + req.body.architect_gender + "','" + profileimgsrc + "','" + proofimgsrc + "')";
    db.query(qry8, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else
            res.send({
                message: "Data Saved"
            })
    })
})

app.get("/Architect", (req, res) => {
    let sel8 = "select * from tbl_architect a inner join tbl_place p on p.place_id=a.place_id inner join tbl_district d on d.district_id=p.district_id";
    db.query(sel8, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                Architect: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.get("/ArchitectVerified", (req, res) => {
    let sel9 = "select * from tbl_architect a inner join tbl_place p on p.place_id=a.place_id inner join tbl_district d on d.district_id=p.district_id where architect_vstatus='1'";
    db.query(sel9, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                ArchitectVerified: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.get("/ArchitecRejected", (req, res) => {
    let sel10 = "select * from tbl_architect a inner join tbl_place p on p.place_id=a.place_id inner join tbl_district d on d.district_id=p.district_id where architect_vstatus='2'";
    db.query(sel10, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                ArchitectRejected: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.post("/BuilderReg", upload.fields([{ name: 'builder_photo', maxCount: 1 }, { name: 'builder_proof', maxCount: 1 }]), (req, res) => {
    var fileValue = JSON.parse(JSON.stringify(req.files));
    var profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.builder_photo[0].filename}`;
    var proofimgsrc = `http://127.0.0.1:${port}/images/${fileValue.builder_proof[0].filename}`;
    let qry9 = "INSERT INTO `tbl_builder`(`builder_name`, `builder_contact`, `builder_address`, `place_id`, `builder_password`, `builder_photo`, `builder_proof`, `builder_email`, `builder_gender`) VALUES('" + req.body.builder_name + "','" + req.body.builder_contact + "','" + req.body.builder_address + "','" + req.body.place_id + "','" + req.body.builder_password + "','" + profileimgsrc + "','" + proofimgsrc + "','" + req.body.builder_email + "','" + req.body.builder_gender + "')";
    db.query(qry9, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else
            res.send({
                message: "Data Saved"
            })
    })
})

app.get("/Builder", (req, res) => {
    let sel11 = "select * from tbl_builder b inner join tbl_place p on p.place_id=b.place_id inner join tbl_district d on d.district_id=p.district_id";
    db.query(sel11, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                Builder: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.get("/BuilderVerified", (req, res) => {
    let sel12 = "select * from tbl_builder b inner join tbl_place p on p.place_id=b.place_id inner join tbl_district d on d.district_id=p.district_id where builder_vstatus=1";
    db.query(sel12, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                BuilderVerified: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.get("/BuilderRejected", (req, res) => {
    let sel13 = "select * from tbl_builder b inner join tbl_place p on p.place_id=b.place_id inner join tbl_district d on d.district_id=p.district_id where builder_vstatus=2";
    db.query(sel13, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                BuilderRejected: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.post("/Project", upload.single("project_photo"), (req, res) => {
    console.log(req.file);
    var imgsrc = `http://127.0.0.1:${port}/images/${req.file.filename}`;
    let qry10 = "INSERT INTO `tbl_project`(`project_title`,`project_photo`, `project_details`, `project_area`, `place_id`, `project_cost`, `builder_id`, `subcategory_id`, `project_type`) VALUES ('" + req.body.project_title + "','" + imgsrc + "','" + req.body.project_details + "','" + req.body.project_area + "','" + req.body.place_id + "','" + req.body.project_cost + "','" + req.body.builder_id + "','" + req.body.subcategory_id + "','Project')";
    console.log(qry10);
    db.query(qry10, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else
            res.send({
                message: "Data Saved"
            })
    })
})

app.get("/Project/:uid", (req, res) => {
    let uid = req.params.uid;
    let sel14 = "select * from tbl_project p inner join tbl_subcategory s on s.subcategory_id=p.subcategory_id inner join tbl_category c on c.category_id=s.category_id";

    db.query(sel14, (err, result) => {
        if (err) {
            console.log("error");
        }
        else if (result.length > 0) {
            const promises = result.map(dat => {
                let sel35 = "SELECT * FROM tbl_like WHERE user_id =" + uid + " AND project_id =" + dat.project_id;
                let sel36 = "SELECT COUNT(*) AS count FROM tbl_like WHERE project_id =" + dat.project_id;
                console.log(sel35);
                console.log(sel36);
                return new Promise((resolve, reject) => {
                    db.query(sel35, [uid, dat.project_id], (err, result2) => {
                        if (err) {
                            reject(err);
                        } else {
                            db.query(sel36, [dat.project_id], (err, result3) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve({
                                        ...dat,
                                        count: result3[0].count,
                                        check: result2.length > 0,
                                    });
                                }
                            });
                        }
                    });
                });
            });

            Promise.all(promises)
                .then(updatedResult => {
                    console.log(updatedResult);
                    res.send(updatedResult);
                })
                .catch(error => {
                    res.send({
                        message: "An error occurred while fetching likes.",
                    });
                });
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    });
})

app.get("/Projectbuildermain/:uid", (req, res) => {
    let uid = req.params.uid;
    let sel14 = "select * from tbl_project p inner join tbl_subcategory s on s.subcategory_id=p.subcategory_id inner join tbl_category c on c.category_id=s.category_id";

    db.query(sel14, (err, result) => {
        if (err) {
            console.log("error");
        }
        else if (result.length > 0) {
            const promises = result.map(dat => {
                let sel35 = "SELECT * FROM tbl_like WHERE builder_id =" + uid + " AND project_id =" + dat.project_id;
                let sel36 = "SELECT COUNT(*) AS count FROM tbl_like WHERE project_id =" + dat.project_id;
                console.log(sel35);
                console.log(sel36);
                return new Promise((resolve, reject) => {
                    db.query(sel35, [uid, dat.project_id], (err, result2) => {
                        if (err) {
                            reject(err);
                        } else {
                            db.query(sel36, [dat.project_id], (err, result3) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve({
                                        ...dat,
                                        count: result3[0].count,
                                        check: result2.length > 0,
                                    });
                                }
                            });
                        }
                    });
                });
            });

            Promise.all(promises)
                .then(updatedResult => {
                    console.log(updatedResult);
                    res.send(updatedResult);
                })
                .catch(error => {
                    res.send({
                        message: "An error occurred while fetching likes.",
                    });
                });


        }
        else {
            res.send({
                message: "No data found",
            });
        }
    });

})

app.get("/Projectarch/:uid", (req, res) => {
    let uid = req.params.uid;
    let sel14 = "select * from tbl_project p inner join tbl_subcategory s on s.subcategory_id=p.subcategory_id inner join tbl_category c on c.category_id=s.category_id";

    db.query(sel14, (err, result) => {
        if (err) {
            console.log("error");
        }
        else if (result.length > 0) {
            const promises = result.map(dat => {
                let sel35 = "SELECT * FROM tbl_like WHERE architect_id =" + uid + " AND project_id =" + dat.project_id;
                let sel36 = "SELECT COUNT(*) AS count FROM tbl_like WHERE project_id =" + dat.project_id;
                console.log(sel35);
                console.log(sel36);
                return new Promise((resolve, reject) => {
                    db.query(sel35, [uid, dat.project_id], (err, result2) => {
                        if (err) {
                            reject(err);
                        } else {
                            db.query(sel36, [dat.project_id], (err, result3) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve({
                                        ...dat,
                                        count: result3[0].count,
                                        check: result2.length > 0,
                                    });
                                }
                            });
                        }
                    });
                });
            });

            Promise.all(promises)
                .then(updatedResult => {
                    console.log(updatedResult);
                    res.send(updatedResult);
                })
                .catch(error => {
                    res.send({
                        message: "An error occurred while fetching likes.",
                    });
                });


        }
        else {
            res.send({
                message: "No data found",
            });
        }
    });

})

app.get("/ProjectBuilder/:bid", (req, res) => {
    let sel15 = "select * from tbl_project p INNER JOIN tbl_builder b on p.builder_id=b.builder_id inner join tbl_place pl on pl.place_id=p.place_id inner join tbl_district d on d.district_id=pl.district_id INNER join tbl_subcategory s on s.subcategory_id=p.subcategory_id inner join tbl_category c on c.category_id=s.category_id where p.builder_id='" + req.params.bid + "'";
    console.log("Quarry", sel15);
    db.query(sel15, (err, result) => {
        if (err) {
            console.log("error");
        }
        else if (result.length > 0) {
            res.send({
                BuilderProject: result,
            })
        }
        else {
            res.send({
                BuilderProject: [],
            });
        }
    })
})

app.post("/Building", upload.single("building_photo"), (req, res) => {
    var imgsrc = `http://127.0.0.1:${port}/images/${req.file.filename}`;
    let qry11 = "INSERT INTO `tbl_project`(`project_title`,`project_photo`, `project_details`, `project_area`, `place_id`, `project_cost`, `builder_id`, `subcategory_id`, 'project_type') VALUES ('" + req.body.project_details + "','" + imgsrc + "','" + req.body.project_details + "','" + req.body.project_area + "','" + req.body.place_id + "','" + req.body.project_cost + "','" + req.body.builder_id + "','" + req.body.subcategory_id + "','Building'";
    db.query(qry11, (err, result) => {
        if (err) {
            console.log(err);
        }
        else
            res.send({
                message: "Data Saved"
            })
    })
})

app.get("/BuildingBuilder", (req, res) => {
    let sel16 = "select * from tbl_project p INNER JOIN tbl_user b on p.user_id=b.user_id inner join tbl_place pl on pl.place_id=p.place_id inner join tbl_district d on d.district_id=pl.district_id INNER join tbl_subcategory s on s.subcategory_id=p.subcategory_id inner join tbl_category c on c.category_id=s.category_id where bl.builder_id='" + req.body.builder_id + "'";
    db.query(sel16, (err, result) => {
        if (err) {
            console.log("error");
        }
        else if (result.length > 0) {
            res.send({
                BuilderBuilding: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.get("/Building", (req, res) => {
    let sel17 = "select * from tbl_building bl INNER JOIN tbl_builder b on bl.builder_id=b.builder_id inner join tbl_place pl on pl.place_id=bl.place_id inner join tbl_district d on d.district_id=pl.district_id INNER join tbl_subcategory s on s.subcategory_id=bl.subcategory_id inner join tbl_category c on c.category_id=s.category_id";
    db.query(sel17, (err, result) => {
        if (err) {
            console.log("error");
        }
        else if (result.length > 0) {
            res.send({
                BuilderBuilding: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.post("/Plan", upload.fields([{ name: 'project_photo', maxCount: 1 }, { name: 'project_file', maxCount: 1 }]), (req, res) => {
    var fileValue = JSON.parse(JSON.stringify(req.files));
    var planimgsrc = `http://127.0.0.1:${port}/images/${fileValue.project_photo[0].filename}`;
    var planfilesrc = `http://127.0.0.1:${port}/images/${fileValue.project_file[0].filename}`;
    let qry12 = "INSERT INTO `tbl_project`(`project_title`,`project_photo`, `project_details`, `project_area`, `project_cost`, `architect_id`, `subcategory_id`, `project_type`, `project_file`) VALUES ('" + req.body.project_title + "','" + planimgsrc + "','" + req.body.project_details + "','" + req.body.project_area + "','" + req.body.project_cost + "','" + req.body.architect_id + "','" + req.body.subcategory_id + "','Plan','" + planfilesrc + "')";
    console.log(qry12);
    db.query(qry12, (err, result) => {
        if (err) {
            console.log(err);
        }
        else
            res.send({
                message: "Data Saved"
            })
    })
})

app.get("/Plan", (req, res) => {
    let sel18 = "select * from tbl_project p INNER JOIN tbl_architect b on p.architect_id=b.architect_id inner join tbl_place pl on pl.place_id=p.place_id inner join tbl_district d on d.district_id=pl.district_id INNER join tbl_subcategory s on s.subcategory_id=p.subcategory_id inner join tbl_category c on c.category_id=s.category_id";
    console.log(sel18);
    db.query(sel18, (err, result) => {
        if (err) {
            console.log("error");
        }
        else if (result.length > 0) {
            res.send({
                Plan: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.get("/PlanArchitect/:plid", (req, res) => {
    let plid = req.params.plid;
    let sel19 = "select * from tbl_project p INNER JOIN tbl_architect a on p.architect_id=a.architect_id INNER join tbl_subcategory s on s.subcategory_id=p.subcategory_id inner join tbl_category c on c.category_id=s.category_id where p.architect_id='" + plid + "' and p.project_type='plan'";
    console.log(sel19);
    db.query(sel19, (err, result) => {
        if (err) {
            console.log("error");
        }
        else if (result.length > 0) {
            res.send({
                PlanArchitect: result,
            })
        }
        else {
            res.send({
                PlanArchitect: [],
                message: "No data found",
            });
        }
    })
})

app.get("/PlanCond/:plid", (req, res) => {
    let plid = req.params.plid;
    let sel19 = "select * from tbl_project p INNER JOIN tbl_architect a on p.architect_id=a.architect_id INNER join tbl_subcategory s on s.subcategory_id=p.subcategory_id inner join tbl_category c on c.category_id=s.category_id where p.project_id='" + plid + "'";
    console.log(sel19);
    db.query(sel19, (err, result) => {
        if (err) {
            console.log("error");
        }
        else if (result.length > 0) {
            res.send({
                PlanArchitect: result[0],
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.post("/login", (req, res) => {
    let id = req.params.id;
    let sel20 = "select * from tbl_admin where admin_email='" + req.body.email + "' and admin_password='" + req.body.password + "'";
    let sel21 = "select * from tbl_user where user_email='" + req.body.email + "' and user_password='" + req.body.password + "'";
    let sel22 = "select * from tbl_builder where builder_email='" + req.body.email + "' and builder_password='" + req.body.password + "' and builder_vstatus=1";
    let sel23 = "select * from tbl_architect where architect_email='" + req.body.email + "' and architect_password='" + req.body.password + "' and architect_vstatus=1";
    console.log(sel21);
    db.query(sel20, (err, result) => {
        console.log(result);
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                message: "Login Successful",
                id: result[0].admin_id,
                login: "admin"
            })
        }
    })

    db.query(sel21, (err, result) => {
        console.log(result);
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                message: "Login Successful",
                id: result[0].user_id,
                login: "user"
            })
        }
    })

    db.query(sel22, (err, result) => {
        console.log(result);
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                message: "Login Successful",
                id: result[0].builder_id,
                login: "builder"
            });
        }
    })
    db.query(sel23, (err, result) => {
        console.log(result);
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                message: "Login Successful",
                id: result[0].architect_id,
                login: "architect"
            });
        }
        else {
            res.end()

        }
    })
})

app.get("/Admin", (req, res) => {
    let sel24 = "select * from tbl_admin where admin_id='" + req.body.id + "'";
    db.query(sel24, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                admin: result,
            })

        }
    })
})

app.get("/ArchitectCond/:aid", (req, res) => {
    let aid = req.params.aid;
    let sel25 = `select * from tbl_architect a inner join tbl_place p on p.place_id=a.place_id inner join tbl_district d on d.district_id=p.district_id where architect_id='${aid}'`;
    db.query(sel25, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                Architect: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.post("/ArchitectVer/:arid", (req, res) => {
    let aid = req.params.arid;
    console.log(aid);
    let qry13 = `update tbl_architect set architect_vstatus='1' where architect_id='${aid}'`;
    console.log(qry13);
    db.query(qry13, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Architect Verified",
            })
        }
    })
})

app.post("/ArchitectRej/:arid", (req, res) => {
    let aid = req.params.arid;
    let qry14 = `update tbl_architect set architect_vstatus='2' where architect_id='${aid}'`;
    console.log(qry14);
    db.query(qry14, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Architect Rejected",
            })
        }
    })
})

app.get("/BuilderCond/:bid", (req, res) => {
    let bid = req.params.bid;
    let sel26 = `select * from tbl_builder a inner join tbl_place p on p.place_id=a.place_id inner join tbl_district d on d.district_id=p.district_id where builder_id='${bid}'`;
    db.query(sel26, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            res.send({
                Builder: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.post("/BuilderVer/:brid", (req, res) => {
    let bid = req.params.brid;
    let qry15 = `update tbl_builder set builder_vstatus='1' where builder_id='${bid}'`;
    db.query(qry15, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Builder Verified",
            })
        }
    })
})

app.post("/BuilderRej/:brid", (req, res) => {
    let bid = req.params.brid;
    let qry16 = `update tbl_builder set builder_vstatus='2' where builder_id='${bid}'`;
    db.query(qry16, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Builder Rejected",
            })
        }
    })
})



app.post("/ProjectGallery", upload.array('Images'), (req, res) => {

    const id = req.body.bid;
    const files = req.files;
    console.log(req.files);
    const sql = "INSERT INTO tbl_gallery (gallery_image , project_id) VALUES ?";
    const rows = files.map((value, index) => [
        `http://127.0.0.1:${port}/images/${files[index].filename}`,
        id
    ]);
    console.log(sql);
    console.log(rows);
    db.query(sql, [rows], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error inserting data into table');
        } else {
            res.status(200).send('Data inserted successfully');
        }
    });
})

app.get("/ProjectGallery/:id", (req, res) => {
    let pid = req.params.id;
    let sel26 = `select * from tbl_gallery where project_id='${pid}'`;
    db.query(sel26, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else if (result.length > 0) {
            console.log(result);
            res.send({
                Gallery: result,
            })
        }
        else {
            res.send({
                Gallery: [],
            });
        }
    })
})

app.post("/PurchaseUser/:dat&:da", (req, res) => {
    let aid = req.params.dat;
    let bid = req.params.da;
    console.log("hi", aid);
    let qry13 = "insert into tbl_purchase(purchase_date, plan_id, user_id) values(curdate(),'" + aid + "','" + bid + "')";
    db.query(qry13, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            let qry17 = "SELECT MAX(purchase_id) as last_purchase FROM tbl_purchase";
            db.query(qry17, (err, results) => {
                if (err) {
                    console.log("Error");
                }
                else {
                    res.send({
                        Payment: results[0].last_purchase,
                    })
                }
            })
        }
    })
})

app.post("/PurchaseArch/:dat&:da", (req, res) => {
    let aid = req.params.dat;
    let bid = req.params.da;
    console.log("hi", aid);
    let qry13 = "insert into tbl_purchase(purchase_date, plan_id, architect_id) values(curdate(),'" + aid + "','" + bid + "')";
    db.query(qry13, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            let qry17 = "SELECT MAX(purchase_id) as last_purchase FROM tbl_purchase";
            db.query(qry17, (err, results) => {
                if (err) {
                    console.log("Error");
                }
                else {
                    res.send({
                        Payment: results[0].last_purchase,
                    })
                }
            })
        }
    })
})

app.post("/PurchaseBuilder/:dat&:da", (req, res) => {
    let aid = req.params.dat;
    let bid = req.params.da;
    console.log("hi", aid);
    let qry13 = "insert into tbl_purchase(purchase_date, plan_id, builder_id) values(curdate(),'" + aid + "','" + bid + "')";
    db.query(qry13, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            let qry17 = "SELECT MAX(purchase_id) as last_purchase FROM tbl_purchase";
            db.query(qry17, (err, results) => {
                if (err) {
                    console.log("Error");
                }
                else {
                    res.send({
                        Payment: results[0].last_purchase,
                    })
                }
            })
        }
    })
})

app.post("/PaymentUpd/:pid", (req, res) => {
    let pid = req.params.pid;
    let email = req.body.email;
    console.log(email);
    let qry18 = `UPDATE tbl_purchase SET purchase_status=1 WHERE purchase_id='${pid}'`;
    console.log(qry18);
    db.query(qry18, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            let qry19 = `SELECT * FROM tbl_purchase p INNER JOIN tbl_project pl on pl.project_id=p.plan_id inner join tbl_architect a on a.architect_id=pl.architect_id WHERE purchase_id='${pid}'`;
            db.query(qry19, (err, result) => {
                if (err) {
                    console.log("Error");
                }
                else {
                    let file = result[0].project_file;
                    let plan_name = result[0].project_title;
                    let plan_details = result[0].project_details;
                    let architect_name = result[0].architect_name;
                    let plan_area = result[0].project_area;


                    let content =
                        `<!DOCTYPE html>
                    <html>
                      <head>
                        <title>Plan Details</title>
                        <style>
                          body {
                            font-family: Arial, sans-serif;
                            font-size: 14px;
                          }
                          span{
                            color:#fca61f;
                          }
                          table {
                            border-collapse: collapse;
                            margin: 20px auto;
                            width: 300px;
                          }
                          table td,
                          th {
                            padding: 8px;
                            border: 1px solid #ddd;
                          }
                          table th {
                            background-color: #f2f2f2;
                            text-align: left;
                          }
                        </style>
                      </head>
                      <body>
                        <h1 align="center"><span>Arcs</span>&<span>Angles</span>
                          <h2 align="center">Plan Details</h2>
                        <table>
                          <tr>
                            <th>Plan Name</th>
                            <td>${plan_name}</td>
                          </tr>
                          <tr>
                            <th>Details</th>
                            <td>${plan_details}</td>
                          </tr>
                          <tr>
                            <th>Architect</th>
                            <td>${architect_name}</td>
                          </tr>
                          <tr>
                            <th>Area</th>
                            <td>${plan_area}</td>
                          </tr>
                        </table>
                      </body>
                    </html>
                    `;

                    axios({
                        method: 'get',
                        url: file,
                        responseType: 'arraybuffer'
                    }).then(function (response) {

                        const extension = path.extname(file);
                        const fileName = plan_name + extension;

                        sendEmail(email, content, fileName, Buffer.from(response.data, 'binary'));
                    });
                    res.send({
                        message: "Purchase Completed",
                    });
                }
            })
        }
    })
})

var transporter = mailer.createTransport({
    service: "gmail",
    auth: {
        user: "anglesnarcs@gmail.com", //from email Id
        pass: "uttfqoevogxpsalg", // App password created from google account
    },
});
function sendEmail(to, content, filename, filecontent) {
    const mailOptions = {
        from: "anglesnarcs@gmail.com", //from email Id for recipient can view
        to,
        subject: "Purchased Plan",
        html: content,
        attachments: [
            {
                filename: filename,
                content: filecontent,
                encoding: 'base64'
            }
        ],
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sented");
        }
    });
}

app.get("/Projectcond/:prid", (req, res) => {
    let prid = req.params.prid;
    let sel22 = `select * from tbl_project p INNER JOIN tbl_builder b on p.builder_id=b.builder_id inner join tbl_place pl on pl.place_id=p.place_id inner join tbl_district d on d.district_id=pl.district_id INNER join tbl_subcategory s on s.subcategory_id=p.subcategory_id inner join tbl_category c on c.category_id=s.category_id where p.project_id='${prid}'`;
    db.query(sel22, (err, result) => {
        if (err) {
            console.log("error");
        }
        else if (result.length > 0) {
            res.send({
                Project: result[0],
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.get("/Purchases/:id", (req, res) => {
    let id = req.params.id;
    let sel23 = `SELECT * FROM tbl_purchase pr INNER join tbl_project p on p.project_id=pr.plan_id INNER JOIN tbl_architect a on p.architect_id=a.architect_id INNER join tbl_subcategory s on s.subcategory_id=p.subcategory_id inner join tbl_category c on c.category_id=s.category_id where pr.user_id='${id}'`;
    console.log(sel23);
    db.query(sel23, (err, result) => {
        if (err) {
            console.log("error");
        }
        else if (result.length > 0) {
            res.send({
                Purchase: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.get("/PurchasesArch/:id", (req, res) => {
    let id = req.params.id;
    let sel23 = `SELECT * FROM tbl_purchase pr INNER join tbl_project p on p.project_id=pr.plan_id INNER JOIN tbl_architect a on p.architect_id=a.architect_id INNER join tbl_subcategory s on s.subcategory_id=p.subcategory_id inner join tbl_category c on c.category_id=s.category_id where pr.architect_id='${id}'`;
    console.log(sel23);
    db.query(sel23, (err, result) => {
        if (err) {
            console.log("error");
        }
        else if (result.length > 0) {
            res.send({
                Purchase: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.get("/PurchasesBuilder/:id", (req, res) => {
    let id = req.params.id;
    let sel23 = `SELECT * FROM tbl_purchase pr INNER join tbl_project p on p.project_id=pr.plan_id INNER JOIN tbl_architect a on p.architect_id=a.architect_id INNER join tbl_subcategory s on s.subcategory_id=p.subcategory_id inner join tbl_category c on c.category_id=s.category_id where pr.builder_id='${id}'`;
    console.log(sel23);
    db.query(sel23, (err, result) => {
        if (err) {
            console.log("error");
        }
        else if (result.length > 0) {
            res.send({
                Purchase: result,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.post("/userbuilderchat", (req, res) => {
    let insqry1 = `insert into tbl_chat(chat_content, chat_datetime, to_builderid, from_userid) values('` + req.body.chat + `',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'), '` + req.body.bid + `','` + req.body.uid + `')`;
    console.log(insqry1);
    db.query(insqry1, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                message: "Chat Inserted",
            });
        }
    })
})

app.post("/builderBuilderchat", (req, res) => {
    let insqry1 = `insert into tbl_chat(chat_content, chat_datetime, to_builderid, from_builderid) values('` + req.body.chat + `',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'), '` + req.body.blid + `','` + req.body.bid + `')`;
    console.log(insqry1);
    db.query(insqry1, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                message: "Chat Inserted",
            });
        }
    })
})

app.post("/builderarchitectchat", (req, res) => {
    let insqry1 = `insert into tbl_chat(chat_content, chat_datetime, to_architectid, from_builderid) values('` + req.body.chat + `',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'), '` + req.body.aid + `','` + req.body.bid + `')`;
    console.log(insqry1);
    db.query(insqry1, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                message: "Chat Inserted",
            });
        }
    })
})

app.post("/userarchchat", (req, res) => {
    let insqry1 = `insert into tbl_chat(chat_content, chat_datetime, to_architectid, from_userid) values('` + req.body.chat + `',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'), '` + req.body.aid + `','` + req.body.uid + `')`;
    console.log(insqry1);
    db.query(insqry1, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                message: "Chat Inserted",
            });
        }
    })
})

app.post("/archuserchat", (req, res) => {
    let insqry1 = `insert into tbl_chat(chat_content, chat_datetime, from_architectid, to_userid) values('` + req.body.chat + `',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'), '` + req.body.aid + `','` + req.body.uid + `')`;
    console.log(insqry1);
    db.query(insqry1, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                message: "Chat Inserted",
            });
        }
    })
})

app.post("/builderuserchat", (req, res) => {
    let insqry1 = `insert into tbl_chat(chat_content, chat_datetime, from_builderid, to_userid) values('` + req.body.chat + `',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'), '` + req.body.bid + `','` + req.body.uid + `')`;
    console.log(insqry1);
    db.query(insqry1, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                message: "Chat Inserted",
            });
        }
    })
})

app.post("/archbuilderchat", (req, res) => {
    let insqry2 = `insert into tbl_chat(chat_content, chat_datetime, from_architectid, to_builderid) values('` + req.body.chat + `',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'), '` + req.body.aid + `','` + req.body.bid + `')`;
    db.query(insqry2, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                message: "Chat Inserted",
            });
        }
    })
})

app.post("/archarchitectchat", (req, res) => {
    let insqry2 = `insert into tbl_chat(chat_content, chat_datetime, from_architectid, to_architectid) values('` + req.body.chat + `',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'), '` + req.body.aid + `','` + req.body.archid + `')`;
    db.query(insqry2, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                message: "Chat Inserted",
            });
        }
    })
})

app.get("/archuserchat", (req, res) => {
    let sel27 = `select * from tbl_chat where from_architectid='` + req.body.aid + `' and to_userid='` + req.body.uid + `'`;
    // console.log(sel27);
    db.query(sel27, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                ArchUser: result,
            });
        }
    })
})

app.get("/userbuilderchat/:uid&:bid", (req, res) => {
    console.log(req.params.bid);
    let sel28 = "select * from tbl_chat where (to_builderid='" + req.params.bid + "' or from_builderid='" + req.params.bid + "') order by chat_id desc";
    console.log(sel28);
    db.query(sel28, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                Chat: result,
            });
        }
    })
})

app.get("/userarchchat/:uid&:aid", (req, res) => {
    let sel28 = "select * from tbl_chat where (to_architectid='" + req.params.aid + "' or from_architectid='" + req.params.aid + "') and (to_userid='" + req.params.uid + "' or from_userid='" + req.params.uid + "') order by chat_id desc";
    console.log(sel28);
    db.query(sel28, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                Chat: result,
            });
        }
    })
})

app.get("/builderarchchat/:bid&:aid", (req, res) => {
    let sel28 = "select * from tbl_chat where (to_architectid='" + req.params.aid + "' or from_architectid='" + req.params.aid + "') and (to_builderid='" + req.params.bid + "' or from_builderid='" + req.params.bid + "') order by chat_id desc";
    console.log(sel28);
    db.query(sel28, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                Chat: result,
            });
        }
    })
})

app.get("/architectarchchat/:archid&:aid", (req, res) => {
    let sel28 = "select * from tbl_chat where (to_architectid='" + req.params.aid + "' or from_architectid='" + req.params.aid + "') and (to_architectid='" + req.params.archid + "' or from_architectid='" + req.params.archid + "') order by chat_id desc";
    console.log(sel28);
    db.query(sel28, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                Chat: result,
            });
        }
    })
})

app.get("/builderuserchat/:bid&:uid", (req, res) => {
    let sel28 = "select * from tbl_chat where (to_userid='" + req.params.uid + "' or from_userid='" + req.params.uid + "') and (to_builderid='" + req.params.bid + "' or from_builderid='" + req.params.bid + "') order by chat_id desc";
    console.log(sel28);
    db.query(sel28, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                Chat: result,
            });
        }
    })
})

app.get("/builderBuilderchat/:bid&:blid", (req, res) => {
    let sel28 = "select * from tbl_chat where (to_builderid='" + req.params.blid + "' or from_builderid='" + req.params.blid + "') and (to_builderid='" + req.params.bid + "' or from_builderid='" + req.params.bid + "') order by chat_id desc";
    console.log(sel28);
    db.query(sel28, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                Chat: result,
            });
        }
    })
})

app.get("/builderarchitectchat/:bid&:aid", (req, res) => {
    let sel28 = "select * from tbl_chat where (to_architectid='" + req.params.aid + "' or from_architectid='" + req.params.aid + "') and (to_builderid='" + req.params.bid + "' or from_builderid='" + req.params.bid + "') order by chat_id desc";
    console.log(sel28);
    db.query(sel28, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                Chat: result,
            });
        }
    })
})

// app.get("/chat/", (req,res)=>{
//     console.log("hi");
//     let sel29=`select * from tbl_chat`;
//     // console.log(sel27);
//     db.query(sel29, (err, result) =>{
//         if(err) {
//             console.log("error");
//         }
//         else{
//             res.send({
//                 Chat: result,
//             });
//         }
//     })
// })

app.post("/userlikeproject/:id&:pid", (req, res) => {
    let uid = req.params.id;
    let prid = req.params.pid;
    let insqry3 = `insert into tbl_like(user_id, project_id) values('` + uid + `','` + prid + `')`;
    console.log(insqry3);
    db.query(insqry3, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                message: "Liked"
            })
        }
    })
})


app.delete("/userlikeDeleteproject/:id&:pid", (req, res) => {
    let uid = req.params.id;
    let prid = req.params.pid;
    let del1 = `delete from tbl_like where user_id='${uid}' and project_id ='${prid}'`;
    console.log(del1);
    db.query(del1, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Data Deleted",
            });
        }
    })
})

app.get("/likeproject/:pid", (req, res) => {
    let prid = req.params.pid;
    let sel30 = `select count(*) as count from tbl_like where project_id='` + prid + `'`;
    console.log(sel30);
    db.query(sel30, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                message: result
            })
        }
    })
})

app.get("/likecheckuser/:uid&:pid", (req, res) => {
    let uid = req.params.uid;
    let pid = req.params.pid;
    let sel30 = `select * from tbl_like where user_id='` + uid + `' and project_id='` + pid + `'`;
    let del1 = `delete from tbl_like where user_id='${uid}' and project_id ='${pid}'`;
    db.query(sel30, (err, result) => {
        if (err) {
            console.log("error");
        }
        else if (result.length > 0) {
            db.query(del1, (err, result2) => {
                if (err) {
                    console.log("Error");
                }
                else {
                    res.send({
                        message: "Unliked",
                    });
                }
            })
        }
        else {
            let insqry3 = `insert into tbl_like(user_id, project_id) values('` + uid + `','` + pid + `')`;
            db.query(insqry3, (err, result3) => {
                if (err) {
                    console.log("error");
                }
                else {
                    res.send({
                        message: "Liked"
                    })
                }
            })
        }

    })
})

app.get("/likecheckbuilder/:uid&:pid", (req, res) => {
    let uid = req.params.uid;
    let pid = req.params.pid;
    let sel30 = `select * from tbl_like where builder_id='` + uid + `' and project_id='` + pid + `'`;
    let del1 = `delete from tbl_like where builder_id='${uid}' and project_id ='${pid}'`;
    db.query(sel30, (err, result) => {
        if (err) {
            console.log("error");
        }
        else if (result.length > 0) {
            db.query(del1, (err, result2) => {
                if (err) {
                    console.log("Error");
                }
                else {
                    res.send({
                        message: "Unliked",
                    });
                }
            })
        }
        else {
            let insqry3 = `insert into tbl_like(builder_id, project_id) values('` + uid + `','` + pid + `')`;
            db.query(insqry3, (err, result3) => {
                if (err) {
                    console.log("error");
                }
                else {
                    res.send({
                        message: "Liked"
                    })
                }
            })
        }

    })
})

app.get("/likecheckarch/:uid&:pid", (req, res) => {
    let uid = req.params.uid;
    let pid = req.params.pid;
    let sel30 = `select * from tbl_like where architect_id='` + uid + `' and project_id='` + pid + `'`;
    let del1 = `delete from tbl_like where architect_id='${uid}' and project_id ='${pid}'`;
    db.query(sel30, (err, result) => {
        if (err) {
            console.log("error");
        }
        else if (result.length > 0) {
            db.query(del1, (err, result2) => {
                if (err) {
                    console.log("Error");
                }
                else {
                    res.send({
                        message: "Unliked",
                    });
                }
            })
        }
        else {
            let insqry3 = `insert into tbl_like(architect_id, project_id) values('` + uid + `','` + pid + `')`;
            db.query(insqry3, (err, result3) => {
                if (err) {
                    console.log("error");
                }
                else {
                    res.send({
                        message: "Liked"
                    })
                }
            })
        }

    })
})

app.post("/userlikeplan/:id&:pid", (req, res) => {
    let uid = req.params.id;
    let plid = req.params.pid;
    let insqry4 = `insert into tbl_like(user_id, plan_id) values('` + uid + `','` + plid + `')`;
    console.log(insqry4);
    db.query(insqry4, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                message: "Liked"
            })
        }
    })
})

app.get("/likeplan/:pid", (req, res) => {
    let plid = req.params.pid;
    let sel31 = `select count(*) as count from tbl_like where plan_id='` + plid + `'`;
    db.query(sel31, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                message: result
            })
        }
    })
})

app.post("/usercommentproject", (req, res) => {
    console.log(req.body.userid);
    console.log(req.body.projectid.projectid);
    console.log(req.body.comment);
    // let uid=req.body.userid;
    // let prid=req.body.projectid;
    // let cm=req.body.comment;
    let insqry5 = `insert into tbl_feedback(user_id, project_id, feedback_review, feedback_datetime) values('` + req.body.userid + `','` + req.body.projectid.projectid + `','` + req.body.comment + `',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'))`;
    console.log(insqry5);
    db.query(insqry5, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                message: "Comment Posted"
            })
        }
    })
})

app.post("/buildercommentproject", (req, res) => {
    let insqry5 = `insert into tbl_feedback(builder_id, project_id, feedback_review, feedback_datetime) values('` + req.body.builderid + `','` + req.body.projectid.projectid + `','` + req.body.comment + `',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'))`;
    console.log(insqry5);
    db.query(insqry5, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                message: "Comment Posted"
            })
        }
    })
})

app.post("/architectcommentproject", (req, res) => {
    let insqry5 = `insert into tbl_feedback(architect_id, project_id, feedback_review, feedback_datetime) values('` + req.body.architectid + `','` + req.body.projectid.projectid + `','` + req.body.comment + `',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'))`;
    console.log(insqry5);
    db.query(insqry5, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                message: "Comment Posted"
            })
        }
    })
})


app.get("/usercommentproject/:pid", (req, res) => {
    let prid = req.params.pid;
    let sel32 = `select * from tbl_feedback where project_id='` + prid + `'`;
    console.log(sel32);
    db.query(sel32, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                Comment: result
            })
        }
    })
})

app.post("/usercommentplan", (req, res) => {
    console.log(req.body.userid);
    console.log(req.body.planid.planid);
    console.log(req.body.comment);
    // let uid=req.body.userid;
    // let prid=req.body.projectid;
    // let cm=req.body.comment;
    let insqry5 = `insert into tbl_feedback(user_id, plan_id, feedback_review, feedback_datetime) values('` + req.body.userid + `','` + req.body.planid.planid + `','` + req.body.comment + `',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'))`;
    console.log(insqry5);
    db.query(insqry5, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                message: "Comment Posted"
            })
        }
    })
})

app.get("/usercommentplan/:pid", (req, res) => {
    let plid = req.params.pid;
    let sel32 = `select * from tbl_feedback where plan_id='` + plid + `'`;
    console.log(sel32);
    db.query(sel32, (err, result) => {
        if (err) {
            console.log("error");
        }
        else {
            res.send({
                Comment: result
            })
        }
    })
})

app.post("/chatattachmentuserbuilder/", upload.single('attachment'), (req, res) => {
    var imgsrc = `http://127.0.0.1:${port}/images/${req.file.filename}`;
    console.log(imgsrc);

    const qry20 = "INSERT INTO tbl_chat (chat_attachment, from_userid, to_builderid, chat_datetime) VALUES('" + imgsrc + "','" + req.body.uid + "','" + req.body.bid + "',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'))";
    console.log(qry20);

    db.query(qry20, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Data Saved"
            })
        }
    })
})

app.post("/chatattachmentbuilderuser/", upload.single('attachment'), (req, res) => {
    var imgsrc = `http://127.0.0.1:${port}/images/${req.file.filename}`;
    console.log(imgsrc);

    const qry20 = "INSERT INTO tbl_chat (chat_attachment, from_builderid, to_userid, chat_datetime) VALUES('" + imgsrc + "','" + req.body.bid + "','" + req.body.uid + "',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'))";
    console.log(qry20);

    db.query(qry20, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Data Saved"
            })
        }
    })
})

app.post("/chatattachmentbuilderBuilder/", upload.single('attachment'), (req, res) => {
    var imgsrc = `http://127.0.0.1:${port}/images/${req.file.filename}`;
    console.log(imgsrc);

    const qry20 = "INSERT INTO tbl_chat (chat_attachment, from_builderid, to_builderid, chat_datetime) VALUES('" + imgsrc + "','" + req.body.bid + "','" + req.body.blid + "',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'))";
    console.log(qry20);

    db.query(qry20, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Data Saved"
            })
        }
    })
})

app.post("/chatattachmentbuilderarchitect/", upload.single('attachment'), (req, res) => {
    var imgsrc = `http://127.0.0.1:${port}/images/${req.file.filename}`;
    const qry20 = "INSERT INTO tbl_chat (chat_attachment, from_builderid, to_architectid, chat_datetime) VALUES('" + imgsrc + "','" + req.body.bid + "','" + req.body.aid + "',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'))";
    console.log(qry20);

    db.query(qry20, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Data Saved"
            })
        }
    })
})

app.post("/chatattachmentarchuser/", upload.single('attachment'), (req, res) => {
    var imgsrc = `http://127.0.0.1:${port}/images/${req.file.filename}`;
    const qry20 = "INSERT INTO tbl_chat (chat_attachment, from_architectid, to_userid, chat_datetime) VALUES('" + imgsrc + "','" + req.body.aid + "','" + req.body.uid + "',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'))";

    db.query(qry20, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Data Saved"
            })
        }
    })
})

app.post("/chatattachmentarchbuilder/", upload.single('attachment'), (req, res) => {
    var imgsrc = `http://127.0.0.1:${port}/images/${req.file.filename}`;
    const qry20 = "INSERT INTO tbl_chat (chat_attachment, from_architectid, to_builderid, chat_datetime) VALUES('" + imgsrc + "','" + req.body.aid + "','" + req.body.bid + "',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'))";
    db.query(qry20, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Data Saved"
            })
        }
    })
})

app.post("/chatattachmentarcharchitect/", upload.single('attachment'), (req, res) => {
    var imgsrc = `http://127.0.0.1:${port}/images/${req.file.filename}`;
    const qry20 = "INSERT INTO tbl_chat (chat_attachment, from_architectid, to_architectid, chat_datetime) VALUES('" + imgsrc + "','" + req.body.aid + "','" + req.body.archid + "',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'))";
    console.log(qry20);

    db.query(qry20, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Data Saved"
            })
        }
    })
})

app.post("/chatattachmentuserarch/", upload.single('attachment'), (req, res) => {
    var imgsrc = `http://127.0.0.1:${port}/images/${req.file.filename}`;
    console.log(imgsrc);

    const qry20 = "INSERT INTO tbl_chat (chat_attachment, from_userid, to_architectid, chat_datetime) VALUES('" + imgsrc + "','" + req.body.uid + "','" + req.body.aid + "',DATE_FORMAT(sysdate(), '%M %d %Y, %h:%i %p'))";
    console.log(qry20);

    db.query(qry20, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Data Saved"
            })
        }
    })
})

app.get("/chatlist/:uid", (req, res) => {
    let uid = req.params.uid;
    let sel32 = `SELECT b2.builder_id, a2.architect_id, u.user_name AS from_user, b.builder_name AS from_builder, a.architect_name AS from_architect,
    u2.user_name AS to_user, b2.builder_name AS to_builder, a2.architect_name AS to_architect
FROM tbl_chat c
LEFT JOIN tbl_user u ON c.from_userid = u.user_id
LEFT JOIN tbl_user u2 ON c.to_userid = u2.user_id
LEFT JOIN tbl_builder b ON c.from_builderid = b.builder_id
LEFT JOIN tbl_builder b2 ON c.to_builderid = b2.builder_id
LEFT JOIN tbl_architect a ON c.from_architectid = a.architect_id
LEFT JOIN tbl_architect a2 ON c.to_architectid = a2.architect_id where u.user_id=`+ uid;


    db.query(sel32, (err, result1) => {
        if (err) {
            console.log("error");
        }
        else if (result1.length > 0) {
            res.send({
                List: result1,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})


app.get("/chatlistbuilder/:bid", (req, res) => {
    let bid = req.params.bid;
    let sel32 = `SELECT b2.builder_id, a2.architect_id, u.user_name AS from_user, b.builder_name AS from_builder, a.architect_name AS from_architect,
    u2.user_name AS to_user, b2.builder_name AS to_builder, a2.architect_name AS to_architect
FROM tbl_chat c
LEFT JOIN tbl_user u ON c.from_userid = u.user_id
LEFT JOIN tbl_user u2 ON c.to_userid = u2.user_id
LEFT JOIN tbl_builder b ON c.from_builderid = b.builder_id
LEFT JOIN tbl_builder b2 ON c.to_builderid = b2.builder_id
LEFT JOIN tbl_architect a ON c.from_architectid = a.architect_id
LEFT JOIN tbl_architect a2 ON c.to_architectid = a2.architect_id where b.builder_id=`+ bid;


    db.query(sel32, (err, result1) => {
        if (err) {
            console.log("error");
        }
        else if (result1.length > 0) {
            res.send({
                List: result1,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.get("/chatlistarch/:aid", (req, res) => {
    let aid = req.params.aid;
    let sel32 = `SELECT u.user_id, b2.builder_id, a2.architect_id, u.user_name AS from_user, b.builder_name AS from_builder, a.architect_name AS from_architect,
    u2.user_name AS to_user, b2.builder_name AS to_builder, a2.architect_name AS to_architect
FROM tbl_chat c
LEFT JOIN tbl_user u ON c.from_userid = u.user_id
LEFT JOIN tbl_user u2 ON c.to_userid = u2.user_id
LEFT JOIN tbl_builder b ON c.from_builderid = b.builder_id
LEFT JOIN tbl_builder b2 ON c.to_builderid = b2.builder_id
LEFT JOIN tbl_architect a ON c.from_architectid = a.architect_id
LEFT JOIN tbl_architect a2 ON c.to_architectid = a2.architect_id where a2.architect_id=`+ aid;
    console.log(sel32);

    db.query(sel32, (err, result1) => {
        if (err) {
            console.log("error");
        }
        else if (result1.length > 0) {
            res.send({
                List: result1,
            })
        }
        else {
            res.send({
                message: "No data found",
            });
        }
    })
})

app.post("/materialcost", (req, res) => {
    let insqry6 = "insert into tbl_material (material_date, material_brick, material_rebar, material_cement, material_steel, material_wood) values(curdate(), '" + req.body.brick + "', '" + req.body.rebar + "', '" + req.body.cement + "', '" + req.body.steel + "', '" + req.body.wood + "')";
    db.query(insqry6, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "Data Saved"
            })
        }
    })
})

app.get("/materialcost", (req, res) => {
    let sel34 = "select * from tbl_material";
    console.log(sel34);
    db.query(sel34, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                Material: result
            })
        }
    })
})

app.get("/purchasereport", (req, res) => {
    let sel34 = "SELECT * FROM tbl_purchase p INNER JOIN tbl_project pr on p.plan_id=pr.project_id";
    console.log(sel34);
    db.query(sel34, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                Purchase: result
            })
        }
    })
})

app.post("/upload3d", upload.single("file3d"), (req, res) => {
    var file = `http://127.0.0.1:${port}/images/${req.file.filename}`;
    let insqry = "insert into tbl_gallery(gallery_image, project_id) values('" + file + "','" + req.body.projectid + "')";
    console.log(file);
    console.log(insqry);
    db.query(insqry, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                message: "3D Uploaded"
            })
        }
    })
})

app.get("/upload3d/:pid", (req, res) => {
    let sel34 = "SELECT * FROM tbl_gallery where project_id=" + req.params.pid;
    console.log(sel34);
    db.query(sel34, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send({
                Render: result[0]
            })
        }
    })
})