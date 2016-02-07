#pragma strict

/* ~~~~~~~~Class Info~~~~~~~~
	- Dermatome texture has specific colors for each C section.  If the mouse clicks
      on a certain color then it corresponds to a certain C section.
    - All C colors must be put in from unity.
    - If a C color has been clicked on then it changes the brains material and sets
      off the animation.

    --
    ~ Code by Jordan Marx ~ (2015)
*/


// Texture of the dermatome
var dermatomeTexture:Texture2D;

// Raycasts
var hit:RaycastHit;
var hit2:RaycastHit; // Pause button
var hit3:RaycastHit;

// Mesh collider and render of dermatome man
var meshCol:MeshCollider;
var meshRend:MeshRenderer;

// Store the color
var storedColor:Color;

// Pixel vectors
var pixelVector:Vector2;
var pV:Vector2;

// Animation state
var animationState:String;

// The animator
var animator:Animator;

// The animation
var a:Animation;

// Colors of dermatome man
var c2Color:Color;
var c3Color:Color;
var c4Color:Color;
var c5Color:Color;
var c6Color:Color;
var c7Color:Color;
var c8Color:Color;

// The C lights on the left
var c2Left:GameObject;
var c3Left:GameObject;
var c4Left:GameObject;
var c5Left:GameObject;
var c6Left:GameObject;
var c7Left:GameObject;
var c8Left:GameObject;

// The C lights on the right
var c2Right:GameObject;
var c3Right:GameObject;
var c4Right:GameObject;
var c5Right:GameObject;
var c6Right:GameObject;
var c7Right:GameObject;
var c8Right:GameObject;

// GameObject of the brain used for setting alpha value
// Recall the brain is two game objects
var brain1:GameObject;
var brain2:GameObject; 

// GameObject used to enable halo
var lightGameObject:GameObject;

// The brain materials
var matOpaque:Material;
var matTransparent:Material;

// GUI skin
var mySkin:GUISkin;

// Timer for animation
var timer:float;

// Animation length
var animationLength:float;
animationLength = animator.GetComponent.<Animation>().clip.length + 10;

// +10 so its already greater than animation
timer = animator.GetComponent.<Animation>().clip.length + 10;

// Boolea for animating
var isAnimating = false;

// Boolean for sound
var isSound:boolean = false;

// The Halo lights
var clickedSpotHalo:Light;
var clickedSpotHalo2:Light;
var clickedSpotHalo3:Light;

// Halo size and increment to increase and decrease its size
var haloSize:float = 0;
var haloIncrement:float;

// Timers for halo
var t:float = 0;
var t1:float = 0;
var min:float = 0;
var max:float = 0;

// Boolean for if clicked
var isClicked:boolean = false;

// Color for checking to see if it's a clickable color
var checkClickableColor:Color;

// Boolean for if clickable color
var isClickableColor:boolean = false;

// Boolean for what C left it is
var isLeftC2:boolean = false;
var isLeftC3:boolean = false;
var isLeftC4:boolean = false;
var isLeftC5:boolean = false;
var isLeftC6:boolean = false;
var isLeftC7:boolean = false;
var isLeftC8:boolean = false;

// Boolean for what C right it is
var isRightC2:boolean = false;
var isRightC3:boolean = false;
var isRightC4:boolean = false;
var isRightC5:boolean = false;
var isRightC6:boolean = false;
var isRightC7:boolean = false;
var isRightC8:boolean = false;

// Boolean for when to enable/disable the left C's and right C's
var isEnableC:boolean = false;

// Blank string for displaying which C
private var displayC:String = "";

// C rect
private var cRect:Rect;

// GUI style for C
var cStyle:GUIStyle;

// Boolean to set off the animation
var runAnimation:boolean;


/*
 * Function called at the start of loading the scene.
 */
function Start () {
	
    // Turn off the left C's mesh collider
	c2Left.GetComponent.<MeshCollider>().enabled = false;
	c3Left.GetComponent.<MeshCollider>().enabled = false;
	c4Left.GetComponent.<MeshCollider>().enabled = false;
	c5Left.GetComponent.<MeshCollider>().enabled = false;
	c6Left.GetComponent.<MeshCollider>().enabled = false;
	c7Left.GetComponent.<MeshCollider>().enabled = false;
	c8Left.GetComponent.<MeshCollider>().enabled = false;
	
    // Turn off the right C's mesh collider
	c2Right.GetComponent.<MeshCollider>().enabled = false;
	c3Right.GetComponent.<MeshCollider>().enabled = false;
	c4Right.GetComponent.<MeshCollider>().enabled = false;
	c5Right.GetComponent.<MeshCollider>().enabled = false;
	c6Right.GetComponent.<MeshCollider>().enabled = false;
	c7Right.GetComponent.<MeshCollider>().enabled = false;
	c8Right.GetComponent.<MeshCollider>().enabled = false;
	
	// Turn off the halos
	clickedSpotHalo.enabled = false;
	clickedSpotHalo2.enabled = false;
	clickedSpotHalo3.enabled = false;
	
    // Turn off the left C's light
	c2Left.GetComponent.<Light>().enabled = false;
	c3Left.GetComponent.<Light>().enabled = false;
	c4Left.GetComponent.<Light>().enabled = false;
	c5Left.GetComponent.<Light>().enabled = false;
	c6Left.GetComponent.<Light>().enabled = false;
	c7Left.GetComponent.<Light>().enabled = false;
	
    // Turn off the right C's light
	c2Right.GetComponent.<Light>().enabled = false;
	c3Right.GetComponent.<Light>().enabled = false;
	c4Right.GetComponent.<Light>().enabled = false;
	c5Right.GetComponent.<Light>().enabled = false;
	c6Right.GetComponent.<Light>().enabled = false;
	c7Right.GetComponent.<Light>().enabled = false;
		
		
}

/*
 * Update.
 */
function Update () {
	
	// Call the function
    checkIfAnimating();

    // Sets the dermatome texture
	dermatomeTexture = meshRend.material.mainTexture as Texture2D;
	
    // If the animation state is the name
	if(animator.GetCurrentAnimatorStateInfo(0).IsName("Take 001"))
	{
        // Set the length of the animation
		animationLength = animator.GetCurrentAnimatorStateInfo(0).length;
	}
	
    // Call the functions
	ModifyAnimation();
	CreateHaloWhereYouClicked();
	CheckIfHighlightingClickableColor();
	
    // If it is not animating
	if(!isAnimating)
	{
		
        // If left mouse button is down
		if (Input.GetMouseButtonDown(0))
		{
			var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
			
			if (Physics.Raycast(ray, hit))
			{
			    // If you hit the mesh collider
				if(hit.collider == meshCol)
				{
                    // Set the pixel vector to be where you hit
				    pixelVector = hit.textureCoord;

                    // Store the color of the dermatome texture at that pixel
					storedColor = dermatomeTexture.GetPixel(pixelVector.x * dermatomeTexture.width, 
					pixelVector.y * dermatomeTexture.height);
				}
				
			}
			
		}
	}
	
    // If you clicked on the left side of the dermatome man
	if(((pixelVector.x)*dermatomeTexture.width) < ((dermatomeTexture.width)/2))
	{
		if(storedColor == c2Color)
		{
            // Set timer to 0
		    timer = 0;

            // Set off the trigger on the animator
			animator.SetTrigger(animationState);
			
            // Set the C's range and color
			c2Right.GetComponent.<Light>().range = 0.1;
			c2Right.GetComponent.<Light>().color = Color.white;
			isSound = true;
			
			isRightC2 = true;
			runAnimation = true;
		}
		else if(storedColor == c3Color)
		{
		    // Set timer to 0
		    timer = 0;

		    // Set off the trigger on the animator
			animator.SetTrigger(animationState);
			
		    // Set the C's range and color
			c3Right.GetComponent.<Light>().range = 0.1;
			c3Right.GetComponent.<Light>().color = Color.white;
			isSound = true;
			
			isRightC3 = true;
			runAnimation = true;
		}
		else if(storedColor == c4Color)
		{
		    // Set timer to 0
		    timer = 0;

		    // Set off the trigger on the animator
			animator.SetTrigger(animationState);
			
		    // Set the C's range and color
			c4Right.GetComponent.<Light>().range = 0.1;
			c4Right.GetComponent.<Light>().color = Color.white;
			isSound = true;
			
			isRightC4 = true;
			runAnimation = true;
		}
		else if(storedColor == c5Color)
		{
		    // Set timer to 0
		    timer = 0;

		    // Set off the trigger on the animator
			animator.SetTrigger(animationState);
			
		    // Set the C's range and color
			c5Right.GetComponent.<Light>().range = 0.1;
			c5Right.GetComponent.<Light>().color = Color.white;
			isSound = true;
			
			isRightC5 = true;
			runAnimation = true;
		}
		else if(storedColor == c6Color)
		{
		    // Set timer to 0
		    timer = 0;

		    // Set off the trigger on the animator
			animator.SetTrigger(animationState);
			
		    // Set the C's range and color
			c6Right.GetComponent.<Light>().range = 0.1;
			c6Right.GetComponent.<Light>().color = Color.white;
			isSound = true;
			
			isRightC6 = true;
			runAnimation = true;
		}
		else if(storedColor == c7Color)
		{
		    // Set timer to 0
		    timer = 0;

		    // Set off the trigger on the animator
			animator.SetTrigger(animationState);
			
		    // Set the C's range and color
			c7Right.GetComponent.<Light>().range = 0.1;
			c7Right.GetComponent.<Light>().color = Color.white;
			isSound = true;
			
			isRightC7 = true;
			runAnimation = true;
		}
		else if(storedColor == c8Color)
		{
		    // Set timer to 0
		    timer = 0;

		    // Set off the trigger on the animator
			animator.SetTrigger(animationState);
			
		    // Set the C's range and color
			c8Right.GetComponent.<Light>().range = 0.1;
			c8Right.GetComponent.<Light>().color = Color.white;
			isSound = true;
			
			isRightC8 = true;
			
			runAnimation = true;
		}
	}
    // Else it is the right side of the dermatome man
	else
	{
		if(storedColor == c2Color)
		{
		    // Set timer to 0
		    timer = 0;

		    // Set off the trigger on the animator
			animator.SetTrigger(animationState);
			
		    // Set the C's range and color
			c2Left.GetComponent.<Light>().range = 0.1;
			c2Left.GetComponent.<Light>().color = Color.white;
			isSound = true;
			
			isLeftC2 = true;
			runAnimation = true;
		}
		else if(storedColor == c3Color)
		{
		    // Set timer to 0
		    timer = 0;

		    // Set off the trigger on the animator
			animator.SetTrigger(animationState);
			
		    // Set the C's range and color
			c3Left.GetComponent.<Light>().range = 0.1;
			c3Left.GetComponent.<Light>().color = Color.white;
			isSound = true;
			
			isLeftC3 = true;
			runAnimation = true;
		}
		else if(storedColor == c4Color)
		{
		    // Set timer to 0
		    timer = 0;

		    // Set off the trigger on the animator
			animator.SetTrigger(animationState);
			
		    // Set the C's range and color
			c4Left.GetComponent.<Light>().range = 0.1;
			c4Left.GetComponent.<Light>().color = Color.white;
			isSound = true;
			
			isLeftC4 = true;
			runAnimation = true;
		}
		else if(storedColor == c5Color)
		{
		    // Set timer to 0
		    timer = 0;

		    // Set off the trigger on the animator
			animator.SetTrigger(animationState);
			
		    // Set the C's range and color
			c5Left.GetComponent.<Light>().range = 0.1;
			c5Left.GetComponent.<Light>().color = Color.white;
			isSound = true;
			
			isLeftC5 = true;
			runAnimation = true;
		}
		else if(storedColor == c6Color)
		{
		    // Set timer to 0
		    timer = 0;

		    // Set off the trigger on the animator
			animator.SetTrigger(animationState);
			
		    // Set the C's range and color
			c6Left.GetComponent.<Light>().range = 0.1;
			c6Left.GetComponent.<Light>().color = Color.white;
			isSound = true;
			
			isLeftC6 = true;
			runAnimation = true;
		}
		else if(storedColor == c7Color)
		{
		    // Set timer to 0
		    timer = 0;

		    // Set off the trigger on the animator
			animator.SetTrigger(animationState);
			
		    // Set the C's range and color
			c7Left.GetComponent.<Light>().range = 0.1;
			c7Left.GetComponent.<Light>().color = Color.white;
			isSound = true;
			
			isLeftC7 = true;
			runAnimation = true;
		}
		else if(storedColor == c8Color)
		{
		    // Set timer to 0
		    timer = 0;

		    // Set off the trigger on the animator
			animator.SetTrigger(animationState);
			
		    // Set the C's range and color
			c8Left.GetComponent.<Light>().range = 0.1;
			c8Left.GetComponent.<Light>().color = Color.white;
			isSound = true;
			
			isLeftC8 = true;
			
			runAnimation = true;
		}
	}
	
	// If sound then play
	if(isSound)
	{
		GetComponent.<AudioSource>().PlayOneShot(GetComponent.<AudioSource>().clip, 0.5F);
		isSound = false;
	}
	
	// Set the stored color to black
	storedColor = Color.black;
}


/*
 * Checks if the animation is running.
 */
function checkIfAnimating() {

	// Animator is playing the animiation name or runAnimation is set off
	if(animator.GetCurrentAnimatorStateInfo(0).IsName("Take 001") || runAnimation)
	{
        // Set booleans
		isAnimating = true;
		isEnableC = true;
		
		/* Which ever left C it is it will enable the mesh collider and light  */
		if(isLeftC2)
		{
			c2Left.GetComponent.<MeshCollider>().enabled = true;
			c2Left.GetComponent.<Light>().enabled = true;
		}
		else if(isLeftC3)
		{
			c3Left.GetComponent.<MeshCollider>().enabled = true;
			c3Left.GetComponent.<Light>().enabled = true;
		}
		else if(isLeftC4)
		{
			c4Left.GetComponent.<MeshCollider>().enabled = true;
			c4Left.GetComponent.<Light>().enabled = true;
		}
		else if(isLeftC5)
		{
			c5Left.GetComponent.<MeshCollider>().enabled = true;
			c5Left.GetComponent.<Light>().enabled = true;
		}
		else if(isLeftC6)
		{
			c6Left.GetComponent.<MeshCollider>().enabled = true;
			c6Left.GetComponent.<Light>().enabled = true;
		}
		else if(isLeftC7)
		{
			c7Left.GetComponent.<MeshCollider>().enabled = true;
			c7Left.GetComponent.<Light>().enabled = true;
		}
		else if(isLeftC8)
		{
			c8Left.GetComponent.<MeshCollider>().enabled = true;
			c8Left.GetComponent.<Light>().enabled = true;
		}
		
	    /* Which ever left C it is it will enable the mesh collider and light  */
		if(isRightC2)
		{
			c2Right.GetComponent.<MeshCollider>().enabled = true;
			c2Right.GetComponent.<Light>().enabled = true;
		}
		else if(isRightC3)
		{
			c3Right.GetComponent.<MeshCollider>().enabled = true;
			c3Right.GetComponent.<Light>().enabled = true;
		}
		else if(isRightC4)
		{
			c4Right.GetComponent.<MeshCollider>().enabled = true;
			c4Right.GetComponent.<Light>().enabled = true;
		}
		else if(isRightC5)
		{
			c5Right.GetComponent.<MeshCollider>().enabled = true;
			c5Right.GetComponent.<Light>().enabled = true;
		}
		else if(isRightC6)
		{
			c6Right.GetComponent.<MeshCollider>().enabled = true;
			c6Right.GetComponent.<Light>().enabled = true;
		}
		else if(isRightC7)
		{
			c7Right.GetComponent.<MeshCollider>().enabled = true;
			c7Right.GetComponent.<Light>().enabled = true;
		}
		else if(isRightC8)
		{
			c8Right.GetComponent.<MeshCollider>().enabled = true;
			c8Right.GetComponent.<Light>().enabled = true;
		}
		
	
		// Have timer increase
		if(animator.enabled)
		{
			timer = timer + Time.deltaTime;
		}
		
        // If timer is greater than 5 then set it to false
		if(timer > 5)
		{
			runAnimation = false;
		}
		
	    // Set the material for the brain
		brain1.GetComponent.<Renderer>().material = matTransparent;
		brain2.GetComponent.<Renderer>().material = matTransparent;
		
		// Change the brains alpha value
		brain1.GetComponent.<Renderer>().material.color.a = 0.7;
		brain2.GetComponent.<Renderer>().material.color.a = 0.7;
		
	}
	// Animation is not running
	else
	{
        // Set animator speed to normal
	    animator.speed = 1.0;
		isAnimating = false;
		
		
		// Change the brains alpha value back to normal
		brain1.GetComponent.<Renderer>().material.color.a = 1;
		brain2.GetComponent.<Renderer>().material.color.a = 1;

        // Set the material to opaque
		brain1.GetComponent.<Renderer>().material = matOpaque;
		brain2.GetComponent.<Renderer>().material = matOpaque;
		
        // Turn off the left C's mesh colliders
		c2Left.GetComponent.<MeshCollider>().enabled = false;
		c3Left.GetComponent.<MeshCollider>().enabled = false;
		c4Left.GetComponent.<MeshCollider>().enabled = false;
		c5Left.GetComponent.<MeshCollider>().enabled = false;
		c6Left.GetComponent.<MeshCollider>().enabled = false;
		c7Left.GetComponent.<MeshCollider>().enabled = false;
		c8Left.GetComponent.<MeshCollider>().enabled = false;
		
	    // Turn off the right C's mesh colliders
		c2Right.GetComponent.<MeshCollider>().enabled = false;
		c3Right.GetComponent.<MeshCollider>().enabled = false;
		c4Right.GetComponent.<MeshCollider>().enabled = false;
		c5Right.GetComponent.<MeshCollider>().enabled = false;
		c6Right.GetComponent.<MeshCollider>().enabled = false;
		c7Right.GetComponent.<MeshCollider>().enabled = false;
		c8Right.GetComponent.<MeshCollider>().enabled = false;
		
	    // Turn off the left C's light
		c2Left.GetComponent.<Light>().enabled = false;
		c3Left.GetComponent.<Light>().enabled = false;
		c4Left.GetComponent.<Light>().enabled = false;
		c5Left.GetComponent.<Light>().enabled = false;
		c6Left.GetComponent.<Light>().enabled = false;
		c7Left.GetComponent.<Light>().enabled = false;
		c8Left.GetComponent.<Light>().enabled = false;
		
	    // Turn off the right C's light
		c2Right.GetComponent.<Light>().enabled = false;
		c3Right.GetComponent.<Light>().enabled = false;
		c4Right.GetComponent.<Light>().enabled = false;
		c5Right.GetComponent.<Light>().enabled = false;
		c6Right.GetComponent.<Light>().enabled = false;
		c7Right.GetComponent.<Light>().enabled = false;
		c8Right.GetComponent.<Light>().enabled = false;
		
	    // If true then set the booleans to false
		if(isEnableC)
		{
			isLeftC2 = false;
			isLeftC3 = false;
			isLeftC4 = false;
			isLeftC5 = false;
			isLeftC6 = false;
			isLeftC7 = false;
			isLeftC8 = false;
			isRightC2 = false;
			isRightC3 = false;
			isRightC4 = false;
			isRightC5 = false;
			isRightC6 = false;
			isRightC7 = false;
			isRightC8 = false;
		}

        // set the boolean to false
		isEnableC = false;
	}
	

}

/*
 * If you click on the pause button then it pauses the animation.
 * If you click on it again then it plays the animation.
 */
function ModifyAnimation()
{
	// If left click mouse
	if (Input.GetMouseButtonDown(0))
	{
		var ray2 : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		
		if (Physics.Raycast(ray2, hit2))
		{
		    // If you hit the pause button
			if(hit2.transform.tag == "pause")
			{
                // Set the opposite
				animator.enabled = !animator.enabled;
			}
			
		}
		
	}
}

/*
 * Creates a halo whereever you clicked.
 * The halo lerps!
 */
function CreateHaloWhereYouClicked()
{
    // If it is animating
	if(isAnimating)
	{
        // Set the halos position to the hit
		clickedSpotHalo.transform.position = hit.point;
		clickedSpotHalo2.transform.position = hit.point;
		clickedSpotHalo3.transform.position = hit.point;
		
        // Enable the halos
		clickedSpotHalo.enabled = true;
		clickedSpotHalo2.enabled = true;
		clickedSpotHalo3.enabled = true;
	}
	else
	{
        // Disable the halos
		clickedSpotHalo.enabled = false;
		clickedSpotHalo2.enabled = false;
		clickedSpotHalo3.enabled = false;
	}

    // Determine the increment of halo size
	if(t > 1)
	{
		t1 = -0.03;
	}
	else if(t <= 0)
	{
		t1 = 0.03;
	}
	
    // Increment
	t = t + t1;
	
    // Lerp the range
	clickedSpotHalo.range = Mathf.Lerp(0, 0.3, t);
	clickedSpotHalo2.range = Mathf.Lerp(0, 0.3, t);
	clickedSpotHalo3.range = Mathf.Lerp(0, 0.3, t);
}


/*
 * Checks if the highlighted object is clickable.
 * Also determines what C you clicked.
 */
function CheckIfHighlightingClickableColor() {

	var rayCheck : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	
	if (Physics.Raycast(rayCheck, hit3))
	{
        // If you hit the mesh collider
		if(hit3.collider == meshCol)
		{
            // Set the texture coordinate
		    pV = hit3.textureCoord;

            // Store the color
			checkClickableColor = dermatomeTexture.GetPixel(pV.x * dermatomeTexture.width, 
			pV.y * dermatomeTexture.height);
		}
		else
		{
			checkClickableColor = Color.black;
		}
	}
	
    // If it is any clickable color then set boolean to true
	if((checkClickableColor == c2Color) || (checkClickableColor == c3Color) || (checkClickableColor == c4Color)
	|| (checkClickableColor == c5Color) || (checkClickableColor == c6Color) || (checkClickableColor == c7Color)
	|| (checkClickableColor == c8Color))
	{
		isClickableColor = true;
	}
	else
	{
		isClickableColor = false;
	}
	
	// If it is the C2 color
	if(checkClickableColor == c2Color)
	{
		displayC = "C2";
	}
	// If it is the C3 color
	else if(checkClickableColor == c3Color)
	{
		displayC = "C3";
	}
	// If it is the C4 color
	else if(checkClickableColor == c4Color)
	{
		displayC = "C4";
	}
	// If it is the C5 color
	else if(checkClickableColor == c5Color)
	{
		displayC = "C5";
	}
	// If it is the C6 color
	else if(checkClickableColor == c6Color)
	{
		displayC = "C6";
	}
	// If it is the C7 color
	else if(checkClickableColor == c7Color)
	{
		displayC = "C7";
	}
	// If it is the C8 color
	else if(checkClickableColor == c8Color)
	{
		displayC = "C8";
	}
    // Else make it empty
	else
	{
		displayC = " ";
	}
	
	
	
	
}

/*
 * Displays the currently selected C section.
 */
function OnGUI()
{
    // Set the skin
    GUI.skin = mySkin;

    // Set the color to white
	GUI.color = Color.white;
	
    // Create the C rect
	cRect = new Rect(90, 70, 40, 40);

    // Create the label
	GUI.Label(cRect, displayC, cStyle);
	
}
