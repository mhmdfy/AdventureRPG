#pragma strict

// Health variables
var regen : double = 0.01;
var health : double = 100;
var armor : double = 0;

function Update () {
	// Keep incrementing health by regen amount
	AdjustHealth(regen);
}

// Function to be called to change the health
function AdjustHealth(amount : double) {
	health = health + (amount - (amount * armor/100));
	
	if(health < 0)
		health = 0;
	if(health > 100)
		health = 100;
}