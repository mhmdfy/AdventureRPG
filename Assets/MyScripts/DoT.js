#pragma strict

// Variables for the DoT
var dmg : int;
var time : double;
var effect : Transform;

// Do damage (repeatingly) every 1 sec, and end the dot after the time has passed
function Start() {
	InvokeRepeating("DoDamage", 0.0, 1.0);
	Invoke("Die", time);
}

// Initialize the damage and the time desired for the dot
function DamageOver(newDamage : int, newTime : double) {
	dmg = newDamage;
	time = newTime;
}

// Do damage to the holder and creates the effect
function DoDamage() {
	GetComponent(Health).AdjustHealth(-dmg);
	Instantiate(effect, transform.position, Quaternion.identity);
}

// Initialize the visual for the effect
function AddEffect(newEffect : Transform) {
	effect = newEffect;
}

// Destroy the script (remove it from the holder)
function Die() {
	Destroy(this, time);
}