#pragma strict

// Player's current target
var selectedTarget : GameObject;

// Player's spells
private var melee : MeleeAttack;
private var fire : FireAttack;
private var frost : ExplosionAttack;
private var heal : HealAttack;

function Awake () {
	// Localize spells
	melee = GetComponent(MeleeAttack);
	fire = GetComponent(FireAttack);
	frost = GetComponent(ExplosionAttack);
	heal = GetComponent(HealAttack);
	
	// Starting target is null
	selectedTarget = null;
}

function Update () {
	// target with tab
	if(Input.GetKeyDown(KeyCode.Tab))
		Target();

	// melee with 1
	if(Input.GetKeyDown(KeyCode.Alpha1))
		melee.Attack(selectedTarget);
	
	// fireball with 2
	if(Input.GetKeyDown(KeyCode.Alpha2))
		fire.Attack(selectedTarget);
	
	// frostball with 3
	if(Input.GetKeyDown(KeyCode.Alpha3))
		frost.Attack(GetComponent(Targeting).enemies);
		
	// heal with 4
	if(Input.GetKeyDown(KeyCode.Alpha4))
		heal.Attack(gameObject);
			
	// dies if health reaches 0
	if(GetComponent(Health).health < 0.1)
		Application.LoadLevel("GameOver");
}

function Target () {
	// If current traget is not null, untarget it (hide health and color the name with white)
	if(selectedTarget != null) {
		selectedTarget.GetComponent(HealthBar).isVisible = false;
		selectedTarget.transform.Find("Name").renderer.material.color = Color.white;
	}
	
	// Select a new target (show health and color the name with red)
	selectedTarget = GetComponent(Targeting).SelectTarget();
	if(selectedTarget != null){
		selectedTarget.GetComponent(HealthBar).isVisible = true;
		selectedTarget.transform.Find("Name").renderer.material.color = Color.red;
	}
}