#pragma strict

var start : Transform;
var end : Transform;

function Update () {
    transform.position = Vector3.Lerp(start.position, end.position, Time.time);
}