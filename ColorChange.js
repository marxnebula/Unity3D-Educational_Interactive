#pragma strict


/* ~~~~~~~~Class Info~~~~~~~~
	- Instead of using a tag, set the mesh collider in unity.  This collider will be
	  used to check if the object has been clicked on.
	- The color will gradually change from its startingColor to its clickedColor if
	  clicked on(And vice versa)!  

    --
    ~ Code by Jordan Marx ~ (2015)
*/


// Raycast
var hit:RaycastHit;

// So we can lerp the color of the renderer
var rend:Renderer;

// Lerp color variables
private var lerpedColor:Color;
private var clickableLerpedColor:Color;

// Timer for how fast the object changes color when highlighted
var highlightTimer:float = 0;

// Timer for how fast the object changes color after clicked
var timer:float = 0;

// Boolean for if highlighteed
var isHighlighted:boolean = false;

// Boolean for keeping track if collider was clicked on
var isClicked = false;

// Starting color
var startingColor:Color;

// Color the object turns into after being clicked
var clickedColor:Color;

// Starting color of when highlighting
var startingHighlightColor:Color;

// The highlight color
var highlightColor:Color;

// Collider you are going to click on to change color
var meshCol:MeshCollider;

// Boolean for is sound
var isSound:boolean = false;


/*
 * Function called at the start of loading the scene.
 */
function Start () {

	// Just incase no color is set
	if(clickedColor == null)
	{
		clickedColor = Color.black;
	}
	if(startingColor == null)
	{
		startingColor = Color.black;
	}

}

/*
 * Update.
 */
function Update () {

	// If you have left clicked on mouse
	if (Input.GetMouseButtonDown(0))
	{
        // Get ray
		var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		
		if (Physics.Raycast(ray, hit))
		{
			// If you hit the mesh collider
			if(hit.collider == meshCol)
			{
				// Change isClicked to opposite
				isClicked = !isClicked;
				
				if(isClicked)
				{
					isSound = true;
				}
				
			}
		}
	}
	
	// If object is clicked on then change its color to clickedColor
	if(isClicked)
	{
		// Increases the clickedColor value
		timer += 2.5 * Time.deltaTime;
	}
	// If object was already clicked on then change its color back to startingColor
	else
	{
		// Decreases the clickedColor and turns into the startingColor
		timer -= 2.5 * Time.deltaTime;
	}
	
	// Make sure it doesn't go higher than 1 or lower than 0
	if(timer > 1)
	{
		timer = 1;
	}
	else if(timer < 0)
	{
		timer = 0;
	}
	
    // Play sound if clicked and sound ready
	if(isClicked && isSound)
	{
		GetComponent.<AudioSource>().PlayOneShot(GetComponent.<AudioSource>().clip, 0.7F);
		isSound = false;
	}
	
	// LERP the object
	lerpedColor = Color.Lerp(clickableLerpedColor, clickedColor, timer);
	rend.material.color = lerpedColor;
	
	// Call function
	ChangeColorIfClickableObject();
}

/*
 * Function thats lerps a clickable object.
 */
function ChangeColorIfClickableObject() {

    // If hasn't been clicked
	if(!isClicked)
	{
		var ray1 : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		
		if (Physics.Raycast(ray1, hit))
		{
			// If you hit the mesh collider
			if(hit.collider == meshCol)
			{
				isHighlighted = true;
			}
			else
			{
				isHighlighted = false;
			}
		}
	
	
	// If object is clicked on then change its color to clickedColor
	if(isHighlighted)
	{
		// Increases the clickedColor value
		highlightTimer += 3.75 * Time.deltaTime;
	}
	// If object was already clicked on then change its color back to startingColor
	else
	{
		// Decreases the clickedColor and turns into the startingColor
		highlightTimer -= 3.75 * Time.deltaTime;
	}
	
	// Make sure it doesn't go higher than 1 or lower than 0
	if(highlightTimer > 1)
	{
		highlightTimer = 1;
	}
	else if(highlightTimer < 0)
	{
		highlightTimer = 0;
	}
	
    // Lerp the game object
	clickableLerpedColor = Color.Lerp(startingHighlightColor, highlightColor, highlightTimer);
	rend.material.color = clickableLerpedColor;
	
	}
}