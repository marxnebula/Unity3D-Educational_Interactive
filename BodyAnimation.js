#pragma strict


/* ~~~~~~~~Class Info~~~~~~~~
	- Set animator in unity (Recall animation and animator controller goes on object being animated)
	- Write name of tag you wish to be animated in unity
	  (animation triggered by left mouse click on objects with that tag)
	- Under the animator tab next to Scene and Game(appears after you make 
	  animator controller) you create a condition, which in our case is a
	  trigger, to set off the Animation. animationState is the name of that trigger.
	- Read comments of the variables below

    --
    ~ Code by Jordan Marx ~ (2015)
*/


// Used to set off animation
var animator:Animator; 

// Raycast hit
var hit:RaycastHit;

// Name of objects tag you want to be animated when clicked on
var nameOfTag:String; 

// Name of the animations state to be triggered
var animationState:String; 

// GameObject of the brain used for setting alpha value
// Recall the brain is made up of two game objects
var brain1:GameObject;
var brain2:GameObject; 

// GameObject used to enable halo
var lightGameObject:GameObject;

// Timer for the animation clip length
private var timer:float;

// Gets animation length
private var animationLength:float;

// +10 so its already greater than animation
timer = animator.GetComponent.<Animation>().clip.length + 10; 

// Gets length of animation
animationLength = animator.GetComponent.<Animation>().clip.length; 

// Materials for brain
var matOpaque:Material;
var matTransparent:Material;



/*
 * Update.
 */
function Update () {
	
	// If you have left clicked on mouse
	if (Input.GetMouseButtonDown(0))
	{
		var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		
		if (Physics.Raycast(ray, hit))
		{
			// If you hit the tag
			if(hit.collider.tag == nameOfTag)
			{	
				// Sets off animation
				animator.SetTrigger(animationState);
				
                // Set timer to 0.
				// This will make the if statement in checkIfAnimating() true
				timer = 0;
			}
		
		}
	}
	
    // Checks if animating
	checkIfAnimating();
}

/*
 * Function that checks if the electrical signals in the brain are being animated.
 */
function checkIfAnimating() {

	// Animation is running
	if(animationLength > timer)
	{
        // Set the material
		brain1.GetComponent.<Renderer>().material = matTransparent;
		brain2.GetComponent.<Renderer>().material = matTransparent;
	
		// Have timer increase
		timer = timer + Time.deltaTime;
		
		// Enable the halo and set its size and color
		lightGameObject.GetComponent.<Light>().enabled = true;
		lightGameObject.GetComponent.<Light>().range = 0.1;
		lightGameObject.GetComponent.<Light>().color = Color.white;
		
		// Change the brains alpha value
		brain1.GetComponent.<Renderer>().material.color.a = 0.7; //0.7
		brain2.GetComponent.<Renderer>().material.color.a = 0.7;
	}
	// Animation is not running
	else
	{
		// Disable the halo
		lightGameObject.GetComponent.<Light>().enabled = false;
		lightGameObject.GetComponent.<Light>().range = 0.08;
		lightGameObject.GetComponent.<Light>().color = Color.yellow;
		
		// Set the material
		brain1.GetComponent.<Renderer>().material = matOpaque;
		brain2.GetComponent.<Renderer>().material = matOpaque;
	}
	

}
