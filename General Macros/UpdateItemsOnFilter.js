let gameActors = game.actors;
let lookFor = 'Spirit Shroud';
let newItem = game.items.find(obj => obj.name == lookFor)
gameActors.forEach(function(gameActor) {
  let item = gameActor.items.find(obj => obj.data.name == lookFor);
  if(item){
    item.delete();
    gameActor.createEmbeddedDocuments("Item", [newItem.data]);
  }
})