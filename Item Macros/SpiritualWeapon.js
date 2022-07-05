const actorD = game.actors.get(args[2].actorId);
const tokenD = canvas.tokens.get(args[2].tokenId);
if(args[0] == "on"){
    const level = args[1]
    const summonerDc = actorD.data.data.attributes.spelldc;
    const summonerAttack = summonerDc - 8;
    const summonerMod = getProperty(tokenD.actor, `data.data.abilities.${getProperty(tokenD.actor, 'data.data.attributes.spellcasting')}.mod`);
    let summonType = "Spiritual Weapon";
    let damageScale = '';
    let lightColor='#0000FF';
    let weapon = 'Mace';
    let color = 'Blue';
    let lowerColor = color[0].toLowerCase() + color.substring(1);
    let spiritualWeapon = 'modules/JB2A_DnD5e/Library/2nd_Level/Spiritual_Weapon/SpiritualWeapon_Mace01_01_Spectral_Blue_200x200.webm';
    if ((level-3) > 0){
        damageScale = `+ ${Math.floor((level-2)/2)}d8[force]`;
    }    
    let updates = {
        token : {
            'alpha':1,
            'name':`${summonType} of ${actorD.name}`,
            'img': spiritualWeapon,
            'token' : spiritualWeapon,
            'lightColor': lightColor
        },
        actor: {
            'name' : `${summonType} of ${actorD.name}`,
        },
        embedded: { 
            Item: {
            "Attack":{
                'data.attackBonus': `- @mod - @prof + ${summonerAttack}`,
                'data.damage.parts': [[`1d8[force] ${damageScale} + ${summonerMod}`, 'force']],
                'flags.autoanimations.animName': weapon,
                'flags.autoanimations.color': lowerColor
            }                
            }
        }
    }
    const options = {controllingActor: actor};
    let warpgateToken = await warpgate.spawn(summonType, updates, {}, options);
    actorD.setFlag("world","WGSpiritualWeapon",warpgateToken);
    
}
else if(args[0] == "off"){
    const WGtokenId = actorD.getFlag("world","WGSpiritualWeapon");
    const SceneID = canvas.scene.id;
    warpgate.dismiss(WGtokenId[0], SceneID);
}