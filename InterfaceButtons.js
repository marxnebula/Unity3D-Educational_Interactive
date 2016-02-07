#pragma strict

/* ~~ INCLUDES ALL BUTTONS EXCEPT HELP BUTTON(it's in HelpBox script) ~~
	- Designed for web player resolution.
*/

/* ~~~~~~~~Class Info~~~~~~~~
	- This includes all the buttons except the help button(it's in the help box script)
    - Displays main menu, normal scence, and mag scene UI.
    - It also displays the pop-up menus.

    --
    ~ Code by Jordan Marx ~ (2015)
*/



// Gui skin
var mySkin:GUISkin;

// Texture of the title button
var titleIcon:Texture2D;

// Texture of the title button when highlighted
var titleGlowIcon:Texture2D;

// Current title texture
private var currentTitleIcon:Texture2D;

// GUI style for title
var titleStyle:GUIStyle;

// Texture of the clear button
var clearIcon:Texture2D; 

// Texture of the clear button when highlighted
var clearGlowIcon:Texture2D;

// Current clear texture
private var currentClearIcon:Texture2D;

// GUI style for clear
var clearStyle:GUIStyle;

// Texture of the clear button
var menuIcon:Texture2D;

// Texture of the clear button when highlighted
var menuGlowIcon:Texture2D;

// Current menu texture
private var currentMenuIcon:Texture2D;

// GUI style for menu
var menuStyle:GUIStyle;

// Texture when played
var playIcon:Texture2D;

// Texture when paused
var pauseIcon:Texture2D;

// Texture of play button when highlighted
var playGlowIcon:Texture2D;

// Texture of pause button when highlighted
var pauseGlowIcon:Texture2D;

// Texture of play button after clicked
var playClickedIcon:Texture2D;

// Texture of pause button after clicked
var pauseClickedIcon:Texture2D;

// Current play texture
private var currentPlayIcon:Texture2D;

// Current pause texture
private var currentPauseIcon:Texture2D;

// Boolean for if play clicked
var isPlayClicked:boolean = false;

// Boolean for if pause clicked
var isPauseClicked:boolean = false;

// Aniimator
var animator:Animator; // This animator will be paused

// GUI style for play
var playStyle:GUIStyle;

// Texture of the magnifying glass button
var magIcon:Texture2D;

// Texture of the magnifying glass button when highlighted
var magGlowIcon:Texture2D;

// Current mag texture
private var currentMagIcon:Texture2D;

// GUI style for mag
var magStyle:GUIStyle;

/* All the scenes in the game */
/* These are set in unity */
var mainMenuScene:int;
var normalGameScene:int;
var magnifyGameScene:int;

// Stores current game scene
var currentGameScene:int;

// Boolean for if in mag scene
var isMag:boolean = false;

// Cursor texture
var cursorTexture:Texture2D;

// Cursor variables
var cursorMode = CursorMode.Auto;
var hotSpot = Vector2.zero;

// Rects
var titleRect:Rect;
var clearRect:Rect;
var menuRect:Rect;
var playRect:Rect;
var pauseRect:Rect;
var magRect:Rect;

// Timer for incrementing
var blinkingTimer:float = 0;
var maxTime:float = 2;
var increment:float;

// Booleans for sound
var isPlaySound:boolean = false;
var onlyPlayOnce:boolean = true;
var isHelpSound:boolean = false;
var onlyHelpOnce:boolean = true;
var isMagSound:boolean = false;
var onlyMagOnce:boolean = true;
var isClearSound:boolean = false;
var onlyClearOnce:boolean = true;
var isMenuSound:boolean = false;
var onlyMenuOnce:boolean = true;

// Stores the audio clip
var clickAudio:AudioClip;

/*
 * Function called at the start of loading the scene.
 */
function Start () {

	// Store current icons(make them the non-highlighted ones)
	currentTitleIcon = titleIcon;
	currentClearIcon = clearIcon;
	currentMenuIcon = menuIcon;
	currentPlayIcon = playIcon;
	currentPauseIcon = pauseIcon;
	currentMagIcon = magIcon;
}

/*
 * Update.
 */
function Update() {
	
	// If level is the main menu
	if(Application.loadedLevel == mainMenuScene)
	{
        // Store current scene
	    currentGameScene = mainMenuScene;

        // Set mag boolean
		isMag = false;
	}
    // Else if the level is the normal game scene
	else if(Application.loadedLevel == normalGameScene)
	{
	    // Store current scene
	    currentGameScene = normalGameScene;

	    // Set mag boolean
		isMag = false;
	}
    // Else if the level is the mag game scene
	else if(Application.loadedLevel == magnifyGameScene)
	{
	    // Store current scene
	    currentGameScene = magnifyGameScene;

	    // Set mag boolean
		isMag = true;
	}
	
    // If is play clicked
	if(isPlayClicked)
	{
        // If blinking timer is greater than max time
		if(blinkingTimer > maxTime)
		{
            // Set current play icon to play icon
			currentPlayIcon = playIcon;
			increment = -0.1;
		}
        // Else if blinking timer is less than or equal to 0
		else if(blinkingTimer <= 0)
		{
		    // Set current play icon to play glow icon
		    currentPlayIcon = playGlowIcon;
		    increment = 0.1;
		}
		
        // Increment the blinking timer
		blinkingTimer = blinkingTimer + increment;
	}
	
	// Plays the play sound
	if(isPlaySound && onlyPlayOnce)
	{
		GetComponent.<AudioSource>().PlayOneShot(clickAudio, 0.12F);
		isPlaySound = false;
		onlyPlayOnce = false;
	}

    // Plays the help sound
	if(isHelpSound && onlyHelpOnce)
	{
		GetComponent.<AudioSource>().PlayOneShot(clickAudio, 0.12F);
		isHelpSound = false;
		onlyHelpOnce = false;
	}

    // Plays the mag sound
	if(isMagSound && onlyMagOnce)
	{
		GetComponent.<AudioSource>().PlayOneShot(clickAudio, 0.12F);
		isMagSound = false;
		onlyMagOnce = false;
	}

    // Plays the clear sound
	if(isClearSound && onlyClearOnce)
	{
		GetComponent.<AudioSource>().PlayOneShot(clickAudio, 0.12F);
		isClearSound = false;
		onlyClearOnce = false;
	}

    // Plays the menu sound
	if(isMenuSound && onlyMenuOnce)
	{
		GetComponent.<AudioSource>().PlayOneShot(clickAudio, 0.12F);
		isMenuSound = false;
		onlyMenuOnce = false;
	}

}

/*
 * Displays all the interface buttons except the help box.
 */
function OnGUI() {

	// Get the skin
	GUI.skin = mySkin;
	
	// Draw the title
	titleRect = new Rect((Screen.width) - 270, 12, currentTitleIcon.width, currentTitleIcon.height);
	GUI.Button(titleRect, currentTitleIcon, titleStyle);
	
	// Draw the clear button
	clearRect = new Rect(175,Screen.height - 50,currentClearIcon.width, currentClearIcon.height);
	if(GUI.Button(clearRect, currentClearIcon, clearStyle))
	{
		// Clear current scene
		Application.LoadLevel(currentGameScene);
	}
	
	// Draw the menu button
	menuRect = new Rect(20,Screen.height - 50 ,currentMenuIcon.width,currentMenuIcon.height);
	if(GUI.Button(menuRect, currentMenuIcon, menuStyle))
	{
		// Load the main menu
		Application.LoadLevel(mainMenuScene);
	}
	
	
	// Draw the play/pause button
	// If you click on pause button AND the animation is playing, then you can play/pause the animation
	playRect = new Rect(335, Screen.height - 53, currentPlayIcon.width, currentPlayIcon.height);
	if(GUI.Button(playRect, currentPlayIcon, playStyle))
	{
		// If Take 001 is playing then you can play/pause it
		if(animator.GetCurrentAnimatorStateInfo(0).IsName("Take 001"))
		{
			animator.enabled = !animator.enabled;
			isPlayClicked = !isPlayClicked;
		}
	}
	
	
	// Draw magnify button
	magRect = new Rect(Screen.width - 138, Screen.height - 60, currentMagIcon.width, currentMagIcon.height);

    // If you click magnify
	if(GUI.Button(magRect, currentMagIcon, magStyle))
	{
		
        // If is mag
		if(isMag)
		{
		    isMag = false;

            // Set new current game scene
		    currentGameScene = normalGameScene;

            // Load normal game scene
			Application.LoadLevel(normalGameScene);
		}
		else
		{
		    isMag = true;

            // Set new current game scene
		    currentGameScene = magnifyGameScene;

            // Load the mag game scene
			Application.LoadLevel(magnifyGameScene);
		}
	}
	
	// If the animator name is playing
	if(animator.GetCurrentAnimatorStateInfo(0).IsName("Take 001") && !isPlayClicked)
	{
		currentPlayIcon = playClickedIcon;
	}
	

	
}

/*  
 * Function for changing textures when button is highlighted.
 * If mouse is on the rect then change its texture.
 */
function poo() {
    
    // If mouse is on the title rect
    if(titleRect.Contains(Event.current.mousePosition))
    {
        currentTitleIcon = titleGlowIcon;
    }
    else
    {
        currentTitleIcon = titleIcon;
    }
	
    // If mouse is on the clear rect
    if(clearRect.Contains(Event.current.mousePosition))
    {
        currentClearIcon = clearGlowIcon;
        isClearSound = true;
    }
    else
    {
        onlyClearOnce = true;
        isClearSound = false;
        currentClearIcon = clearIcon;
    }
	
    // If mouse is on menu rect
    if(menuRect.Contains(Event.current.mousePosition))
    {
        currentMenuIcon = menuGlowIcon;
        isMenuSound = true;
    }
    else
    {
        onlyMenuOnce = true;
        isMenuSound = false;
        currentMenuIcon = menuIcon;
    }
	
    // If mouse is on mag rect
    if(magRect.Contains(Event.current.mousePosition))
    {
        currentMagIcon = magGlowIcon;
        isMagSound = true;
    }
    else
    {
        onlyMagOnce = true;
        isMagSound = false;
        currentMagIcon = magIcon;
    }
	
    // If mouse is on play rect
    if(playRect.Contains(Event.current.mousePosition))
    {
        // If animator is playing the named animation
        if(animator.GetCurrentAnimatorStateInfo(0).IsName("Take 001"))
        {
            isPlaySound = true;
        }
    }
    else
    {
        onlyPlayOnce = true;
        isPlaySound = false;
    }
}