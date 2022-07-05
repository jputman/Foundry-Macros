const actorD = game.actors.get(args[1].actorId);
const tokenD = canvas.tokens.get(args[1].tokenId);
if(args[0] == "on"){
  let summonType = 'Earthen Grasp';
  let updates = {
    token : {
      alpha: 1,
      name: `EarthenGrasp (${actorD.name})`,
    },
    actor: {
      name : `EarthenGrasp (${actorD.name})`
    }            
  };
  const options = {controllingActor: actor};
  let warpgateToken = await warpgate.spawn(summonType, updates, {}, options);
  actorD.setFlag("world","WGEarthenGrasph",warpgateToken);
}
else if(args[0] == "off"){
  const WGtokenId = actorD.getFlag("world","WGEarthenGrasph");
  const SceneID = canvas.scene.id;
  warpgate.dismiss(WGtokenId[0], SceneID);  
}