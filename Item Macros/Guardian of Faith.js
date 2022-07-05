const actorD = game.actors.get(args[2].actorId);
const tokenD = canvas.tokens.get(args[2].tokenId);
if(args[0] == "on"){
  let spellDC = args[1];
  let weapon = 'Mace';
  let summonType = 'Guardian of Faith';
  let updates = {
    token : {
        'alpha':1,
        'name':`${summonType} of ${actorD.name}`,
    },
    actor: {
        'name' : `${summonType} of ${actorD.name}`,
    },
    embedded: { 
        Item: {
          "Guardian of Faith":{
            'data.save.dc': spellDC
          }                
        }
    }
  };
  const options = {controllingActor: actor};
  let warpgateToken = await warpgate.spawn(summonType, updates, {}, options);
  actorD.setFlag("world","WGGuardianOfFaith",warpgateToken);
}
else if(args[0] == "off"){
  const WGtokenId = actorD.getFlag("world","WGGuardianOfFaith");
  const SceneID = canvas.scene.id;
  warpgate.dismiss(WGtokenId[0], SceneID);  
}