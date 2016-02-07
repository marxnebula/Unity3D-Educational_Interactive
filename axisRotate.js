#pragma strict


/* ~~~~~~~~Class Info~~~~~~~~
	- This script is attached to the main brain.
    - Used for rotating the axis of the brain

    --
    ~ Code by Jordan Marx ~ (2015)
*/

// Keeps track of previous mouse position update
var previousMousePosition:Vector3;

// Boolean for mouse status
var isMouseDown:boolean;
var isMouseEnter:boolean;

// Transform of the target
var target:Transform;

// Plane
var objectPlane:Plane;

// Rotation variables
var rot:float = 0;
var rotSpeed:float = 1.0;

// Textures of mouse
var closedHandTexture:Texture2D;
var openHandTexture:Texture2D;

// Variables for mouse input
var cursorMode = CursorMode.Auto;
var hotSpot = Vector2.zero;



/*
 * Update
 */
function Update () {   
    
    // True is mouse is being dragged
    if (isMouseDragged()) 
    {        
        // Function returns true if raycast hits the object plane
        if (castRayPlane(Input.mousePosition)) 
        {
            // Get the vector difference between current position and previous position
            var mouseDelta:Vector3 = Input.mousePosition - previousMousePosition;

            // Set the rot variable
            rot -= mouseDelta.x * rotSpeed;

            // The x, y, and z angles represent a rotation z degrees around the z axis, 
            // x degrees around the x axis, and y degrees around the y axis (in that order).
			target.localEulerAngles = Vector3(0,rot,0);
		}
	}
	
	// Keep tract of previous mouse position
	previousMousePosition = Input.mousePosition;
}


/* 
 * Returns true if raycast hits the objectPlane.
 */
function castRayPlane(pos:Vector3) {
	var ray:Ray = Camera.main.ScreenPointToRay(pos);
	var hit:float;
	
    // If the object plane has been hit then return true
	if (objectPlane.Raycast(ray, hit)) {
		return true;
 	}
	
	return false;
}


/*
*  Function that returns true if mouse is down.
*/
function OnMouseDown() {
    isMouseDown = true;
	
}

/*
*  Function that returns true if mouse is up.
*/ 
function OnMouseUp() {
	isMouseDown = false;
	
}

/*
*  Function that returns true if mouse has entered collider.
*/
function OnMouseEnter() {
	isMouseEnter = true;
	
}

/*
*  Function that returns true if mouse has exited collider.
*/
function OnMouseExit() {
	isMouseEnter = false;
	
}

/*
*  Function that checks if mouse is being dragged.
*/
function isMouseDragged() {
	if (isMouseDown && !vector3Equals(previousMousePosition, Input.mousePosition)) {
		return true;
	}
	return false;
}
	 
/*
 *   Function that checks if two vectors are the same. 
 */
function vector3Equals(vec1:Vector3, vec2:Vector3) {
	if (vec1.x == vec2.x && vec1.y == vec2.y && vec1.z == vec2.z) {
		return true;
	}
	return false;
}