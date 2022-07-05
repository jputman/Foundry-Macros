try {
  if (!["mwak"].includes(args[0].item.data.actionType)) return {};
  if (args[0].hitTargetUuids.length === 0) return {}; // did not hit anyone
  for (let tokenUuid of args[0].hitTargetUuids) {
    const target = await fromUuid(tokenUuid);
    const targetActor = target.actor;
    if (!targetActor) continue;
    const spellDC = actor.data.flags["midi-qol"].staggeringSmite.dc;
    ChatMessage.create({ content: `${targetActor.name} needs to make a ${CONFIG.DND5E.abilities["wis"]} DC${spellDC} vs Staggering Smite.` });

    const saveRollData =  {
      request: "save",
      targetUuid: target.actor.uuid,
      ability: "wis",
      options: {
        chatMessage: true,
        flavor: `${CONFIG.DND5E.abilities["wis"]} DC${spellDC} vs Staggering Smite`,
      },
    };

    // const saveRoll = await targetActor.rollAbilitySave("str", { flavor });
    const saveRoll = await MidiQOL.socket().executeAsGM("rollAbility", saveRollData);

    if (saveRoll.total < spellDC) {
      ChatMessage.create({ content: `${targetActor.name} has failed the save and has disadvantage on attack rolls, ability checks and can't take reactions until end of next turn.` });
    }
  }
  Hooks.once("midi-qol.RollComplete", (workflow) => {
    console.log("Deleting concentration");
    const effect = MidiQOL.getConcentrationEffect(actor);
    if (effect) effect.delete();
    return true;
  });
  return { damageRoll: `4d6[psychic]`, flavor: "Staggering Smite" };
} catch (err) {
  console.error(`${args[0].itemData.name} - Staggering Smite`, err);
}