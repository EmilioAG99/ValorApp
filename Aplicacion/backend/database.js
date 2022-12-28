const mongoose = require('mongoose');
const MONGODB_URI='mongodb+srv://prueba:12345@cluster0.n0t9h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(MONGODB_URI, {useUnifiedTopology:true,useNewUrlParser:true, useCreateIndex:true})
.then(db=>console.log('Database is connected'))
.catch(err=>console.log(err))