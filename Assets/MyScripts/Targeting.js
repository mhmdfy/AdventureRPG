#pragma strict

/*
 * Script for targeting enemies
 */

// Array of possible enemies to target
var enemies : Array;

// Local transform variable
private var myTrans : Transform;

// Current index of the target
private var index : int;

// Minimum distance to rotate from
private var minDist = 50;

function Start () {
	// Localize transform
	myTrans = transform;
	// Starting index of 0
	index = 0;
}

// Function that makes the list of possible targets
// taking distance into consideration
function MakeList() {
	enemies = new Array();
	var go = GameObject.FindGameObjectsWithTag("Enemy");
	for(var i = 0; i < go.Length ; i++) {
		if(Vector3.Distance(myTrans.position, go[i].transform.position) <= minDist)
			enemies.Add(go[i]);
	}
}

// Function that sorts the enemies by distance
function SortList() {
	// Remove destroyed targets
	for(var i = 0; i < enemies.length ; i++)
		if(enemies[i] == null)
			enemies.RemoveAt(i);
	
	enemies.Sort(function(a : GameObject, b : GameObject) {
					var aDist : float = Vector3.Distance(a.transform.position, myTrans.position);
					var bDist : float = Vector3.Distance(b.transform.position, myTrans.position);
					return aDist-bDist;
				});
}

// Select a new target and returns it
function SelectTarget() {
	var target : GameObject;
	// Make a new list and sort it based on distance
	MakeList();
	SortList();
	
	// If the list is empty we have no target
	if(enemies.length == 0){
		target = null;
	}
	else{
		// If the player's target was destroyed, start index from 0
		if(GetComponent(PlayerControl).selectedTarget == null)
			index = 0;
		// Target next enemy in list
		target = (enemies[index] as GameObject);
		index = (index + 1) % enemies.length;
	}
	return target;
}