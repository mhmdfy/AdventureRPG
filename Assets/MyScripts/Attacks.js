#pragma strict
/*
 * Parent class for all Attacks that has all the generic
 * information for the attack
 */

// General attack variables
var range = 2.5;
var power = 10;
var cooldown = 1.5;
var attackTimer : double;

// transform variable
protected var myTrans : Transform;

// variables for getting distance and direction
protected var dir : Vector3;
protected var direction : float;
protected var distance : float;

// sound variable
var sound : AudioClip;

function Awake () {
	// Localize transform.
	myTrans = transform;
	
	// Start timer at 0
	attackTimer = 0;
}

function Update () {
	// Apply cooldown
	if(attackTimer > 0)
		attackTimer = attackTimer - Time.deltaTime;
	if(attackTimer < 0)
		attackTimer = 0;
}