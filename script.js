var db;
const DB_name="Letter_to_santa";
const db_version=5;
const storageName='user_data';

document.getElementById("save").addEventListener("click", saveData);
let openRequest = indexedDB.open(DB_name, db_version);
openRequest.addEventListener('upgradeneeded',(event)=> {
    db=event.target.result;
    let oldVersion=event.oldVersion
    let newVersion=event.newVersion
    console.log(`Upgrade from ${oldVersion} to ${newVersion}`);
    if (!db.objectStoreNames.contains(storage_name)){
        let dataStore = db.createObjectStore(storageName, {keyPath:'id', autoIncrement:true});
    }
})

openRequest.addEventListener('success',(event)=>{
    db=event.target.result;
    console.log('success');
    display();
})
openRequest.addEventListener('complete', (event)=>{
    db=event.target.result;
    display();
}
)
openRequest.addEventListener('error',(error)=>{
    console.warn(error)}) 

function saveData () {
    let name=document.querySelector("#name").value;
    let city=document.querySelector('#city').value;
    let country=document.querySelector('#country').value;
    let gift_wish=document.querySelector('#gift_wish').value; 
    let age=document.querySelector("#age").value;

let letterData={name, city, gift_wish, country, age}
  
let tx=db.transaction(storageName, 'readwrite');
tx.oncomplete=(event)=>{
    console.log(event)   
}

tx.onerror=(error)=>{
    console.warn(error)   
}
let store=tx.objectStore(storageName);
let request=store.add(letterData);

request.onsuccess=(event)=>{
    console.log('Successful add')   
}

request.onerror=(error)=>{
    console.warn(error) 

}
display()
}

function display() {
    let pTag=document.getElementById('display_data');
    pTag.innerHTML='';
    let tx=db.transaction(storageName, 'readwrite');
    tx.oncomplete=(event)=>{
    console.log(event)   
}

tx.onerror=(error)=>{
    console.warn(error)   
}
let store=tx.objectStore(storageName);
let request=store.getAll();

request.onsuccess=(event)=>{
    console.log('Successful read');
    let get_request=event.target
    for (const i in get_request.result){
        pTag.innerHTML+=` <article>   Dear Santa,
        My name is <span id='display_name'> ${get_request.result[i].name}</span>
        and I am  <span id='age'> ${age.result[i].age}</span>
        years old. I live in the city of
         <span id='display_city'> ${get_request.result[i].city}</span> 
         which is in the County of
         I've been trying my best to be
         super good. I'm hoping I'm on your NICE list again this year! Some of the wonderful things I have
         done to be good are;
         I have a few special 
         <span id='display_gift_wish'> ${get_request.result[i].gift_wish}</span>
         </article>`
        
        
    }
}

request.onerror=(error)=>{
    console.warn(error)   
}

}
window.addEventListener('load', ()=>{
  
})