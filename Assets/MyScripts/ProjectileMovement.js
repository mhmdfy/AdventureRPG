#pragma strict

// Projectile movement variables
var moveSpeed = 20;
var rotateSpeed = 20;

// Attack power
var power : double;

// Visual effect
private var onHit : Transform;

// Transform of caster and the target
private var myTrans : Transform;
private var tarTrans : Transform;

function Start () {
	// Localize transform
	myTrans = transform;
}

function Update () {
	// While the target exists, follow it
	if(tarTrans != null){
		myTrans.LookAt(tarTrans);		
		myTrans.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
		
		// If we reached the target, apply damage and destroy the porjectile
		if(Vector3.Distance(myTrans.position, tarTrans.position) < 0.1){
			tarTrans.gameObject.GetComponent(Health).AdjustHealth(power);
			Instantiate(onHit, tarTrans.position, Quaternion.identity);
			Destroy(gameObject);
		}
	}
	
	else
		Destroy(gameObject);
}

// Functions to assign target and on hit effect
function assignTarget(target : Transform) {
	tarTrans = target;
}
function assignOnHit(effect : Transform) {
	onHit = effect;
}