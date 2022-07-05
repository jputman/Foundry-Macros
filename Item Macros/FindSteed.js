const actorD = game.actors.get(args[1].actorId);
const tokenD = canvas.tokens.get(args[1].tokenId);
if(args[0] == "on"){
    let steedOptions = ['Camel','Elk','Mastiff','Pony','Warhorse'];
    let choices = await warpgate.dialog(
        [{
            type: 'select', 
            label: `Steed Type: `, 
            options: steedOptions
        }],
        "Choose your Steed",
        "Call Forth!"
    );
    let summonType = choices[0];
    let updates = {
        token : {
            alpha: 1,
            name: `Steed(${actorD.name})`,
        },
        actor: {
            name : `Steed(${actorD.name})`
        }            
    };
    const options = {controllingActor: actor};
    let warpgateToken = await warpgate.spawn(summonType, updates, {}, options);
    actorD.setFlag("world","WGFindSteed",warpgateToken);
}
else if(args[0] == "off"){
    const WGtokenId = actorD.getFlag("world","WGFindSteed");
    const SceneID = canvas.scene.id;
    warpgate.dismiss(WGtokenId[0], SceneID);  
}