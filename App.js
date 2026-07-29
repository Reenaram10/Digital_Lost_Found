let items = JSON.parse(localStorage.getItem("items")) || [];

let editIndex = -1;

displayItems();

document.getElementById("saveBtn").onclick = function(){

    let item = {
        name:document.getElementById("itemName").value,
        category:document.getElementById("category").value,
        location:document.getElementById("location").value,
        status:document.getElementById("status").value,
        description:document.getElementById("description").value
    };

    if(item.name=="" || item.category==""){
        alert("Fill fields required");
        return;
    }

    if(editIndex==-1){
        items.push(item);
    }
    else{
        items[editIndex]=item;
        editIndex=-1;
        document.getElementById("saveBtn").innerHTML="Add Item";
    }

    localStorage.setItem("items",JSON.stringify(items));

    clearForm();

    displayItems();

};

function displayItems(){

    let output="";

    items.forEach((item,index)=>{

        output+=`
        <div class="card">

        <h3>${item.name}</h3>

        <p><b>Category:</b> ${item.category}</p>

        <p><b>Location:</b> ${item.location}</p>

        <p><b>Status:</b> ${item.status}</p>

        <p>${item.description}</p>

        <button class="edit" onclick="editItem(${index})">
        Edit
        </button>

        <button class="delete" onclick="deleteItem(${index})">
        Delete
        </button>

        </div>
        `;

    });

    document.getElementById("itemList").innerHTML=output;

}

function editItem(index){

    document.getElementById("itemName").value=items[index].name;
    document.getElementById("category").value=items[index].category;
    document.getElementById("location").value=items[index].location;
    document.getElementById("status").value=items[index].status;
    document.getElementById("description").value=items[index].description;

    editIndex=index;

    document.getElementById("saveBtn").innerHTML="Update Item";

}

function deleteItem(index){

    if(confirm("Delete this item?")){

        items.splice(index,1);

        localStorage.setItem("items",JSON.stringify(items));

        displayItems();

    }

}

function clearForm(){

    document.getElementById("itemName").value="";
    document.getElementById("category").value="";
    document.getElementById("location").value="";
    document.getElementById("description").value="";
}