let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header(
"Access-Control-Allow-Methods",
"GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
);
res.header(
"Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept"
);
next();
});
const port = 2410;
app.listen(port, () => console.log(`Listening on port ${port}!`));
let {cars,carMaster}=require("./car.js")

app.get("/svr/cars", function (req, res) { 
    console.log("GET /svr/cars ", req.query);

    let fuel= req.query.fuel;
    let type= req.query.type;
    let sort= req.query.sort;
     let minprice= req.query.minprice;
    let maxprice= req.query.maxprice;
   
   
    
let arr1 = cars;


 if (fuel) {
let car=carMaster.filter((st)=>st.fuel===fuel)
if(car.length==1)
arr1 = arr1.filter((st) =>st.model=== car[0].model);
if(car.length==2)
arr1 = arr1.filter((st) =>st.model=== car[0].model||st.model=== car[1].model);
if(car.length>2)
arr1 = arr1.filter((st) =>st.model=== car[0].model||st.model=== car[1].model||
st.model=== car[2].model||st.model=== car[3].model);
console.log(car.length)

}
if(minprice)
arr1=arr1.filter((st)=>st.price>minprice)
if(maxprice)
arr1=arr1.filter((st)=>st.price<maxprice)

 if (type) {
let car=carMaster.filter((st)=>st.type===type)
if(car.length==1)
arr1 = arr1.filter((st) =>st.model=== car[0].model);
if(car.length==2)
arr1 = arr1.filter((st) =>st.model=== car[0].model||st.model=== car[1].model);
if(car.length>2)
arr1 = arr1.filter((st) =>st.model=== car[0].model||st.model=== car[1].model||
st.model=== car[2].model||st.model=== car[3].model);
console.log(car.length)

}
if (sort === "kms")
 arr1.sort((st1, st2)=> st1.kms-(st2.kms));
if (sort === "price")
 arr1.sort((st1, st2)=> st1.price-(st2.price));
if (sort === "year")
 arr1.sort((st1, st2)=> st1.year-(st2.year));

 res.send(arr1);


})
app.get("/svr/cars/:id", function (req, res) {
    let id=req.params.id;
    let student =cars.filter((st)=>st.id==id);
    
    console.log(id)
    if(student)
    res.send(student)
    else
    res.status(404).send("no person")
  
})

app.post("/svr/cars", function (req, res) {
    let body= req.body; 
    console.log(body);
   
    let newStudent = {  ...body };
    cars.push(newStudent);
    res.send(newStudent)})

    app.put("/svr/cars/:id", function (req, res) {
        let id= req.params.id;
        let body= req.body;
        let index =cars.findIndex((st) => st.id = id);
        if(index>=0){
             let updatedStudent = { id: id, ...body };
        cars[index]= updatedStudent; res.send(updatedStudent)
        }
        else
    res.status(404).send("no cars  avaliable ")
       ;})
     
app.delete("/svr/cars/:id", function (req, res) { 
      let id =req.params.id;
    let index = cars.findIndex((st) => st.id === id); 
    if(index>=0){
  let deletedStudent= cars.splice(index, 1);
res.send(deletedStudent);      
    }
    else
    res.status(404).send("no cars  avaliable ")
    })