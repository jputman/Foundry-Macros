let actorName = game.canvas.tokens.controlled[0].name;
let myActor = game.actors.getName(actorName);
let macroName = 'Mwhahaha';
let checkForEffect =  myActor.effects.find(eff => eff.data.label == macroName)
if(checkForEffect){
  return {goto: 'NothingToSee'};
}
else{
  const EXAMPLE_TRANSFERRED_EFFECT = {
    label: macroName,
    icon: "systems/dnd5e/icons/skills/shadow_01.jpg",
    duration : {
      rounds: 60,
      seconds: 3600
    },
    transfer: true,
  };
  await actor.createEmbeddedDocuments("ActiveEffect",[EXAMPLE_TRANSFERRED_EFFECT]);  
  let roll = await new Roll("1d20").roll();
  if(roll.total <= 12){
    return {goto : 'Area10'}
  }
  else if(roll.total <= 18){
    return {goto : 'Area19'}
  }
  else{
    return {goto : 'Area40c'}
  }
}