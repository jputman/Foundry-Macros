try {
  if (!["mwak"].includes(args[0].item.data.actionType)) return {};
  if (args[0].hitTargetUuids.length === 0) return {}; // did not hit anyone
  for (let tokenUuid of args[0].hitTargetUuids) {
    const target = await fromUuid(tokenUuid);
    const targetActor = target.actor;
    if (!targetActor) continue;
    const spellDC = actor.data.flags["midi-qol"].wrathfulSmite.dc;
    ChatMessage.create({ content: `${targetActor.name} needs to make a ${CONFIG.DND5E.abilities["wis"]} DC${spellDC} vs Wrathful Smite Frightened.` });

    const saveRollData =  {
      request: "save",
      targetUuid: target.actor.uuid,
      ability: "wis",
      options: {
        chatMessage: true,
        flavor: `${CONFIG.DND5E.abilities["wis"]} DC${spellDC} vs Wrathful Smite Frightened`,
      },
    };

    // const saveRoll = await targetActor.rollAbilitySave("str", { flavor });
    const saveRoll = await MidiQOL.socket().executeAsGM("rollAbility", saveRollData);

    if (saveRoll.total < spellDC) {
      game.dfreds.effectInterface.addEffect({ effectName: "Frightened", uuid: tokenUuid });
      ChatMessage.create({ content: `${targetActor.name} has failed the save and is frightened.` });
    }
  }
  Hooks.once("midi-qol.RollComplete", (workflow) => {
    console.log("Deleting concentration");
    const effect = MidiQOL.getConcentrationEffect(actor);
    if (effect) effect.delete();
    return true;
  });
  return { damageRoll: `1d6[psychic]`, flavor: "Wrathful Smite" };
} catch (err) {
  console.error(`${args[0].itemData.name} - Wrathful Smite`, err);
}