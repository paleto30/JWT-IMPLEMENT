import app from "./app.js"


const main = ()=>{
    app.listen(app.get("port"));
    console.log(`el servidor esta corriendo en el puerto ${app.set("port")}`);
    console.log(`Server   http://localhost:5000`);
}


main();