#pragma strict

// Healing spell (or any self buff attack)
class HealAttack extends Attacks {

// Visual effect
var buff : Transform;

// Function to do the attack
function Attack(target : GameObject) {
	// Cannot use if on cooldown or target is null
	if(attackTimer == 0 && target != null) {
		var shot = Instantiate(buff, myTrans.position, Quaternion.identity);
		AudioSource.PlayClipAtPoint(sound, myTrans.position);
		target.GetComponent(Health).AdjustHealth(power);
		attackTimer = cooldown;
	}
}

}