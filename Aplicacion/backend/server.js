const express= require('express');
var path = require('path');
const User = require('../schemas/Users')
const followList = require('../schemas/FollowList')
const session=require('express-session');
const connection= require('./mysql');
bodyParser = require('body-parser')
const app=express();
//settings for
app.use(bodyParser.json());
app.set('port', process.env.PORT || 4000);
//middlewares
app.use(express.urlencoded({ extended:false}));
//creacion de sesion y guardar la informacion del usuario
app.use(session({
    cookie:{
        maxAge: 1000*60*60*2,
        sameSite:true   
    },
    name:'sid',
    resave:false,
    secret:'secret!!'
}))
const redirectLogin = (req,res,next)=>{
    if(!req.session.userId){
        res.redirect('/signIn.html')
    }
    else{
       next();
    }
}
const redirectHome = (req,res,next)=>{
    if(req.session.userId){
        res.redirect('/home.html')
    }
    else{
       next();
    }
}
//Global variables

//Routes
app.get('/',redirectHome,(req,res) => {
    const {userId} = req.session;
    res.sendFile(path.join(__dirname, '..', '/frontend/index.html'))
})
//variables por default por si no existe el partido o no ha recibido nada
var PartidoSeguido=1;
var Equipo1="TSM";
var Equipo2="V1";
//obtener todos los partidos de la base de datos sql y hacer un fetch en el frontend
app.get('/homedata', (req,res) => {
    connection.query(`SELECT * FROM partidos`, (err,rows) => {
        if(err) throw err;
        res.json(rows);
      });
     
})
var teamToSearch
//obtiene nombre de equipo seleccionado y lo manda a una variable para poder obtener los valores de la base de datos
app.post('/filteredData', (req,res) => {
      teamToSearch = req.body.team;
      res.redirect('/filterHome');
})
//obtener informacion filtrada para equipo seleccionado en la pagina de equipos a seguir/seguidos
app.get('/Hometeam',(req,res)=>{
    connection.query(`SELECT * FROM partidos where Equipo1="${teamToSearch}" or Equipo2="${teamToSearch}";`, (err,rows) => {
      if(err) throw err;
      res.json(rows);
     });  
})
app.get('/filterHome',(req,res)=>{
    res.sendFile(path.join(__dirname, '..', '/frontend/homeFiltered.html'))
})
//obtener informacion del partido seleccionado desde la pagina de inicio
app.get('/matchData', (req,res) => {
    connection.query(`SELECT * FROM partidos where idpartidos=${PartidoSeguido}`, (err,rows) => {
        if(err) throw err;
        Equipo1=rows[0].Equipo1
        Equipo2=rows[0].Equipo2
        res.json(rows);
      });    
})
//obtiene miembros de cada equipo para presentar en la informacion del partido
app.get('/teamData', (req,res) => {
    connection.query(`SELECT * FROM integrantes where Equipo="${Equipo1}" or Equipo="${Equipo2}";`, (err,rows) => {
        if(err) throw err;
        res.json(rows);
      });    
})
//obtiene todos los equipos de la base de datos
app.get('/teamsBD', (req,res) => {
    connection.query(`SELECT * FROM equipos;`, (err,rows) => {
        if(err) throw err;
        res.json(rows);
      });    
})
//encuentra lista de equipos que sigue el usuario para desplegar la informacion
app.get('/followedByuser',async (req,res)=>{
    var teamList= await followList.findOne({username:req.session.userId})
    res.json(teamList)
})
//recibe el request del boton de pagina de inicio para guardar el id del partido a consultar
app.post('/MatchStats', (req,res)=>{
    PartidoSeguido= req.body.username;
    res.redirect('/Match')
})
//agrega equipo a la base de datos
app.post('/addMatch', (req,res)=>{
    const {Equipo1, Equipo2,puntosE1,puntosE2,stream,Fecha}=req.body;
    connection.query(`INSERT INTO partidos (Equipo1, Equipo2, puntosEquipo1, puntosEquipo2, Fecha, Stream, FInalizado) VALUES ('${Equipo1}', '${Equipo2}','${puntosE1}', '${puntosE2}', '${Fecha}', '${stream}',0);
    `, (err,rows) => {
        if(err) throw err;
        console.log("agregado")
      }); 
    res.redirect('/admin')
})
//actualiza un partido en la bd
app.post('/updateMatch', (req,res)=>{
    const {Equipo1,Equipo2,Fecha,Marcador1,Marcador2}=req.body;
    connection.query(   `UPDATE partidos SET puntosEquipo1 = '${Marcador1}', puntosEquipo2 = '${Marcador2}', FInalizado = '1' WHERE (Equipo1 = "${Equipo1}" and Equipo2 = "${Equipo2}"  and Fecha="${Fecha}");`, 
    (err,rows) => {
        if(err) throw err;
        console.log("Partido Eliminado")
    }); 
    //update
    res.redirect('/admin')
})
//agrega un equipo a la base de datos
app.post('/addTeam', (req,res)=>{
    const {siglasEquipo,NombreEquipo}= req.body;
    connection.query(`INSERT INTO equipos (siglasEquipo, nombreEquipo) VALUES ('${siglasEquipo}', '${NombreEquipo}');`, (err,rows) => {
        if(err) throw err;
        console.log("Equipo agregado")
      }); 
    res.redirect('/admin')
})
//elimina un partido de la base de datos
app.post('/deleteMatch', (req,res)=>{
    const {Equipo1,Equipo2,Fecha}=req.body;
    connection.query(`DELETE FROM partidos WHERE (Equipo1 = "${Equipo1}" and Equipo2 = "${Equipo2}"  and Fecha="${Fecha}");`, (err,rows) => {
        if(err) throw err;
        console.log("Partido Eliminado")
      }); 
    res.redirect('/admin')
})
//añade integrantes del equipo a la base de datos
app.post('/addTeamMembers', (req,res)=>{
    const {Equipo,Miembro1,Agent1,Miembro2,Agent2,Miembro3,Agent3,Miembro4,Agent4,Miembro5,Agent5}=req.body;
    var members=[Miembro1,Miembro2,Miembro3,Miembro4,Miembro5];
    var agents=[Agent1,Agent2,Agent3,Agent4,Agent5];
    var i;
    for(i=0;i<5;i++){
        connection.query(`INSERT INTO integrantes (integrante, Equipo, mainAgent) VALUES ('${members[i]}', '${Equipo}', '${agents[i]}');`, (err,rows) => {
            if(err) throw err;
            console.log("Integrante Agregado")
          });
    }
    res.redirect('/admin')
})
//obtiene pagina de inicio de sesion
app.post('/addToList', async (req, res) => {
   
    var teamList= await followList.findOne({username:req.session.userId})
    if(!teamList)
    {
        const newFollowList= new followList({username:req.session.userId,followedTeams:[]});
        await newFollowList.save();
        res.redirect('/teams')
    }
    else
    {
       var newArray= teamList.followedTeams;
       newArray.push(req.body.team)
       var myquery = {username:req.session.userId};
       var newvalues = { $set: {followedTeams: newArray} };
       followList.updateOne(myquery, newvalues, function(err, res) {
         if (err) throw err;
       });
       res.redirect('/teams')
    }
})
//elimina un equipo de la lista de seguidos del usuario
app.post('/unfollowTeam', async (req, res) => {
    var teamList= await followList.findOne({username:req.session.userId})
    if(!teamList)
    {
        res.redirect('/teams')
    }
    else
    {
       var i;
       var newArray= [];
       for(i=0; i<teamList.followedTeams.length;i++)
       {
           if(teamList.followedTeams[i]!=req.body.team)
           {
            newArray.push(teamList.followedTeams[i])
           }
       }
       var myquery = {username:req.session.userId};
       var newvalues = { $set: {followedTeams: newArray} };
       followList.updateOne(myquery, newvalues, function(err, res) {
         if (err) throw err;
         console.log("Se ha borrado")
       });
       res.redirect('/teams')
    }
})
//obtiene pagina de inicio de sesion
app.get('/signIn',redirectHome,(req,res) => {
    res.sendFile(path.join(__dirname, '..', '/frontend/signIn.html'))
})
//obtiene pagina de administrador
app.get('/admin',redirectLogin,(req,res) => {
    if(req.session.userId!="administrador@gmail.com")
    {
        res.redirect('/home.html')
    }
    res.sendFile(path.join(__dirname, '..', '/frontend/admin.html'))
})
//obtiene pagina de equipos a seguir/seguidos
app.get('/teams',redirectLogin,(req,res) => {
    res.sendFile(path.join(__dirname, '..', '/frontend/teams.html'))
})
//obtiene pagina de inicio
app.get('/Home',redirectLogin,(req,res) => {
    res.sendFile(path.join(__dirname, '..', '/frontend/home.html'))
    
})
//obtiene pagina de informacion de cada partido
app.get('/Match',redirectLogin,(req,res) => {
    res.sendFile(path.join(__dirname, '..', '/frontend/match.html'))
})
//manejo de sesiones con express y  mongodb
app.post('/signInSession',async (req,res)=>{
    const {email, password}= req.body;
    const user = await User.findOne({email})
    if(!user)
    {
        res.redirect('/signUp');
    }
    else
    {
        //verificar password
        const validation = await user.matchPassword(password)
        if(validation)
        {
           req.session.userId=user.email;
           console.log(req.session.userId);
           if(req.session.userId==="administrador@gmail.com")
           {
            res.redirect('/admin')
           }
           else{
            res.redirect('/home')
           }
           
        }
        else
        {
            res.redirect('/signIn');
        }
    }
})
//Cierre de sesion y borrado de datos de sesion
app.post('/logOut', (req,res)=>{

    req.session.destroy(err=>{
        if(err){
            return res.redirect('/home.html')
        }
        else
        {
            res.clearCookie('sid')
            console.log("Sesion terminada")
            res.redirect('/signIn.html')
        }
    })
    
})
//agrega usuarios en base de datos 
app.post('/signUp',redirectHome, async (req,res)  =>{
  const {name, email, password}=req.body;
  const emailUser =await User.findOne({email:email})
    if(emailUser){
        res.redirect('/')
    }
    else
    {
        const newUser= new User({email,password,name});
        newUser.password= await newUser.encryptPassword(password);
        await newUser.save();
        const newFollowList= new followList({username:email,followedTeams:[]});
        await newFollowList.save();
        console.log('registrado')
        res.redirect('/signIn.html');
    }
})

//static files
app.use(express.static(path.join(__dirname, '..', '/frontend')))

module.exports = app;