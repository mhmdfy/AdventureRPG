#pragma strict

/*
 * Script to be attached to self buff effect that will be destroyed
 * after a certain time
 */

// Life time of the buff
var lifeTime : double = 1;

function Update () {
	Destroy(gameObject, lifeTime);
}