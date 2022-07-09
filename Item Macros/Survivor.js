if(args[0] == "each"){
  let ownActor = game.actors.get(args[1].actorId)
  let ownToken = canvas.tokens.get(args[1].tokenId);
  let maxHP = ownActor.data.data.attributes.hp.max + ownActor.data.data.attributes.hp.tempmax
  let curHP = ownActor.data.data.attributes.hp.value
  let conMod = ownActor.data.data.abilities.con.mod
  let halfHP = Math.floor(maxHP / 2)
    if(curHP > 0 && curHP <= halfHP){
    let healValue = 5 + conMod
    let damageRoll = await new Roll(`${healValue}`).roll();
    await new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, "healing", ownToken ? [ownToken] : [], damageRoll, {flavor: "Survivor Healing", itemCardId: null})
  }
}