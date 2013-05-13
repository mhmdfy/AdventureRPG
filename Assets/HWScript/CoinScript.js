#pragma strict

function Start () {
	renderer.material.color = Color.yellow;
}
function Update () {
	transform.Rotate(Vector3(transform.rotation.x, (transform.rotation.y + 10) % 180, transform.rotation.z));
}

function OnTriggerEnter() {
	Destroy(transform.root.gameObject);
}