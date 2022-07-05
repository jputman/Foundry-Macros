const actorD = game.actors.get(args[1].actorId);
if(args[0] == "on"){
    const targetToken = canvas.tokens.get(game.user.targets.ids[0]);
    const targetActor = game.actors.get(targetToken.data.actorId);
    const targetWeapons = targetActor.items.filter(i=> i.data.type == "weapon")
    const weaponNames = targetWeapons.map(x => x.data.name);
    let choices = await warpgate.dialog(
        [{
            type: 'select', 
            label: `What Weapon? `, 
            options: weaponNames
        }],
        "Select Weapon",
        "Select"
    );
    let weapon = targetWeapons.filter(x => x.data.name == choices[0]);
    let weaponDMG = weapon[0].data.data.damage.parts;
    weaponDMG.push([`2d8`, 'radiant'])
    let update = {
        embedded : {
            Item : {
            }
        }
    };
    update['embedded']['Item'][choices[0]] = {'data.damage.parts': weaponDMG};
    const options = {
        name : 'HolyWeapon_' + choices[0]
    };
    await warpgate.mutate(targetToken.document, update, {}, options)
    actorD.setFlag("world","WGTestItem",[targetToken.id,options.name]);
}
else if(args[0] == "off"){
    const WGtokenId = actorD.getFlag("world","WGTestItem");
    const targetToken = canvas.tokens.get(WGtokenId[0]);
    await warpgate.revert(targetToken.document, WGtokenId[1]);
    actorD.unsetFlag("world","WGTestItem");
}