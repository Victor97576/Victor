import { world, system } from '@minecraft/server';
import { ActionFormData } from '@minecraft/server-ui';

//ui opções
function inter(player) {
  const ui = new ActionFormData()
    .title('teste 1')
    .body(`escolha uma opcao`)
    .button('op0', 'textures/items/wood_sword')
    .button('op1')
    .button('op2')
    .button('op3')
    
ui.show(player).then((option) => {
  switch (option.selection) {
    case 0:
      player.runCommandAsync(`say olaaa`)
      break;
    case 1: 
      player.runCommandAsync(`execute as @s positioned as @s run setblock ~~-1~ gold_block`)
      break;
    case 2: 
      player.runCommandAsync(`execute as @s positioned as @s run setblock ~~-1~ diamond_block`)
      break;
    case 3: 
      player.runCommandAsync(`execute as @s positioned as @s run setblock ~~-1~ iron_block`)
      break;
        }
    })
};



//abrir por tag
system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("oninter")) {
      inter(player);
      player.runCommandAsync(`tag @s remove oninter`);
    }
  }
},1);

//abrir por hit
world.afterEvents.entityHitEntity.subscribe((evt) => {
    let player = evt.damagingEntity
    let villager = evt.hitEntity
    if (player.typeId == "minecraft:player" && villager.typeId == "minecraft:sheep") {
        inter(player)
        player.runCommandAsync(`say teste hit`);
    }
});

//abrir por item
world.beforeEvents.itemUse.subscribe((data) => {
    let player = data.source
    let item = data.itemStack?.typeId
    switch (item) {
        case 'minecraft:compass':
            system.run(() => inter(player))
            break;
    }
})