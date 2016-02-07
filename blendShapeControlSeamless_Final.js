#pragma strict

/* ~~~~~~~~~How it works~~~~~~~~~
	- Set all the skin mesh renderers to the approiate cross sectional brain in unity.
	  Each skin mesh renderer has 7 different blend shapes.
	- Decide the size of the vertical slider.  The bigger the value the smoother the morphing.
*/

/* ~~~~~~~~Class Info~~~~~~~~
    - Based on where the slider bar is, it will show the approiate cross sectional brain.
	- Set all the skin mesh renderers to the approiate cross sectional brain in unity.
    - Each skin mesh renderer has 7 different blend shapes.
    - Decide the size of the vertical slider.  The bigger the value the smoother the morping.

    --
    ~ Code by Jordan Marx ~ (2015)
*/


// In unity choose any of these to be your ALS, dorsal root, grey matter, lissauers, or white matter
var skinMeshRenderer:SkinnedMeshRenderer;
var skinMeshRenderer2:SkinnedMeshRenderer;
var skinMeshRenderer3:SkinnedMeshRenderer;
var skinMeshRenderer4:SkinnedMeshRenderer;
var skinMeshRenderer5:SkinnedMeshRenderer;

// GUI skin
var mySkin:GUISkin;

/* These are the blend shape values for ALL the skindMeshRenderers */
// BsValue0's correspond to skinMeshRenderer
var bsValue0:float = 0;
var bsValue0_1:float = 0;
var bsValue0_2:float = 0;
var bsValue0_3:float = 0;
var bsValue0_4:float = 0;
var bsValue0_5:float = 0;
var bsValue0_6:float = 0;

// BsValue1's correspond to skinMeshRenderer2
var bsValue1:float = 0;
var bsValue1_1:float = 0;
var bsValue1_2:float = 0;
var bsValue1_3:float = 0;
var bsValue1_4:float = 0;
var bsValue1_5:float = 0;
var bsValue1_6:float = 0;

// BsValue2's correspond to skinMeshRenderer3
var bsValue2:float = 0;
var bsValue2_1:float = 0;
var bsValue2_2:float = 0;
var bsValue2_3:float = 0;
var bsValue2_4:float = 0;
var bsValue2_5:float = 0;
var bsValue2_6:float = 0;

// BsValue3's correspond to skinMeshRenderer4
var bsValue3:float = 0;
var bsValue3_1:float = 0;
var bsValue3_2:float = 0;
var bsValue3_3:float = 0;
var bsValue3_4:float = 0;
var bsValue3_5:float = 0;
var bsValue3_6:float = 0;

// BsValue4's correspond to skinMeshRenderer5
var bsValue4:float = 0;
var bsValue4_1:float = 0;
var bsValue4_2:float = 0;
var bsValue4_3:float = 0;
var bsValue4_4:float = 0;
var bsValue4_5:float = 0;
var bsValue4_6:float = 0;

// The slider Value used for the vertical slider
var sliderValue:float = 0; 

/* Variables for the slider rect */
private var sliderRectPosX:int = 312;
private var sliderRectPosY:int = 165;
private var sliderRectWidth:int = 250;
private var sliderRectHeight:int = Screen.height - 300;
private var sliderRect:Rect;

// Displays current C value next to vertical slider
private var cString:String; 

// Follows the slider bar
private var cRect:Rect; 

// Rect for changing cursor
var cursorRect:Rect; 

// Mouse variables
var cursorTexture:Texture2D;
var cursorMode = CursorMode.Auto;
var hotSpot = Vector2.zero;

// Blinking timer for the cursor (only visible when first starting program)
var blinkingTimer:float = 0;
var maxTime:float = 2;
var isFlashing:boolean = false;

// Slider bar textures
var sliderNormalTexture:Texture2D;
var sliderStartTexture:Texture2D;

// Increment for slider bar
var increment:float;

// Boolean for what scene it is
var isNormalLevel:boolean = false;
var isMagLevel:boolean = false;

// Stores the integer for the build scene
var normalGameScene:int;
var magGameScene:int;

// Boolean for sound
var isSound:boolean = false;

// Adjusts the slider for the mag scene.
// This is needed because the brain is closer to the camera.
// Number determined by trial and error.
private var adjustSliderForMag:float;

// Slider height
private var sliderHeight:float = 1000.0F;

// Used for the cRect drawn by the slider that displays the current C
private var cFollowsSliderBar:float;

// Adjust slider values are used to control the blend shape value to be from 0-100.
var adjustSlider1:float = 1.11f;
var adjustSlider2:float = 0.435f;
var adjustSlider3:float = 0.74f;



/*
 * Displays the GUI.
 */
function OnGUI() {
	
	// Attach the skin
	GUI.skin = mySkin;

	// Creates the slider for the user to move through the spinal cord
	sliderRect = new Rect(sliderRectPosX, sliderRectPosY, sliderRectWidth, sliderRectHeight);
	sliderValue = GUI.VerticalSlider(sliderRect, sliderValue, 0.0F, sliderHeight);

	/* As one bsValue decreases, the next increases. Each time the sliderbar crosses a numerical checkpoint 
	   that initial value is set to always equal zero under those conditions.  The numerical checkpoint was
       given to me by the biomedical illustrator who hired me.  She based these off of her own calculations
       determined from observing diagrams to determine the percentage of each section of the spinal cord.
       The checkpoint for the first 3 parts is 90, the checkpoint for the next 2 is 230, and the checkpoint
       for the final 2 is 135.  The adjust slider value is used to control the blend shape value to be from
       0-100.
	*/
    // If the slider value is 0 to 90
	if (sliderValue <= 90) {
	
		bsValue0 = ((sliderValue)*adjustSlider1)*adjustSliderForMag;
		bsValue0_1 = 0;
		bsValue0_2 = 0;
		bsValue0_3 = 0;
		bsValue0_4 = 0;
		bsValue0_5 = 0;
		bsValue0_6 = 0;
		
		bsValue1 = ((sliderValue)*adjustSlider1)*adjustSliderForMag;
		bsValue1_1 = 0;
		bsValue1_2 = 0;
		bsValue1_3 = 0;
		bsValue1_4 = 0;
		bsValue1_5 = 0;
		bsValue1_6 = 0;
		
		bsValue2 = ((sliderValue)*adjustSlider1)*adjustSliderForMag;
		bsValue2_1 = 0;
		bsValue2_2 = 0;
		bsValue2_3 = 0;
		bsValue2_4 = 0;
		bsValue2_5 = 0;
		bsValue2_6 = 0;
		
		bsValue3 = ((sliderValue)*adjustSlider1)*adjustSliderForMag;
		bsValue3_1 = 0;
		bsValue3_2 = 0;
		bsValue3_3 = 0;
		bsValue3_4 = 0;
		bsValue3_5 = 0;
		bsValue3_6 = 0;
		
		bsValue4 = ((sliderValue)*adjustSlider1)*adjustSliderForMag;
		bsValue4_1 = 0;
		bsValue4_2 = 0;
		bsValue4_3 = 0;
		bsValue4_4 = 0;
		bsValue4_5 = 0;
		bsValue4_6 = 0;
		
		
		
	}
    // Else if the sldier value is from 91-180
	else if(sliderValue > 90 && sliderValue <= 180)
	{
	    bsValue0 = ((90 - (sliderValue - 90))*adjustSlider1)*adjustSliderForMag;
	    bsValue0_1 = ((sliderValue - 90)*adjustSlider1)*adjustSliderForMag;
		bsValue0_2 = 0;
		bsValue0_3 = 0;
		bsValue0_4 = 0;
		bsValue0_5 = 0;
		bsValue0_6 = 0;
		
		bsValue1 = ((90 - (sliderValue - 90))*adjustSlider1)*adjustSliderForMag;
		bsValue1_1 = ((sliderValue - 90)*adjustSlider1)*adjustSliderForMag;
		bsValue1_2 = 0;
		bsValue1_3 = 0;
		bsValue1_4 = 0;
		bsValue1_5 = 0;
		bsValue1_6 = 0;
		
		bsValue2 = ((90 - (sliderValue - 90))*adjustSlider1)*adjustSliderForMag;
		bsValue2_1 = ((sliderValue - 90)*adjustSlider1)*adjustSliderForMag;
		bsValue2_2 = 0;
		bsValue2_3 = 0;
		bsValue2_4 = 0;
		bsValue2_5 = 0;
		bsValue2_6 = 0;
		
		bsValue3 = ((90 - (sliderValue - 90))*adjustSlider1)*adjustSliderForMag;
		bsValue3_1 = ((sliderValue - 90)*adjustSlider1)*adjustSliderForMag;
		bsValue3_2 = 0;
		bsValue3_3 = 0;
		bsValue3_4 = 0;
		bsValue3_5 = 0;
		bsValue3_6 = 0;
		
		bsValue4 = ((90 - (sliderValue - 90))*adjustSlider1)*adjustSliderForMag;
		bsValue4_1 = ((sliderValue - 90)*adjustSlider1)*adjustSliderForMag;
		bsValue4_2 = 0;
		bsValue4_3 = 0;
		bsValue4_4 = 0;
		bsValue4_5 = 0;
		bsValue4_6 = 0;
		
	    // This is used to make the morphing of grey matter and white matter to look smoother.
        // It looks the two values to bea max of 42.
		if(bsValue2_1 >= 42)
		{
			bsValue2_1 = 42;
		}
		if(bsValue4_1 >= 42)
		{
			bsValue4_1 = 42;
		}
	}
    // Else if the slider value is from 181 to 270
	else if(sliderValue > 180 && sliderValue <= 270)
	{
		bsValue0 = 0;
		bsValue0_1 = ((90 - (sliderValue - 180))*adjustSlider1)*adjustSliderForMag;
		bsValue0_2 = ((sliderValue - 180)*adjustSlider1)*adjustSliderForMag;
		bsValue0_3 = 0;
		bsValue0_4 = 0;
		bsValue0_5 = 0;
		bsValue0_6 = 0;
		
		bsValue1 = 0;
		bsValue1_1 = ((90 - (sliderValue - 180))*adjustSlider1)*adjustSliderForMag;
		bsValue1_2 = ((sliderValue - 180)*adjustSlider1)*adjustSliderForMag;
		bsValue1_3 = 0;
		bsValue1_4 = 0;
		bsValue1_5 = 0;
		bsValue1_6 = 0;
		
		bsValue2 = 0;
		bsValue2_1 = ((90 - (sliderValue - 180))*adjustSlider1)*adjustSliderForMag;
		bsValue2_2 = ((sliderValue - 180)*adjustSlider1)*adjustSliderForMag;
		bsValue2_3 = 0;
		bsValue2_4 = 0;
		bsValue2_5 = 0;
		bsValue2_6 = 0;
		
		bsValue3 = 0;
		bsValue3_1 = ((90 - (sliderValue - 180))*adjustSlider1)*adjustSliderForMag;
		bsValue3_2 = ((sliderValue - 180)*adjustSlider1)*adjustSliderForMag;
		bsValue3_3 = 0;
		bsValue3_4 = 0;
		bsValue3_5 = 0;
		bsValue3_6 = 0;
		
		bsValue4 = 0;
		bsValue4_1 = ((90 - (sliderValue - 180))*adjustSlider1)*adjustSliderForMag;
		bsValue4_2 = ((sliderValue - 180)*adjustSlider1)*adjustSliderForMag;
		bsValue4_3 = 0;
		bsValue4_4 = 0;
		bsValue4_5 = 0;
		bsValue4_6 = 0;
		
	    // This is used to make the morphing of grey matter and white matter to look smoother
        // It locks the two values to be a max of 42.
		if(bsValue2_1 >= 42)
		{
			bsValue2_1 = 42;
		}
		if(bsValue4_1 >= 42)
		{
			bsValue4_1 = 42;
		}
	}
    // Else if the slider value is from 271 to 500
	else if(sliderValue > 270 && sliderValue <= 500)
	{
		bsValue0 = 0;
		bsValue0_1 = 0;
		bsValue0_2 = ((230 - (sliderValue - 270))*adjustSlider2)*adjustSliderForMag;
		bsValue0_3 = ((sliderValue - 270)*adjustSlider2)*adjustSliderForMag;
		bsValue0_4 = 0;
		bsValue0_5 = 0;
		bsValue0_6 = 0;
		
		bsValue1 = 0;
		bsValue1_1 = 0;
		bsValue1_2 = ((230 - (sliderValue - 270))*adjustSlider2)*adjustSliderForMag;
		bsValue1_3 = ((sliderValue - 270)*adjustSlider2)*adjustSliderForMag;
		bsValue1_4 = 0;
		bsValue1_5 = 0;
		bsValue1_6 = 0;
		
		bsValue2 = 0;
		bsValue2_1 = 0;
		bsValue2_2 = ((230 - (sliderValue - 270))*adjustSlider2)*adjustSliderForMag;
		bsValue2_3 = ((sliderValue - 270)*adjustSlider2)*adjustSliderForMag;
		bsValue2_4 = 0;
		bsValue2_5 = 0;
		bsValue2_6 = 0;
		
		bsValue3 = 0;
		bsValue3_1 = 0;
		bsValue3_2 = ((230 - (sliderValue - 270))*adjustSlider2)*adjustSliderForMag;
		bsValue3_3 = ((sliderValue - 270)*adjustSlider2)*adjustSliderForMag;
		bsValue3_4 = 0;
		bsValue3_5 = 0;
		bsValue3_6 = 0;
		
		bsValue4 = 0;
		bsValue4_1 = 0;
		bsValue4_2 = ((230 - (sliderValue - 270))*adjustSlider2)*adjustSliderForMag;
		bsValue4_3 = ((sliderValue - 270)*adjustSlider2)*adjustSliderForMag;
		bsValue4_4 = 0;
		bsValue4_5 = 0;
		bsValue4_6 = 0;
		
	}
    // Else if the slider value is from 501 to 730
	else if(sliderValue > 500 && sliderValue <= 730)
	{
		bsValue0 = 0;
		bsValue0_1 = 0;
		bsValue0_2 = 0;
		bsValue0_3 = ((230 - (sliderValue - 500))*adjustSlider2)*adjustSliderForMag;
		bsValue0_4 = ((sliderValue - 500)*adjustSlider2)*adjustSliderForMag;
		bsValue0_5 = 0;
		bsValue0_6 = 0;
		
		bsValue1 = 0;
		bsValue1_1 = 0;
		bsValue1_2 = 0;
		bsValue1_3 = ((230 - (sliderValue - 500))*adjustSlider2)*adjustSliderForMag;
		bsValue1_4 = ((sliderValue - 500)*adjustSlider2)*adjustSliderForMag;
		bsValue1_5 = 0;
		bsValue1_6 = 0;
		
		bsValue2 = 0;
		bsValue2_1 = 0;
		bsValue2_2 = 0;
		bsValue2_3 = ((230 - (sliderValue - 500))*adjustSlider2)*adjustSliderForMag;
		bsValue2_4 = ((sliderValue - 500)*adjustSlider2)*adjustSliderForMag;
		bsValue2_5 = 0;
		bsValue2_6 = 0;
		
		bsValue3 = 0;
		bsValue3_1 = 0;
		bsValue3_2 = 0;
		bsValue3_3 = ((230 - (sliderValue - 500))*adjustSlider2)*adjustSliderForMag;
		bsValue3_4 = ((sliderValue - 500)*adjustSlider2)*adjustSliderForMag;
		bsValue3_5 = 0;
		bsValue3_6 = 0;
		
		bsValue4 = 0;
		bsValue4_1 = 0;
		bsValue4_2 = 0;
		bsValue4_3 = ((230 - (sliderValue - 500))*adjustSlider2)*adjustSliderForMag;
		bsValue4_4 = ((sliderValue - 500)*adjustSlider2)*adjustSliderForMag;
		bsValue4_5 = 0;
		bsValue4_6 = 0;
	}
    // Else if the slider value is from 731 to 865
	else if(sliderValue > 730 && sliderValue <= 865)
	{
		bsValue0 = 0;
		bsValue0_1 = 0;
		bsValue0_2 = 0;
		bsValue0_3 = 0;
		bsValue0_4 = ((135 - (sliderValue - 730))*adjustSlider3)*adjustSliderForMag;
		bsValue0_5 = ((sliderValue - 730)*adjustSlider3)*adjustSliderForMag;
		bsValue0_6 = 0;
		
		bsValue1 = 0;
		bsValue1_1 = 0;
		bsValue1_2 = 0;
		bsValue1_3 = 0;
		bsValue1_4 = ((135 - (sliderValue - 730))*adjustSlider3)*adjustSliderForMag;
		bsValue1_5 = ((sliderValue - 730)*adjustSlider3)*adjustSliderForMag;
		bsValue1_6 = 0;
		
		bsValue2 = 0;
		bsValue2_1 = 0;
		bsValue2_2 = 0;
		bsValue2_3 = 0;
		bsValue2_4 = ((135 - (sliderValue - 730))*adjustSlider3)*adjustSliderForMag;
		bsValue2_5 = ((sliderValue - 730)*adjustSlider3)*adjustSliderForMag;
		bsValue2_6 = 0;
		
		bsValue3 = 0;
		bsValue3_1 = 0;
		bsValue3_2 = 0;
		bsValue3_3 = 0;
		bsValue3_4 = ((135 - (sliderValue - 730))*adjustSlider3)*adjustSliderForMag;
		bsValue3_5 = ((sliderValue - 730)*adjustSlider3)*adjustSliderForMag;
		bsValue3_6 = 0;
		
		bsValue4 = 0;
		bsValue4_1 = 0;
		bsValue4_2 = 0;
		bsValue4_3 = 0;
		bsValue4_4 = ((135 - (sliderValue - 730))*adjustSlider3)*adjustSliderForMag;
		bsValue4_5 = ((sliderValue - 730)*adjustSlider3)*adjustSliderForMag;
		bsValue4_6 = 0;
	}
    // Else if the slider value is from 866 to 1000
	else if(sliderValue > 865 && sliderValue <= 1000)
	{
		bsValue0 = 0;
		bsValue0_1 = 0;
		bsValue0_2 = 0;
		bsValue0_3 = 0;
		bsValue0_4 = 0;
		bsValue0_5 = ((135 - (sliderValue - 865))*adjustSlider3)*adjustSliderForMag;
		bsValue0_6 = ((sliderValue - 865)*adjustSlider3)*adjustSliderForMag;
		
		bsValue1 = 0;
		bsValue1_1 = 0;
		bsValue1_2 = 0;
		bsValue1_3 = 0;
		bsValue1_4 = 0;
		bsValue1_5 = ((135 - (sliderValue - 865))*adjustSlider3)*adjustSliderForMag;
		bsValue1_6 = ((sliderValue - 865)*adjustSlider3)*adjustSliderForMag;
		
		bsValue2 = 0;
		bsValue2_1 = 0;
		bsValue2_2 = 0;
		bsValue2_3 = 0;
		bsValue2_4 = 0;
		bsValue2_5 = ((135 - (sliderValue - 865))*adjustSlider3)*adjustSliderForMag;
		bsValue2_6 = ((sliderValue - 865)*adjustSlider3)*adjustSliderForMag;
		
		bsValue3 = 0;
		bsValue3_1 = 0;
		bsValue3_2 = 0;
		bsValue3_3 = 0;
		bsValue3_4 = 0;
		bsValue3_5 = ((135 - (sliderValue - 865))*adjustSlider3)*adjustSliderForMag;
		bsValue3_6 = ((sliderValue - 865)*adjustSlider3)*adjustSliderForMag;
		
		bsValue4 = 0;
		bsValue4_1 = 0;
		bsValue4_2 = 0;
		bsValue4_3 = 0;
		bsValue4_4 = 0;
		bsValue4_5 = ((135 - (sliderValue - 865))*adjustSlider3)*adjustSliderForMag;
		bsValue4_6 = ((sliderValue - 865)*adjustSlider3)*adjustSliderForMag;
	}
	
	
	
	// Call the function
	DrawTheCNextToTheSliderBar();
	
    // Set the cursor rect
	cursorRect = new Rect(sliderRectPosX ,sliderRectPosY + (sliderValue*0.28), 150, 50);

}


/*
 * Update sets all the blend shape weights.
 */
function Update () {

	skinMeshRenderer.SetBlendShapeWeight(0, bsValue0);
	skinMeshRenderer.SetBlendShapeWeight(1, bsValue0_1);
	skinMeshRenderer.SetBlendShapeWeight(2, bsValue0_2);
	skinMeshRenderer.SetBlendShapeWeight(3, bsValue0_3);
	skinMeshRenderer.SetBlendShapeWeight(4, bsValue0_4);
	skinMeshRenderer.SetBlendShapeWeight(5, bsValue0_5);
	skinMeshRenderer.SetBlendShapeWeight(6, bsValue0_6);

	skinMeshRenderer2.SetBlendShapeWeight(0, bsValue1);
	skinMeshRenderer2.SetBlendShapeWeight(1, bsValue1_1);
	skinMeshRenderer2.SetBlendShapeWeight(2, bsValue1_2);
	skinMeshRenderer2.SetBlendShapeWeight(3, bsValue1_3);
	skinMeshRenderer2.SetBlendShapeWeight(4, bsValue1_4);
	skinMeshRenderer2.SetBlendShapeWeight(5, bsValue1_5);
	skinMeshRenderer2.SetBlendShapeWeight(6, bsValue1_6);

	skinMeshRenderer3.SetBlendShapeWeight(0, bsValue2);
	skinMeshRenderer3.SetBlendShapeWeight(1, bsValue2_1);
	skinMeshRenderer3.SetBlendShapeWeight(2, bsValue2_2);
	skinMeshRenderer3.SetBlendShapeWeight(3, bsValue2_3);
	skinMeshRenderer3.SetBlendShapeWeight(4, bsValue2_4);
	skinMeshRenderer3.SetBlendShapeWeight(5, bsValue2_5);
	skinMeshRenderer3.SetBlendShapeWeight(6, bsValue2_6);

	skinMeshRenderer4.SetBlendShapeWeight(0, bsValue3);
	skinMeshRenderer4.SetBlendShapeWeight(1, bsValue3_1);
	skinMeshRenderer4.SetBlendShapeWeight(2, bsValue3_2);
	skinMeshRenderer4.SetBlendShapeWeight(3, bsValue3_3);
	skinMeshRenderer4.SetBlendShapeWeight(4, bsValue3_4);
	skinMeshRenderer4.SetBlendShapeWeight(5, bsValue3_5);
	skinMeshRenderer4.SetBlendShapeWeight(6, bsValue3_6);

	skinMeshRenderer5.SetBlendShapeWeight(0, bsValue4);
	skinMeshRenderer5.SetBlendShapeWeight(1, bsValue4_1);
	skinMeshRenderer5.SetBlendShapeWeight(2, bsValue4_2);
	skinMeshRenderer5.SetBlendShapeWeight(3, bsValue4_3);
	skinMeshRenderer5.SetBlendShapeWeight(4, bsValue4_4);
	skinMeshRenderer5.SetBlendShapeWeight(5, bsValue4_5);
	skinMeshRenderer5.SetBlendShapeWeight(6, bsValue4_6);

	
    // If it is not flashing
    // Flashing occurs once scene has been loaded and goes away after slider has been clicked
	if(!isFlashing)
	{
        // If blinking timer is greater than max time
		if(blinkingTimer > maxTime)
		{
            // Set the slider texture to normal
		    mySkin.verticalSliderThumb.normal.background = sliderNormalTexture;

            // Set the increment
			increment = -0.1;
		}
        // Else if blinking timer is less than or equal to 0
		else if(blinkingTimer <= 0)
		{
			// Set the slider texture to start
		    mySkin.verticalSliderThumb.normal.background = sliderStartTexture;

            // Set the increment
		    increment = 0.1;
		}
		
        // Add the increment
		blinkingTimer = blinkingTimer + increment;
	}
	else
	{	
		mySkin.verticalSliderThumb.normal.background = sliderNormalTexture;
	}
	
	
    // If the level is the normal game
	if(Application.loadedLevel == normalGameScene)
	{
        // These variables are for the normal game scene
		sliderRectPosY = 165;
		isNormalLevel = true;
		adjustSliderForMag = 1;
		sliderHeight = 1000.0F;
		sliderRectHeight = Screen.height - 300;
		cFollowsSliderBar = 0.28;
	}
    // Else if the level is the mag scene
	else if(Application.loadedLevel == magGameScene)
	{
        // The game objects are magnified therefore the variables are different than normal game
		sliderRectPosY = 299;
		isMagLevel = true;
		adjustSliderForMag = 0.5698924731;
		sliderRectHeight = (Screen.height - 300)/2;
		sliderHeight = 500.0F;
		cFollowsSliderBar = 0.256;
	}
	
	// If the sound is set off
	if(isSound)
	{
        // Play the sound
	    GetComponent.<AudioSource>().PlayOneShot(GetComponent.<AudioSource>().clip, 0.12F);

        // Set boolean to false
		isSound = false;
	}
	
}



/*
 * Function that determines which C the sliderbar is currently on.
 * Values were determined by trial and error of playing the game.
 * cString is the string that is displayed in the C rect.
 */
function DrawTheCNextToTheSliderBar() {

    // If level is normal
	if(isNormalLevel)
	{
		if(sliderValue > -1 && sliderValue <= 28)
		{
			cString = "c2";
		}
		else if(sliderValue > 28 && sliderValue <= 72)
		{
			cString = "c3";
		}
		else if(sliderValue > 72 && sliderValue <= 123)
		{
			cString = "c4";
		}
		else if(sliderValue > 123 && sliderValue <= 162)
		{
			cString = "c5";
		}
		else if(sliderValue > 162 && sliderValue <= 194)
		{
			cString = "c6";
		}
		else if(sliderValue > 194 && sliderValue <= 240)
		{
			cString = "c7";
		}
		else if(sliderValue > 240 && sliderValue <= 276)
		{
			cString = "c8";
		}
		else if(sliderValue > 276)
		{
			// Draw nothing if it is out of our range of C values
			cString = " ";
		}
	}
	
    // If level is mag
	if(isMagLevel)
	{
		if(sliderValue > -1 && sliderValue <= 68)
		{
			cString = "c2";
		}
		else if(sliderValue > 68 && sliderValue <= 151)
		{
			cString = "c3";
		}
		else if(sliderValue > 151 && sliderValue <= 233)
		{
			cString = "c4";
		}
		else if(sliderValue > 233 && sliderValue <= 299)
		{
			cString = "c5";
		}
		else if(sliderValue > 299 && sliderValue <= 352)
		{
			cString = "c6";
		}
		else if(sliderValue > 352 && sliderValue <= 410)
		{
			cString = "c7";
		}
		else if(sliderValue > 410 && sliderValue <= 467)
		{
			cString = "c8";
		}
		else if(sliderValue > 467)
		{
			// Draw nothing if it is out of our range of C values
			cString = " ";
		}
	}
	
	
	
	// Draw the label next to the slider bar
	cRect = new Rect(sliderRectPosX - 15,sliderRectPosY + (sliderValue*cFollowsSliderBar),50,50);
	GUI.Label(cRect, cString);
}



/*
 * Debug function that draws the blend shape values and slider values to the screen
 */
function DebugForBlendShapeValues() {

	
	// Draws blend shape value
	GUI.color = Color.black;
	GUI.Label(new Rect(0, 0, 300, 20), "ALS003: " + skinMeshRenderer3.GetBlendShapeWeight(0).ToString());
	GUI.Label(new Rect(0, 10, 300, 20), "ALS007: " + skinMeshRenderer3.GetBlendShapeWeight(1).ToString());
	GUI.Label(new Rect(0, 20, 300, 20), "ALS008: " + skinMeshRenderer3.GetBlendShapeWeight(2).ToString());
	GUI.Label(new Rect(0, 30, 300, 20), "ALS009: " + skinMeshRenderer3.GetBlendShapeWeight(3).ToString());
	GUI.Label(new Rect(0, 40, 300, 20), "ALS010: " + skinMeshRenderer3.GetBlendShapeWeight(4).ToString());
	GUI.Label(new Rect(0, 50, 300, 20), "ALS011: " + skinMeshRenderer3.GetBlendShapeWeight(5).ToString());
	GUI.Label(new Rect(0, 60, 300, 20), "ALS t011: " + skinMeshRenderer3.GetBlendShapeWeight(6).ToString());
	
	
	// Draws slider value
	GUI.Label(new Rect(0,100,60,50), sliderValue.ToString());
	
	
}

