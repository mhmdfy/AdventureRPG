#pragma strict

// General boss attributes
var moveSpeed = 3;
var rotateSpeed = 3;
var maxDistance = 2;
var minDistance = 20;
var globalCooldown = 1.5;

// Some more needed information
private var target : GameObject;
private var array : Array;
private var myTrans : Transform;
private var tarTrans : Transform;
private var glTimer : double = 0;

// Attacks
private var melee : MeleeAttack;
private var fire : FireAttack;
private var aoe : ExplosionAttack;
private var heal : HealAttack;

function Awake () {
	// Target the player
	target = gameObject.FindWithTag("Player");
	
	// get the array of targets for AoE skill (adding only the player)
	array = new Array();
	array.Add(target);
	
	// localize the transforms and attacks for effeciency
	myTrans = transform;
	tarTrans = target.transform;
	
	melee = GetComponent(MeleeAttack);
	fire = GetComponent(FireAttack);
	aoe = GetComponent(ExplosionAttack);
	heal = GetComponent(HealAttack);
	
	// change name to the appropriate name
	transform.Find("Name").GetComponent(TextMesh).text = name;
}

function Update () {
	// global cooldown timer
	if(glTimer > 0)
		glTimer = glTimer - Time.deltaTime;
		
	if(glTimer < 0)
		glTimer = 0;
	
	// which mode he should be on.
	if(GetComponent(Health).health <= 30 && GetComponent(Health).health < target.GetComponent(Health).health)
		Defencive();
	else
		Offincive();
	
	// death
	if(GetComponent(Health).health == 0){
		Destroy(gameObject);
		GameObject.FindGameObjectWithTag("Finish").GetComponent(GUIScript).AddPoints(25);
	}
}

function Offincive() {
	// Moving toward the target.
	var distance = Vector3.Distance(tarTrans.position, myTrans.position);
	
	if(distance <= minDistance && distance > maxDistance){
		myTrans.rotation = Quaternion.Slerp(myTrans.rotation, 
			Quaternion.LookRotation(tarTrans.position - myTrans.position),
			rotateSpeed * Time.deltaTime);
		myTrans.rotation.x = 0;
		myTrans.rotation.z = 0;
		myTrans.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
	}
	
	// attack choices:
	if(glTimer == 0 && heal.attackTimer == 0 && GetComponent(Health).health < 85){
		heal.Attack(gameObject);
		glTimer = globalCooldown;
	}
	else if(glTimer == 0 && fire.attackTimer == 0){
		maxDistance = fire.range - 0.5;
		fire.Attack(target);
		glTimer = globalCooldown;
	}
	else if(glTimer == 0 && aoe.attackTimer == 0){
		maxDistance = aoe.range - 0.5;
		aoe.Attack(array);
		glTimer = globalCooldown;
	}
	else if(glTimer == 0 && melee.attackTimer == 0){
		maxDistance = melee.range - 0.5;
		melee.Attack(target);
		glTimer = globalCooldown;
	}
}

function Defencive() {
	// Moving away from the target.
	var distance = Vector3.Distance(tarTrans.position, myTrans.position);
	
	if(distance <= minDistance){
		myTrans.rotation = Quaternion.Slerp(myTrans.rotation, 
			Quaternion.LookRotation(tarTrans.position - myTrans.position),
			rotateSpeed * Time.deltaTime);
		myTrans.rotation.x = 0;
		myTrans.rotation.z = 0;
		myTrans.Translate(Vector3.back * moveSpeed/2 * Time.deltaTime);
	}
	
	// attack choices:
	if(glTimer == 0 && heal.attackTimer == 0){
		heal.Attack(gameObject);
		glTimer = globalCooldown;
	}
	else if(glTimer == 0 && fire.attackTimer == 0){
		maxDistance = fire.range - 0.5;
		fire.Attack(target);
		glTimer = globalCooldown;
	}
	else if(glTimer == 0 && aoe.attackTimer == 0){
		maxDistance = aoe.range - 0.5;
		aoe.Attack(array);
		glTimer = globalCooldown;
	}
}