#pragma strict

function OnTriggerEnter(other : Collider) {
	if(other.tag == "Player")
		Application.LoadLevel(2);
}