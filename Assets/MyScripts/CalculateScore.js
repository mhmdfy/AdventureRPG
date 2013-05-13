#pragma strict

function Start () {
	GetComponent(TextMesh).text = "Score: " + GameObject.FindGameObjectWithTag("Stay").GetComponent(Score).time;
}

function Update () {

}