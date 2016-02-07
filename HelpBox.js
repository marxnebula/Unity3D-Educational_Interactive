#pragma strict

/* ~~~~~~~~Class Info~~~~~~~~
	- Class for displaying the help box.
    - The help box is there to instruct the user of the purpose of the game.

    --
    ~ Code by Jordan Marx ~ (2015)
*/


// Texture of the help button
var helpIcon:Texture2D; 

// Texture of the help button when highlighted
var helpGlowIcon:Texture2D;

// Texture of the X out button
var xTexture:Texture2D;

// Texture of the X out button when highlighted
var xHighlightTexture:Texture2D;

// The current X out texture
private var currentXTexture:Texture2D;

// The current icon texture
private var currentIcon:Texture2D;

// Style for the Help Button
var helpButtonStyle:GUIStyle;

// Style for the info button
var infoStyle:GUIStyle;

// Style for the X out button
var xStyle:GUIStyle;

// Gui skin
var mySkin:GUISkin;

// If you clicked on the help button
var isClicked = false; 

// Used to turn off the description lines on the cross section brain when help button is pressed
var line1:LineRenderer;
var line2:LineRenderer;
var line3:LineRenderer;
var line4:LineRenderer;
var line5:LineRenderer;
var line6:LineRenderer;
var line7:LineRenderer;

// Used to turn off line game objects when help button is pressed
var lineGameObject1:GameObject;
var lineGameObject2:GameObject;
var lineGameObject3:GameObject;
var lineGameObject4:GameObject;
var lineGameObject5:GameObject;
var lineGameObject6:GameObject;
var lineGameObject7:GameObject;

// Used to turn off labels when help button is pressed
var labelObject1:GameObject;
var labelObject2:GameObject;
var labelObject3:GameObject;
var labelObject4:GameObject;
var labelObject5:GameObject;
var labelObject6:GameObject;

// Rect for when help button has been clicked
var mainRect:Rect;

// Rect for help box
var helpRect:Rect;

// Rect for X out button
var xRect:Rect;

// Boolean for is mouse is over something
var isMouseOver:boolean = false;

// Dermatome script
var dermatomeScript:Dermatome;

// The brains collider
var brainCollider:CapsuleCollider;

// Script used to change the color
var alsColorChange:ColorChange;
var dorsalColorChange:ColorChange;
var grayMatterColorChange:ColorChange;
var lissauerColorChange:ColorChange;
var whiteMatterColorChange:ColorChange;

// Script for changing the cursor
var changeCursors:ChangeCursors;

// Used to store the hand cursor texture
var storeOpenHandCursorTexture:Texture2D;
var storeClosedHandCursorTexture:Texture2D;
var storePrickHandCursorTexture:Texture2D;
var storePointingHandCursorTexture:Texture2D;

// Sound boolean
var isSound:boolean = false;

// So sound only plays once
var onlySoundOnce:boolean = true;

// Sound boolean for X button
var isXSound:boolean = false;

// So sound only plays once for X button
var onlyXOnce:boolean = true;

/*
 * Function called at the start of loading the scene.
 */
function Start() {

    // Set the current textures
	currentIcon = helpIcon;
	currentXTexture = xTexture;
	
    // Store the cursor textures
	storeOpenHandCursorTexture = changeCursors.openHandCursorTexture;
	storeClosedHandCursorTexture = changeCursors.closedHandCursorTexture;
	storePrickHandCursorTexture = changeCursors.prickHandCursorTexture;
	storePointingHandCursorTexture = changeCursors.pointingHandCursorTexture2;
}

/*
 * Update.
 */
function Update() {

    // If help box is clicked
	if(isClicked)
	{
		// Set width to 0
		line1.SetWidth(0,0);
		line2.SetWidth(0,0);
		line3.SetWidth(0,0);
		line4.SetWidth(0,0);
		line5.SetWidth(0,0);
		line6.SetWidth(0,0);
		line7.SetWidth(0,0);
		
		
		// Set the script Label and Description to false
		labelObject1.GetComponent.<LabelAndDescription>().enabled = false;
		labelObject2.GetComponent.<LabelAndDescription>().enabled = false;
		labelObject3.GetComponent.<LabelAndDescription>().enabled = false;
		labelObject4.GetComponent.<LabelAndDescription>().enabled = false;
		labelObject5.GetComponent.<LabelAndDescription>().enabled = false;
		labelObject6.GetComponent.<LabelAndDescription>().enabled = false;
		
        // Turn off the line game objects
		lineGameObject1.GetComponent.<LineJava>().enabled = false;
		lineGameObject2.GetComponent.<LineJava>().enabled = false;
		lineGameObject3.GetComponent.<LineJava>().enabled = false;
		lineGameObject4.GetComponent.<LineJava>().enabled = false;
		lineGameObject5.GetComponent.<LineJava>().enabled = false;
		lineGameObject6.GetComponent.<LineJava>().enabled = false;
		lineGameObject7.GetComponent.<LineJava>().enabled = false;
		
	}
	else
	{
		// Set the width to 0.009
		line1.SetWidth(0.009,0.009);
		line2.SetWidth(0.009,0.009);
		line3.SetWidth(0.009,0.009);
		line4.SetWidth(0.009,0.009);
		line5.SetWidth(0.009,0.009);
		line6.SetWidth(0.009,0.009);
		line7.SetWidth(0.009,0.009);
		
		// Set the script Label and Description to true
		labelObject1.GetComponent.<LabelAndDescription>().enabled = true;
		labelObject2.GetComponent.<LabelAndDescription>().enabled = true;
		labelObject3.GetComponent.<LabelAndDescription>().enabled = true;
		labelObject4.GetComponent.<LabelAndDescription>().enabled = true;
		labelObject5.GetComponent.<LabelAndDescription>().enabled = true;
		labelObject6.GetComponent.<LabelAndDescription>().enabled = true;
		
        // Turn the line gam objects back on
		lineGameObject1.GetComponent.<LineJava>().enabled = true;
		lineGameObject2.GetComponent.<LineJava>().enabled = true;
		lineGameObject3.GetComponent.<LineJava>().enabled = true;
		lineGameObject4.GetComponent.<LineJava>().enabled = true;
		lineGameObject5.GetComponent.<LineJava>().enabled = true;
		lineGameObject6.GetComponent.<LineJava>().enabled = true;
		lineGameObject7.GetComponent.<LineJava>().enabled = true;
	}
	
    // Call the function
	DontAllowClickingOfBackground();
	
    // Play the sound only once
	if(isSound && onlySoundOnce)
	{
        // Get the audio and play it
	    GetComponent.<AudioSource>().PlayOneShot(GetComponent.<AudioSource>().clip, 0.12F);

        // Set isSound to false
	    isSound = false;

        // Set onlySoundOnce to false
		onlySoundOnce = false;
	}

    // Play the X button sound only once
	if(isXSound && onlyXOnce)
	{
        // Get the audio and play it
	    GetComponent.<AudioSource>().PlayOneShot(GetComponent.<AudioSource>().clip, 0.12F);

        // Set the isXSound to false
	    isXSound = false;

        // Set the onlyXOnce to false
		onlyXOnce = false;
	}
}

/*
 * Displays the help box UI.
 */
function OnGUI()
{
    // Set the skin
	GUI.skin = mySkin;
	
    // If helpbox is clicked
	if(isClicked)
	{
        
		// This is the main rect for description
		mainRect = new Rect(50, 60, Screen.width - 100, Screen.height - 120);

	    // Text used for this box is just the title
		GUI.Box(mainRect, "\nHelp Screen");

	    // Set the X rect
		xRect = new Rect(Screen.width - 80, 62, 30, 30);
		
		// Display the X button
		if(GUI.Button(xRect, currentXTexture, xStyle))
		{
			isClicked = !isClicked;
		}
		
		// Description of what to do
		GUI.Box(new Rect(80, 90, Screen.width - 160, Screen.height - 180), "\n\nWelcome to the Neuroanatomy Visualization Tool \n\n" 
		+ "<b>How do I use the program?</b> \n \n"
		+ "    <b>Basic Menus</b> \n"
		+ "    Browse the menu on the main start-up screen to access different visualization on neural pathways \n \n"
		+ "    <b>Selections</b> \n"
		+ "    Click on or tap the structure of interest to reveal a label \n"
		+ "    Deselect by clicking the structure again. \n"
		+ "    Click on label text to access more information on the structure. \n"
		+ "    Click on individual dermatomes to perform the pin-prick test and apply painful sensory cutaneous stimuli. \n \n"
		+ "    <b>Model Rotation</b> \n"
		+ "    Click, hold and drag the neural axis model to change its spatial rotation \n \n"
		+ "    <b>Slider</b> \n"
		+ "    Adjust the slider bar to change the cross-sectional viewpoint between spinal segments \n",
		infoStyle);
		
	}
	
	// Set help rect
	helpRect = new Rect(Screen.width - 90,Screen.height - 50,currentIcon.width,currentIcon.height);

    // If Help button is pressed
	if(GUI.Button(helpRect, currentIcon, helpButtonStyle))
	{
		isClicked = !isClicked;
	}
	
	// If mouse is on the rect then change its texture.
	if(helpRect.Contains(Event.current.mousePosition))
	{
		currentIcon = helpGlowIcon;
		isSound = true;
	}
	else
	{
		isSound = false;
		onlySoundOnce = true;
		currentIcon = helpIcon;
	}
	
	// If mouse is on the rect then change its texture.
	if(xRect.Contains(Event.current.mousePosition))
	{
		currentXTexture = xHighlightTexture;
		isXSound = true;
	}
	else
	{
		isXSound = false;
		onlyXOnce = true;
		currentXTexture = xTexture;
	}

}


/*
 * Function that turns off everything outside of the help menu.
 */
function DontAllowClickingOfBackground() {

    // If help button has been clicked
	if(isClicked)
	{
        // Turn off dermatome script
	    dermatomeScript.enabled = false;

        // Turn off brain collider
	    brainCollider.enabled = false;

        // Turn off the color change scripts
		alsColorChange.enabled = false;
		dorsalColorChange.enabled = false;
		grayMatterColorChange.enabled = false;
		lissauerColorChange.enabled = false;
		whiteMatterColorChange.enabled = false;
		
        // Set the teture cursors to null
		changeCursors.openHandCursorTexture = null;
		changeCursors.closedHandCursorTexture = null;
		changeCursors.prickHandCursorTexture = null;
		changeCursors.pointingHandCursorTexture2 = null;
	}
	else
	{
        // Turn on the dermatome script
	    dermatomeScript.enabled = true;

        // Turn on brain collider
	    brainCollider.enabled = true;

        // Turn on the color change scripts
		alsColorChange.enabled = true;
		dorsalColorChange.enabled = true;
		grayMatterColorChange.enabled = true;
		lissauerColorChange.enabled = true;
		whiteMatterColorChange.enabled = true;
		
        // Set the texture cursors to the normal textures
		changeCursors.openHandCursorTexture = storeOpenHandCursorTexture;
		changeCursors.closedHandCursorTexture = storeClosedHandCursorTexture;
		changeCursors.prickHandCursorTexture = storePrickHandCursorTexture;
		changeCursors.pointingHandCursorTexture2 = storePointingHandCursorTexture;
	}
}
