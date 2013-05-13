#pragma strict

var canHit : boolean;
var fire : UnityEngine.Object;

function Start () {
	canHit = false;
}

function Update () {
	if(canHit && (Input.GetButtonDown("Fire1")))
		Destroy(transform.root.gameObject);
}

function OnTriggerEnter(){
	canHit = true;
}

function OnTriggerExit(){
	canHit = false;
}

function OnMouseUp(){
		
}

function OnDestroy(){
	//Instantiate(fire, transform.position, transform.rotation);
}