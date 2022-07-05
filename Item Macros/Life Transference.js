let target = await fromUuid(args[0].hitTargetUuids[0] ?? "");
let ownToken = canvas.tokens.get(args[0].tokenId);
let spellLevel = args[0].spellLevel;
let numDice = 4 + (spellLevel - 3);
let damageRoll = await new Roll(`${numDice}d8`).roll();
console.log(target);
console.log(ownToken);
await new MidiQOL.DamageOnlyWorkflow(actor, token, damageRoll.total, "necrotic-non resist", target ? [ownToken] : [], damageRoll, {flavor: "Life Transference - Damage Roll", itemCardId: args[0].itemCardId})
damageRoll._total *= 2;
for(let i = 0; i < damageRoll.dice[0].results.length; i++){
  damageRoll.dice[0].results[i].result *= 2;
}
new MidiQOL.DamageOnlyWorkflow(token, token, damageRoll.total, "healing", target ? [target] : [], damageRoll, {flavor: "Life Transference - Healing [Double of Damage]", itemCardId: null})
