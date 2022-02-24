// const Sequelize     = require('sequelize');
// const usuario       = require('../models/users');
const { User }  = require('../sequalize');
const { Op, json } = require("sequelize");
const fs    = require("fs");
const xlsx = require('node-xlsx');

async function getUsers(req, res){
    const logUser = await User.findAll().catch(console.error);
    return res.status(200).send({
        error: null,
        response: logUser,
    })
   
}
async function readFile(req, res){
    // console.log('res',req.files.file);
    if(!req.files){
        return res.status(200).send({ msg: "file is not found" })
    }
    const myFile = req.files.file;
    // const content = fs.readFileSync(myFile);
    const fecha = new Date();
    const nuevoNombre = fecha.getTime()+'_'+myFile.name;
    let dataFile = [];
    await  myFile.mv('./uploads/'+nuevoNombre).catch( (err) =>{
        console.log('error al mover',err);
    }).then( async (val) =>{
        console.log('upload file succes');
        const jsonOpts = {
            header: 1,
            defval: '',
            blankrows: true,
            raw: false,
            dateNF: 'd"/"m"/"yyyy' // 
          }
        const workSheetsFromBuffer = xlsx.parse('./uploads/'+nuevoNombre,jsonOpts);
        dataFile = workSheetsFromBuffer[0].data;
        // console.log(workSheetsFromBuffer[0].data);
    }).catch((err)=>{
        console.log('error mover archivo');
    });
    // eliminamos la primera posicion del arreglo (Titulos)
    dataFile.splice(0, 1);
    let uploadFile = [];
    dataFile.forEach(element => {
        uploadFile.push({
            userId : element[0],
            userName : element[1],
            date : element[2],
            punchIn : element[3],
            punchOut : element[4],
        })
    });
    console.log(uploadFile);
    await User.bulkCreate(uploadFile);
    const allUsers = await User.findAll().catch(console.error);
    return res.status(200).send({
        error: null,
        response: allUsers,
    })
}
async function deleteUser(req, res){
    await User.destroy({ where: { id: req.body.id} }).catch(console.error);
    return res.status(200).send({
        error: null,
        response: 'Delete',
    })
}
async function createUser(req, res){
    const data = req.body;
    console.log({data:data});
    const userNew = await User.create({
        userId: data.userId,
        userName: data.userName,
        date: data.date,
        punchIn: data.punchIn,
        punchOut: data.punchOut
    }).catch(console.error);
    const logUser = await User.findAll().catch(console.error);
    return res.status(200).send({
        error: null,
        response: logUser,
    })
}
async function EditUser(req, res){
    const data = req.body;
    await User.update({
        userId: data.userId,
        userName: data.userName,
        date: data.date,
        punchIn: data.punchIn,
        punchOut: data.punchOut
    }, {
        where: {
            id: data.id,
        }
    }).catch(console.error);
    const alluser = await User.findAll().catch(console.error);
    return res.status(200).send({
        error: null,
        response: alluser,
    })
}
module.exports = {
    getUsers,
    readFile,
    deleteUser,
    createUser,
    EditUser
};
/*module.exports = {
 create(req, res) {
    return usuario
        .create ({
             username: req.params.username,
             status: req.params.status
        })
        .then(usuario => res.status(200).send(usuario))
        .catch(error => res.status(400).send(error))
 },
 list(_, res) {
     return usuario.findAll({})
        .then(usuario => res.status(200).send(usuario))
        .catch(error => res.status(400).send(error))
 },
 find (req, res) {
     return usuario.findAll({
         where: {
             username: req.params.username,
         }
     })
     .then(usuario => res.status(200).send(usuario))
     .catch(error => res.status(400).send(error))
  },
};*/