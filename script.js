var db;
const DB_name="Letter_to_santa";
const db_version=5;
const storage_name='user_data';
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

openRequest.addEventListener('sucssess',(event)=>{
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
let store=tx.objectStore(storage_name);
let request=store.add(letterData);

request.onsuccess=(event)=>{
    console.log('Successful add')   
}

requset.onerror=(error)=>{
    console.warn(error)   
}}