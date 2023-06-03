import mongoose from "mongoose"; //Libreria para conectarse con mongoDB

const url = `mongodb+srv://manaken:12345@cluster0.vcv4xdr.mongodb.net/BaseDeDatos?retryWrites=true&w=majority`; //url necesaria para la conexión

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
export let systemDB = mongoose.connect(url,connectionParams) //conexión con mongoDB Atlas
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
})
