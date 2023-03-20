class Bil{
    constructor(brand, color, id){
        this.brand = brand;
        this.color = color;
        this.id = id;
    }
}

let billista = [];
//hämtar data från localstorage
async function getDataFromlocalStorage(){

    try{
        billista = await JSON.parse(localStorage.getItem("bilarlistan"))

        if (billista == null){
            billista = [];
        }
        lista_bilar_div.innerHTML = "";
        billista.forEach(createHtmlBilLista)
    }
    catch (e){
        console.log(`Fel: ${e}`)
    }
}

const addbutton = document.getElementById("addbutton")
const brand = document.getElementById("Brand")
const color = document.getElementById("color")
const lista_bilar_div = document.getElementById("ListaBilarDiv");

addbutton.addEventListener("click" , addButtonClick);

function addButtonClick(){
    console.log("Klicka");

    const now = Date.now();
    const id = now.toString();
    
   
    let brandname = brand.value;

   if (brandname !== ""){
     let car = new Bil(brand.value, color.value, id)
     billista.push(car);

     //lägger till  LocalStorage
     localStorage.setItem("bilarlistan", JSON.stringify(billista));

     brand.value="";
     color.value="";
     lista_bilar_div.innerHTML ="";
     billista.forEach(createHtmlBilLista);

   }
   else{
    alert("Måste gå ner i vikt")
   }
   
    console.log(`id= ${id} brand= ${brandname}`);
}

const createHtmlBilLista = (bil) => {
    const bildiv = document.createElement("div");
    bildiv.className = "bil_div_element";
    //skapar element
    const bilH2 = document.createElement("h2");
    const bilPcolor = document.createElement("p");
    const bilDelButt = document.createElement("button");
    //fyller innehåll i den
    bilH2.innerText = `${bil.brand}`
    bilPcolor.innerText = `Färg: ${bil.color}`
    bilDelButt.innerText = `Delete`
    bilDelButt.id = bil.id

    bildiv.append(bilH2, bilPcolor, bilDelButt);
    lista_bilar_div.appendChild(bildiv);

    


}
let deleteBil = (e) => {
    const nybillista = billista.filter( (o, i) => o.id !== e.target.id) 
    billista = nybillista;
    localStorage.setItem("bilarlistan", JSON.stringify(billista))
    getDataFromlocalStorage();


}

    window.addEventListener("click", deleteBil)

