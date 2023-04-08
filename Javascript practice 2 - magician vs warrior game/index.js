function createPlayer(name, hp, mp) {
  return {
    name: name,
    hp: hp,
    mp: mp,
    cure: function (hp) {
      // write your code here
      // hint: 1. 在動手寫 code 之前，試著先列出有哪些可能性，再設計 if-else 邏輯 2. 魔法師和戰士補的血量不同，需要根據不同的補血量扣除不同的 MP
      if (this.hp <= 0) {
        return `${this.name} cannot use cure after death.`
      } else {
          if (this.mp >= hp * 2) {
            this.hp += hp
            this.mp -= hp * 2
            return `${this.name} HP recovered! (HP=${this.hp}, MP=${this.mp})`
          } else {
            return `${this.name} cannot use cure dur to the lack of MP.`
          }
      } 
    },
    attack: function (enemy) {
      // write your code here
      // hint: 在動手寫 code 之前，試著先列出有哪些可能性，再設計 if-else 邏輯
      const attackNum = Math.floor(Math.random()*100) + 1
      if (enemy.hp > attackNum) {
        enemy.hp -= attackNum 
        return `${this.name} hit ${enemy.name}. ${enemy.name} lose ${attackNum} HP.\n${enemy.name} is still alive. (HP=${enemy.hp})`
      } else {
        enemy.hp -= attackNum
        return `${this.name} hit ${enemy.name}. ${enemy.name} lose ${attackNum} HP.\n${enemy.name} is dead.`
      } 
    }  
  } 
}
console.log('====== CREATE PLAYERS ======')
const magician = createPlayer('Magician', 30, 100)
const warrior = createPlayer('Warrior', 100, 30)
console.log(magician) // {name: "Magician", hp: 30, mp: 100}
console.log(warrior) // {name: "Warrior", hp: 100, mp: 30}
console.log('====== START FIGHT ======')
while (warrior.hp > 0 && magician.hp > 0) {
  // 戰士先攻
  console.log(warrior.attack(magician))
  console.log(magician.cure(20)) // 魔法師補血 20 點
  // 魔法師後攻
  if (magician.hp > 0) {
    console.log('Change sides \n')
    console.log(magician.attack(warrior))
    console.log(warrior.cure(10)) // 戰士補血 10 點
  }
  console.log('======')
}
console.log('GAME OVER.')