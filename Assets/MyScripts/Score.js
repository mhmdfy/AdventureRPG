#pragma strict

// The time that was used playing the game
var time : float;

function Awake() {
	// Make this object persist through scene changes (to carry the time)
	DontDestroyOnLoad(gameObject);
}

// Function to get the new time
function AddTime(newTime : float){
	time = newTime;
}