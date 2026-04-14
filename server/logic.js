//Logic.js

//ID storage 
const idbank = Array.from({ length: 500 }, (_, i) => i); 
    console.log('Building idbank......',idbank);
//Next ID to be assigned to an item on TodoItems
    const nextid = function idBankQue(){
        console.log(idbank.slice(0,10));
        if (idbank.length === 0) {
        throw new Error("No IDs available");
    }
    return idbank.shift()
};

    const TodoItems = [
  {
    todoItemId: 0,
    name: 'an item',
    priority: 3,
    completed: false
  },
  {
    todoItemId: 1,
    name: 'another item',
    priority: 2,
    completed: false
  },
  {
    todoItemId: 2,
    name: 'a done item',
    priority: 1,
    completed: true
  }
];
    //Healthy Server response
    function healthyServer(){
    return    {
        status: 'ok'
    }
    }

    //Read all items inside of TodoItems;
    function readAll(){
        return TodoItems;
    }

    //Add Item to TodoItems
    function addItem(itemtoAdd) {
    //grab an id number from next id
    const id = nextid();
    console.log('Assigned, todoItemID:',id);
    console.log('Verify body',itemtoAdd)
    //create new item inside of TodoItems using the data structure (use to do item id we pulled from next id, and completed should be false)
    let newItem = {
                            todoItemId: id,
                             name: itemtoAdd.name,    //user input 
                             priority: itemtoAdd.priority, //user input
                             completed: itemtoAdd.completed,
    
    }
    console.log(newItem);
    TodoItems.push(newItem);
    //return it all to app.js in the body
    return newItem;
}

//Delete Item
function removeItem(id) {
    console.log('DELETE ID:', id, typeof id);
  // 1. find index
  const index = TodoItems.findIndex(item => item.todoItemId === id);
    // 2. guard
  if (index === -1) {
    throw new Error("Item not found");
  }
    // 3. remove item
  const [removedItem] = TodoItems.splice(index, 1);
    // 4. recycle ID
  idbank.push(removedItem.todoItemId);
    // 5. return result
  return removedItem;
}

//Find a specific task
function findTask(id){
      const foundItem = TodoItems.find(item => item.todoItemId === id);

    if (!foundItem) {
        throw new Error('Item not found');
    }
return foundItem;
}



//PASSING THE PHONE
   module.exports = { healthyServer, readAll, addItem, removeItem, findTask };