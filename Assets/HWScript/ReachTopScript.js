#pragma strict

var sound : AudioClip;

function OnTriggerEnter(){
	audio.PlayOneShot(sound);
}