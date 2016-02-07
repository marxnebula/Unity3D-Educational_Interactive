#pragma strict


/* ~~~~~~~~Class Info~~~~~~~~
    - Highlightable cross sectional brain parts include Anterior white commissure,
      Anterolateral system, Lissauer's tract, White matter, Gray matter, and
      Dorsal Root.
	- When the cross sectional brain is being highlighted then it lerps in color.
    - Also when cross sectional brain is clicked then it lerps in different color.
    - When clicked the cross sectional brain part name is displayed.  If you highlight
      the name then it displays the description.

    --
    ~ Code by Jordan Marx ~ (2015)
*/


// Rect to draw the label
var labelRect:Rect;

// Rect to draw the description box
private var descripRect:Rect;

// Used to change world position to screen position
private var screenPos:Vector3;

// Name of the label
var label:String; 

// Position of the label
var target:Transform;  

// Width of Rect
var labelWidth:int;

// Height of Rect
var labelHeight:int; 

// Offset of label rect in x position
var offsetLabelX:int;

// Offset of label rect in y position
var offsetLabelY:int;

// GUI style
var descripStyle:GUIStyle;

// GUI skin
var mySkin:GUISkin;

// Description of the label
var description:String;

// Width of descripRect
var descripWidth:int;

// Height of descripRect
var descripHeight:int;

// Offset of descrip rect in x position
var offsetDescripX:int;

// Offset of descrip rect in y position
var offsetDescripY:int;

// Horizontal margin
var marginX:int;

// Vertical margin
var marginY:int;

// Raycast
var hit:RaycastHit;

// Mesh collider
var meshCol:MeshCollider;

// The sphere collider
var normalCollider:SphereCollider;

// Boolean for if clicked on label
var isClicked:boolean = false;

// Booleans for what type of the brain has been clicked
var isAWC:boolean = false;
var isALS:boolean = false;
var isLissauer:boolean = false;
var isWhiteMatter:boolean = false;
var isGrayMatter:boolean = false;
var isDorsalRoot:boolean = false;

// Boolean for if highlighted
var isHighlighted:boolean = false;

// Box rect
private var boxRect:Rect;

// Gameobjects of all the different brain parts
var gmTarget:GameObject;
var wmTarget:GameObject;
var aslTarget:GameObject;
var acTarget:GameObject;
var lisTarget:GameObject;
var dorsalTarget:GameObject;

// Booleans to store if the brain gameobjects are being highlighted
var h1:boolean = false;
var h2:boolean = false;
var h3:boolean = false;
var h4:boolean = false;
var h5:boolean = false;


function Update () {
	// Change the position of the target into screen position
	screenPos = Camera.main.WorldToScreenPoint (target.position);
	
	
	// If you have left clicked on mouse
	if (Input.GetMouseButtonDown(0))
	{
		var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		
		if (Physics.Raycast(ray, hit))
		{
			// If you hit the mesh collider or sphere collider
			if(hit.collider == meshCol || hit.collider == normalCollider)
			{
				// Change isClicked to opposite
				isClicked = !isClicked;
			}
		}
	}
	
	// If AWC part of the brain
	if(isAWC)
	{
        // Determine if targets are being highlighted and store them
		h1 = gmTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h2 = wmTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h3 = aslTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h4 = dorsalTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h5 = lisTarget.GetComponent.<LabelAndDescription>().isHighlighted;
	}
    // If ALS part of the brain
	else if(isALS)
	{
	    // Determine if targets are being highlighted and store them
		h1 = gmTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h2 = wmTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h3 = acTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h4 = dorsalTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h5 = lisTarget.GetComponent.<LabelAndDescription>().isHighlighted;
	}
    // If Lissauer part of the brain
	else if(isLissauer)
	{
	    // Determine if targets are being highlighted and store them
		h1 = gmTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h2 = wmTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h3 = aslTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h4 = dorsalTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h5 = acTarget.GetComponent.<LabelAndDescription>().isHighlighted;
	}
    // If white matter part of the brain
	else if(isWhiteMatter)
	{
	    // Determine if targets are being highlighted and store them
		h1 = gmTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h2 = acTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h3 = aslTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h4 = dorsalTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h5 = lisTarget.GetComponent.<LabelAndDescription>().isHighlighted;
	}
    // If gray matter part of the brain
	else if(isGrayMatter)
	{
	    // Determine if targets are being highlighted and store them
		h1 = acTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h2 = wmTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h3 = aslTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h4 = dorsalTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h5 = lisTarget.GetComponent.<LabelAndDescription>().isHighlighted;
	}
    // If it is the dorsal root
	else if(isDorsalRoot)
	{
	    // Determine if targets are being highlighted and store them
		h1 = gmTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h2 = wmTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h3 = aslTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h4 = acTarget.GetComponent.<LabelAndDescription>().isHighlighted;
		h5 = lisTarget.GetComponent.<LabelAndDescription>().isHighlighted;
	}
	
}

/*
 * Display the labels and their descriptions.
 */
function OnGUI()
{
    // Set the skin
    GUI.skin = mySkin;

    // If the mouse is on the label or the description set the color to white. Else set to black
	if((labelRect.Contains(Event.current.mousePosition) || descripRect.Contains(Event.current.mousePosition))
	&& isHighlighted)
	{
		GUI.color = Color.white;
	}
	else
	{
		GUI.color = Color.black;
	}
	
	
	// If clicked
	if(isClicked)
	{
        // Make the rect for the label
		labelRect = new Rect(screenPos.x - (labelWidth/2) + offsetLabelX, Screen.height - screenPos.y + offsetLabelY,
	    labelWidth, labelHeight);
	}
	else
	{
        // Set the rect to nothing
		labelRect = new Rect(0,0,0,0);
	}
	
	
	// If AWC part of the brain
	if(isAWC)
	{
		GUI.Label(labelRect, "<b>Anterior white commissure</b>");
	}

    // If ALS pat of the brain
	if(isALS)
	{
		GUI.Label(labelRect, "<b>Anterolateral system</b>");
	}

    // If Lissauer part of the brain
	if(isLissauer)
	{
		GUI.Label(labelRect, "<b>Lissauer's tract</b>");
	}

    // If white matter part of the brain
	if(isWhiteMatter)
	{
		GUI.Label(labelRect, "<b>White matter</b>");
	}

    // If gray matter part of the brain
	if(isGrayMatter)
	{
		GUI.Label(labelRect, "<b>Gray matter</b>");
	}

    // If dorsal root
	if(isDorsalRoot)
	{
		GUI.Label(labelRect, "<b>Dorsal root</b>");
	}
	
	
	// If mouse is over the labels rect or descrip rect then draw the description box
	if((labelRect.Contains(Event.current.mousePosition) || descripRect.Contains(Event.current.mousePosition)))
	{	
		
        // If the brain game objects arent highlighted
		if((!h1 && !h2 && !h3 && !h4 && !h5))
		{
		
        // Set boolean to true
		isHighlighted = true;
		
        // Set the descrip rect
		descripRect = new Rect(screenPos.x + offsetDescripX + marginX, Screen.height - screenPos.y + offsetDescripY + marginY, 
		 descripWidth, descripHeight);
		 
        // Set the box rect
		boxRect = new Rect(screenPos.x + offsetDescripX, Screen.height - screenPos.y + offsetDescripY, 
		 descripWidth, descripHeight);
		 GUI.Box(boxRect," ");
	
        // If AWC part of the brain
		if(isAWC)
		{
			GUI.Box(descripRect, "Within the spinal cord and anterior to the gray \n"
			+ "commissure, this white matter bundle is whe- \n"
			+ "re signals from the pathway cross the midline \n"
			+ "of the spinal cord. \n \n"
			+ "It carries C and A-delta nerve fibers.", descripStyle);
		}

        // If ALS part of the brain
		if(isALS)
		{
			GUI.Box(descripRect, "The neural pathway that conveys pain and \n"
			+ "temperature information to the brain.", descripStyle);
		}

        // If Lissauer part of the brain
		if(isLissauer)
		{
			GUI.Box(descripRect, "Bilaterally positioned in the dorsolateral part of \n"
			+ "the spinal cord, this tract carries axons convey- \n"
			+ "ing pain and temperature information up or down \n"
			+ "about two spinal segments before penetrating \n"
			+ "the dorsal horn.", descripStyle);
		}

        // If white matter part of the brain
		if(isWhiteMatter)
		{
			GUI.Box(descripRect, "Named for its coloration due to high myelin content, \n"
			+ "it indicates axon tracts and commissures.", descripStyle);
		}

        // If gray matter part of the brain
		if (isGrayMatter)
		{
			GUI.Box(descripRect, "An accumulation of cell bodies in the central \n"
			+ "nervous system.", descripStyle);
		}

        // If dorsal root
		if(isDorsalRoot)
		{
			GUI.Box(descripRect, " Axons that bring sensory information from the \n "
			+ "dorsal root ganglion to the dorsal horn.", descripStyle);
		}
		}
	}
	else
	{
		// We only want the descripRect to show up when we highlight the labelRect
		descripRect = new Rect(0,0,0,0);
		
        // Set boolean to false
		isHighlighted = false;
	
	}
}
