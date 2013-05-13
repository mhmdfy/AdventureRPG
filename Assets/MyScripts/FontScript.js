#pragma strict

/* 
 * Script for the clickable text on the board
 */

// Variable for wether it is exit or not
var isExit : boolean = false;

function Awake(){
	renderer.material.color = Color.black;
}

function OnMouseEnter(){
	renderer.material.color = Color.green;
}

function OnMouseExit(){
	renderer.material.color = Color.black;
}

// if it is exit, then exit the game. Otherwise, start the game.
function OnMouseUp(){
	if(!isExit)
		Application.LoadLevel("GameScene");
	else
		Application.Quit();
}