#pragma strict

// Fireball attack (or any projectile attack)
class FireAttack extends Attacks {

// Visual effects
var projectile : Transform;
var onHit : Transform;

// Function to do the attack
function Attack(target : GameObject) {
	// Cannot use if on cooldown or target is null
	if(attackTimer == 0 && target != null) {
		dir = (target.transform.position - myTrans.position).normalized;
		direction = Vector3.Dot(dir, myTrans.forward);
		distance = Vector3.Distance(myTrans.position, target.transform.position);
		
		// Must be in range and facing the target
		if(distance < range && direction > 0) {
			var fire = Instantiate(projectile, myTrans.Find("shootPoint").transform.position, Quaternion.identity);
			AudioSource.PlayClipAtPoint(sound, myTrans.position);
			
			// Send information to projectile so that it would follow and damage target
			fire.GetComponent(ProjectileMovement).assignTarget(target.transform);
			fire.GetComponent(ProjectileMovement).power = -power;
			fire.GetComponent(ProjectileMovement).assignOnHit(onHit);
			attackTimer = cooldown;
		}
	}
}

}