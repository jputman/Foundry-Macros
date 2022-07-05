try {
  if (!["mwak"].includes(args[0].item.data.actionType)) return {};
  if (args[0].hitTargetUuids.length === 0) return {}; // did not hit anyone
  for (let tokenUuid of args[0].hitTargetUuids) {
    const target = await fromUuid(tokenUuid);
    const targetActor = target.actor;
    if (!targetActor) continue;
    const spellDC = actor.data.flags["midi-qol"].blindingSmite.dc;
    ChatMessage.create({ content: `${targetActor.name} needs to make a ${CONFIG.DND5E.abilities["con"]} DC${spellDC} vs Blinding Smite blind.` });

    const saveRollData =  {
      request: "save",
      targetUuid: target.actor.uuid,
      ability: "con",
      options: {
        chatMessage: true,
        flavor: `${CONFIG.DND5E.abilities["con"]} DC${spellDC} vs Blinding Smite blind`,
      },
    };

    // const saveRoll = await targetActor.rollAbilitySave("str", { flavor });
    const saveRoll = await MidiQOL.socket().executeAsGM("rollAbility", saveRollData);

    if (saveRoll.total < spellDC) {
      game.dfreds.effectInterface.addEffect({ effectName: "Blinded", uuid: tokenUuid });
      ChatMessage.create({ content: `${targetActor.name} has failed the save and is blinded.` });
    }
  }
  Hooks.once("midi-qol.RollComplete", (workflow) => {
    console.log("Deleting concentration");
    const effect = MidiQOL.getConcentrationEffect(actor);
    if (effect) effect.delete();
    return true;
  });
  return { damageRoll: `3d8[radiant]`, flavor: "Blinding Smite" };
} catch (err) {
  console.error(`${args[0].itemData.name} - Blinding Smite`, err);
}