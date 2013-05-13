#pragma strict

// Melee attack (or any instant attack)
class MeleeAttack extends Attacks {

// New method to do the attack
function Attack(target : GameObject) {
	// Cannot be used while on cooldown or if target is null
	if(attackTimer == 0 && target != null) {
		dir = (target.transform.position - myTrans.position).normalized;
		direction = Vector3.Dot(dir, myTrans.forward);
		distance = Vector3.Distance(myTrans.position, target.transform.position);
		
		// Must be in range and facing target
		if(distance < range && direction > 0) {
			AudioSource.PlayClipAtPoint(sound, target.transform.position);
			target.GetComponent(Health).AdjustHealth(-power);
			attackTimer = cooldown;
		}
	}
}

}