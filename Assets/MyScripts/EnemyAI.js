#pragma strict

// General enemy attributes
var moveSpeed = 3;
var rotateSpeed = 3;
var maxDistance = 2;
var minDistance = 20;

// Some more needed information
private var target : GameObject;
private var myTrans : Transform;
private var tarTrans : Transform;
private var melee : MeleeAttack;

function Awake () {
	// Target the player
	target = gameObject.FindWithTag("Player");
	
	// Localize the transforms and the attack
	myTrans = transform;
	tarTrans = target.transform;
	melee = GetComponent(MeleeAttack);
	
	// Change the name the name of the mob
	myTrans.Find("Name").GetComponent(TextMesh).text = name;
}

function Update () {
	// Movement of the mob.
	var distance = Vector3.Distance(tarTrans.position, myTrans.position);
	
	if(distance <= minDistance && distance > maxDistance){
		myTrans.rotation = Quaternion.Slerp(myTrans.rotation, 
			Quaternion.LookRotation(Vector3(tarTrans.position.x,0,tarTrans.position.z) - myTrans.position),
			rotateSpeed * Time.deltaTime);
			
		myTrans.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
	}
	
	// attack
	melee.Attack(target);
	
	// death
	if(GetComponent(Health).health == 0){
		GameObject.FindGameObjectWithTag("Finish").GetComponent(GUIScript).AddPoints(5);
		Destroy(gameObject);
	}
}