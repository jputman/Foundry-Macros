let effectName = "Defensive Flourish";
let ownActor = await fromUuid(args[0].actorUuid ?? "");
let effected = ownActor.data.effects.find(i => i.data.label === effectName)
let diceOptions = ['d6','d8','d10','d12'];
let choices = await warpgate.dialog(
  [{
      type: 'select', 
      label: `Bardic Inspiration Die: `, 
      options: diceOptions
  }],
  "Bardic Inspiration Die:",
  "Roll!"
);
let dieType = choices[0];
let damageRoll = await new Roll(`1${dieType}`).roll();
let defenseEffect = "+" + damageRoll.total
let targets = game.user.targets;
const [target] = targets;
await new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, "damage", target ? [target] : [], damageRoll, {flavor: "Damage Roll", itemCardId: args[0].itemCardId})
let effect = {
  "changes": [{
    "key": "data.attributes.ac.bonus",
    "mode": 2,
    "value": defenseEffect,
    "priority": "20"
  }],
  "duration": {
    "rounds": 1,
    "startTime": null,
    "seconds": 6
  },
  "icon": "icons/magic/defensive/shield-barrier-blue.webp",
  "label": "Defensive Flourish",
}
if (effected) {
  console.log(effected)
  ownActor.deleteEmbeddedDocuments("ActiveEffect", [effected.id])
}
ownActor.createEmbeddedDocuments("ActiveEffect", [effect])