#pragma strict

/*
 * Class that changes the cursor of the mouse based on what is being clicked and/or highlighted.
 */

// Raycast variables
var ray:Ray;
var hit:RaycastHit;

// Booleans for what the mouse is on
var isDermatome:boolean = false;
var isBrain:boolean = false;

// Dermatome game object
var dermatomeGameObject:GameObject;

// Brain game object
var brainGameObject:GameObject;

// Script to get Rects from interfaceButtons
var interfaceButtons:InterfaceButtons;

// Script to get rect from helpBox
var helpBox:HelpBox;

// Textures for mouse
var openHandCursorTexture:Texture2D;
var closedHandCursorTexture:Texture2D;
var pointingHandCursorTexture:Texture2D;
var prickHandCursorTexture:Texture2D;
var prickHandGlowCursorTexture:Texture2D;

// Same texture as other pointing hand but used to turn off sliderValue cursor texture only
var pointingHandCursorTexture2:Texture2D;

// Cursor variables
var cursorMode = CursorMode.Auto;
var hotSpot = Vector2.zero;


/*
 * Update.
 */
function Update () {

    // Get the ray from the camera
    ray = Camera.main.ScreenPointToRay(Input.mousePosition);

	if(Physics.Raycast(ray, hit))
	{
        // If hit brain
		if(hit.collider == brainGameObject.GetComponent.<CapsuleCollider>())
		{
			isBrain = true;
		}
		else
		{
			isBrain = false;
		}
		
        // If hit dermatome
		if(hit.collider == dermatomeGameObject.GetComponent.<MeshCollider>())
		{
			isDermatome = true;
		}
		else
		{
			isDermatome = false;
		}
	}
	
}


/*
 * Sets the cursor based on mouse clicking/hovering.
 */
function OnGUI() {

	// If mouse is down on the brain object
	if(brainGameObject.GetComponent.<axisRotate>().isMouseDown)
	{
		Cursor.SetCursor(closedHandCursorTexture, hotSpot, cursorMode);
	}
    // Else if interface play button is being hovered over
	else if(interfaceButtons.playRect.Contains(Event.current.mousePosition))
	{
		Cursor.SetCursor(pointingHandCursorTexture, hotSpot, cursorMode);
	}
    // Else if mouse clicked on the brain
	else if(isBrain)
	{
		Cursor.SetCursor(openHandCursorTexture, hotSpot, cursorMode);
	}
    // Else if interface clear button is being hovered over
	else if(interfaceButtons.clearRect.Contains(Event.current.mousePosition))
	{
		Cursor.SetCursor(pointingHandCursorTexture, hotSpot, cursorMode);
	}
    // Else if interface menu button is being hovered over
	else if(interfaceButtons.menuRect.Contains(Event.current.mousePosition))
	{
		Cursor.SetCursor(pointingHandCursorTexture, hotSpot, cursorMode);
	}
    // Else if interface mag button is being hovered over
	else if(interfaceButtons.magRect.Contains(Event.current.mousePosition))
	{
		Cursor.SetCursor(pointingHandCursorTexture, hotSpot, cursorMode);
	}
    // Else if the help box is being hovered over
	else if(helpBox.helpRect.Contains(Event.current.mousePosition))
	{
		Cursor.SetCursor(pointingHandCursorTexture, hotSpot, cursorMode);
	}
    // Else if you are hovering over a clickable color on dermatome
	else if(dermatomeGameObject.GetComponent.<Dermatome>().isClickableColor)
	{
		Cursor.SetCursor(prickHandGlowCursorTexture, hotSpot, cursorMode);
	}
    // Else if you clicked on the dermatome
	else if(isDermatome)
	{
		Cursor.SetCursor(prickHandCursorTexture, hotSpot, cursorMode);
	}
    // Else just set the mouse to normal
	else
	{
		Cursor.SetCursor(null, Vector2.zero, cursorMode);
	}
	
	
	
}