#pragma strict

// Bar height and width
private var width = 300;
private var height = 30;

// Starting point
var startPosition = 10;

// Determines if it is visible or not
var isVisible = false;

function OnGUI() {
	if(isVisible){
		var healthPercent = GetComponent(Health).health/100;
		var h : int = GetComponent(Health).health;
	
		GUI.Box(Rect(startPosition, 20, healthPercent * width, height), "" + h + "%");
	}
}