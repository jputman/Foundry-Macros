// This requires midi-qol and Item Macro
// General Actor Data
const actorD = game.actors.get(args[args.length -1].actorId);
const itemName = `${actorD.name} Spirit Shroud Damage`
// Execute when effect is applied.
if(args[0] == "on"){
  // Determine the number of dice
  const level = args[1]
  let dmgDice = Math.floor((level - 1) / 2);
  // Damage types that are applicable to the spell.
  const damageTypes = ['cold','necrotic','radiant'];
  let choices = await warpgate.dialog(
    [{
      type: 'select', 
      label: `Damage Type: `, 
      options: damageTypes
    }],
    "Spirit Shroud",
    "Cast!"
  );
  // Effect Data
  const EXAMPLE_TRANSFERRED_EFFECT = {
    label: itemName,
    icon: "systems/dnd5e/icons/skills/shadow_01.jpg",
    changes: [
      {key: "data.bonuses.All-Damage", value: `+${dmgDice}d8[${choices[0]}]`, mode: 'Add'},
    ],
    transfer: true,
  };
  // Create Effect
  await actor.createEmbeddedDocuments("ActiveEffect",[EXAMPLE_TRANSFERRED_EFFECT])
}
else if(args[0] == "off"){
  // Delete Effect
  let effect = actorD.effects.find(eff => eff.data.label == itemName)
  await effect.delete();
}