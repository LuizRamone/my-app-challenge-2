# Yarn
I had some trouble with eslint version and i needed in order to install the dependencies with yarn add the flag (yarn install --ignore-engines) to stop the version conflict issue
 
 # Usage of the Tooltips parameters
  Properties:
  
  * text (String to show inside the tooltip)
  * placement = "bottom", ( String to  set the position which the tooltip will be placed, top,bottom,left,right)
  * space = 35, (Number to create a space between the tooltip and the child element that will be added it)
  * children, (children component)
  * disabled = 0, (Boolean to disable and not show the tooltip *necessary in case of click event*)
  * delay, (Float to delay the animation to show the tooltip)
  * background, (String to change the color of the tooltip background)
  * color, (String to change the color of the tooltip text)
  * element, (String to track what element the tooltip is beign called)
  * trigger, (String to set the event which triggered the tooltip example: hover/click events)
  * extraContent, (String to add more text to the tooltip)
  * clickTooltip, (Boolean to change the tooltip trigger to be a clickable and not a hovering event *must have the disabled property set to true in order to work   properly*)


examples of used tooltips:
        <Tooltip
          clickTooltip={true}
          element="Button"
          text="You clicked on the button!"
          click="true"
          placement="left"
          color="blue"
          background="black"
          trigger="Click"
        >
          <Button>Click Me</Button>
        </Tooltip>
        
        
        
        <Tooltip
          clickTooltip={false}
          element="Input"
          text="tooltip 1"
          placement="top"
          color="white"
          background="red"
          trigger="Hover"
        >
          <Input placeholder="type your name" />
        </Tooltip>
        
        
        

