var db;
const DB_name="Letter_to_santa";
const db_version=5;
const storegeName='user_data';
document.getElementById("save").addEventListener("click", saveData);
let openRequest = indexedDB.open(DB_name, db_version);
openRequest.addEventListener('upgradeneeded',(event)=> {
    db=event.target.result;
    let oldVersion=event.oldVersion
    let newVersion=event.newVersion
    console.log(`Upgrade from ${oldVersion} to ${newVersion}`);
    if (!db.objectStoreNames.contains(storage_name)){
        let dataStore = db.createObjectStore(storage_name, {keyPath:'id', autoIncrement:true});
    }
})

openRequest.addEventListener('success',(event)=>{
    db=event.target.result;
    console.log('success');
})

openRequest.addEventListener('error',(error)=>{
    console.warn(error)}) 

function saveData () {
    let name=document.querySelector("#name").value;
    let city=document.querySelector('#city').value;
    let gift_wish=document.querySelector('#gift_wish').value; 
  
let letterData={name, city, gift_wish}
  
let tx=db.transaction(storegeName, 'readwrite');
tx.oncomplete=(event)=>{
    console.log(event)   
}

tx.onerror=(error)=>{
    console.warn(error)   
}
let store=tx.objectStore(storegeName);
let request=store.add(letterData);

request.onsuccess=(event)=>{
    console.log('Successful add')   
}

request.onerror=(error)=>{
    console.warn(error)   
}}

function display() {
    let pTag=document.getElementById('display_data');
    pTag.InnerHtml='';
    let tx=db.transaction(storegeName, 'readwrite');
tx.oncomplete=(event)=>{
    console.log(event)   
}

tx.onerror=(error)=>{
    console.warn(error)   
}
let store=tx.objectStore(storegeName);
let request=store.getAll();

request.onsuccess=(event)=>{
    console.log('Successful read');
    let get_request=event.target
    for (const i in get_request.result){
        pTag.InnerHtml+=`${getrequest.result[i].id}`
    }
}

request.onerror=(error)=>{
    console.warn(error)   
}
}
display()