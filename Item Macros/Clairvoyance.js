const actorD = game.actors.get(args[1].actorId);
const tokenD = canvas.tokens.get(args[1].tokenId);
if(args[0] == "on"){
  let summonType = "Clairvoyance";
  let dimSight = tokenD.data.dimSight;
  let brightSight = tokenD.data.brightSight;
  let updates = {
    token : {
        alpha: 1,
        name: `${summonType}(${actorD.name})`,
    },
    actor: {
        name : `${summonType}(${actorD.name})`
    }            
  };
  if(brightSight > 0){
    updates.token.brightSight = brightSight;
  }
  if(dimSight > 0){
    updates.token.dimSight = dimSight;
  }
  const options = {controllingActor: actor};
  let warpgateToken = await warpgate.spawn(summonType, updates, {}, options);
  actorD.setFlag("world","WGClairvoyance",warpgateToken);
}
else if(args[0] == "off"){
  const WGtokenId = actorD.getFlag("world","WGClairvoyance");
  const SceneID = canvas.scene.id;
  warpgate.dismiss(WGtokenId[0], SceneID);  
}