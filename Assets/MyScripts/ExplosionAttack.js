#pragma strict

// Explostion attack (or any AoE attack)
class ExplosionAttack extends Attacks {

// Visual effects
var explosion : Transform;
var onHit : Transform;

// The function to do the attack
function Attack(targets : Array) {
	// Cannot be used while on cooldown (regardless of targets)
	if(attackTimer == 0) {
		var shot = Instantiate(explosion, myTrans.position, Quaternion.identity);
		AudioSource.PlayClipAtPoint(sound, myTrans.position);
		
		// For each close target, apply damage.
		for(var target : GameObject in targets){
			if(target != null) {
				distance = Vector3.Distance(myTrans.position, target.transform.position);
	
				if(distance < range){
					target.GetComponent(Health).AdjustHealth(-power);
					Instantiate(onHit, target.transform.position, Quaternion.identity);
					
					// Add a dot to the target
					target.AddComponent(DoT);
					target.GetComponent(DoT).DamageOver(1, 5);
					target.GetComponent(DoT).AddEffect(onHit);
				}
			}
		}
		attackTimer = cooldown;
	}
}

}