#pragma strict

// Name of the hero
var myName : String = "Hero";

// Total points (starting from 0)
private var points : int = 0;

// Some local variables
private var player : GameObject;
private var enemyName : String;
private var dist : int;

function Awake() {
	// Localize the player
	player = GameObject.FindGameObjectWithTag("Player");
}

function OnGUI() {
	// Get the name of the current target of the player.
	var tempTarget = player.GetComponent(PlayerControl).selectedTarget;
	if(tempTarget == null){
		enemyName = "";
		dist = 0;
	}
	else{
		enemyName = tempTarget.name;
		dist = Vector3.Distance(player.transform.position, tempTarget.transform.position);
	}
	
	// The names of the player and the player's target
	GUI.Label(Rect(30, 0, 100, 100), myName);
	GUI.Label(Rect(370, 0, 100, 100), enemyName);
	
	// Points and time spent so far
	GUI.Label(Rect(Screen.width - 100, 0, 100, 100), "Points: " + points);
	GUI.Label(Rect(Screen.width - 100, 30, 100, 100), "Time: " + Time.timeSinceLevelLoad);
	
	// Distance from current target
	GUI.Label(Rect(30, Screen.height - 50, 60, 50), "Distance:\n"+ dist);
	
	// Clickable buttons for player's abilities (showing cooldowns too)
	GUI.Label(Rect(Screen.width/2 - 120, Screen.height - 80, 50, 50), "1. Melee");
	var meleeCD : int = player.GetComponent(MeleeAttack).attackTimer;
	if(GUI.Button(Rect(Screen.width/2 - 120, Screen.height - 60, 50, 50), "" + meleeCD))
		player.GetComponent(MeleeAttack).Attack(player.GetComponent(PlayerControl).selectedTarget);
	
	GUI.Label(Rect(Screen.width/2 - 40, Screen.height - 80, 50, 50), "2. Fire");
	var fireCD : int = player.GetComponent(FireAttack).attackTimer;
	if(GUI.Button(Rect(Screen.width/2 - 40, Screen.height - 60, 50, 50), "" + fireCD))
		player.GetComponent(FireAttack).Attack(player.GetComponent(PlayerControl).selectedTarget);
		
	GUI.Label(Rect(Screen.width/2 + 40, Screen.height - 80, 50, 50), "3. AoE");
	var AoECD : int = player.GetComponent(ExplosionAttack).attackTimer;
	if(GUI.Button(Rect(Screen.width/2 + 40, Screen.height - 60, 50, 50), "" + AoECD))
		player.GetComponent(ExplosionAttack).Attack(player.GetComponent(Targeting).enemies);
		
	GUI.Label(Rect(Screen.width/2 + 120, Screen.height - 80, 50, 50), "4. Heal");
	var healCD : int = player.GetComponent(HealAttack).attackTimer;
	if(GUI.Button(Rect(Screen.width/2 + 120, Screen.height - 60, 50, 50), "" + healCD))
		player.GetComponent(HealAttack).Attack(player);
}

// Function to be called to add points to the game
function AddPoints(toAdd : int) {
	points = points + toAdd;
	if(points > 100)
		points = 100;
	if(points < 0)
		points = 0;
}

// If the game is about to end (we got 100 points), copy the points to a game object that will stay
// the scene change
function Update() {
	if(points >= 100){
		GameObject.FindGameObjectWithTag("Stay").GetComponent(Score).AddTime(Time.timeSinceLevelLoad);
		Application.LoadLevel("YouWin");
	}
}