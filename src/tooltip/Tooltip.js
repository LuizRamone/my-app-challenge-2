import styled from "styled-components";
import React, { useState, useRef } from "react";
import Portal from "./Portal";

const StyledTooltip = styled.span.attrs((p) => ({
  //optional props
  background: p.background || "black",
  color: p.color || "white",
  delay: p.delay || 0.02,
}))`
  position: fixed;
  //setting the y position dinamically for the top prop
  top: ${(p) => p.posRef.current.y}px;
  //setting the x position dinamically for the left prop
  left: ${(p) => p.posRef.current.x}px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.02em;
  //setting the background color of the tooltip and the text color dinamically
  background-color: ${(p) => p.background};
  color: ${(p) => p.color};
  pointer-events: none;
  padding: 7px 10px;
  border-radius: 4px;
  z-index: 99999;
  display: inline-block;
  white-space: nowrap;
  //change the opacity of the tooltip depending on the state of the show variable
  opacity: ${(p) => p.show};

  transition-property: transform, opacity !important;
  transition-duration: 0.06s !important;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1) !important;
  //change delay prop defined by the user else delay default is 0.02s
  transition-delay: ${(p) => (p.show ? p.delay : 0.02)}s !important;
  //control the origin of the transformation with the user provided placement to be the oposite position,   
  transform-origin: ${(p) => position(p.placment).negate()};
  //scale to have a "zoom effect" when the tooltip show
  transform: scale(${(p) => (p.show ? 1 : 0.7)});
`;

const position = (p) => ({
  //property of the current position
  current: p,
  /* negate function is to get the oposite value of the position passed on the parameter and revert its position,
   we need this because if the tooltip has exceeded the boundaries defined we need to flip to the other side accordingly top<->bottom, left<->right */
  negate() {
    if (this.current === "left") return "right";
    if (this.current === "right") return "left";
    if (this.current === "top") return "bottom";
    if (this.current === "bottom") return "top";
  },
  /* functions to help clean the code and know if the element is positioned horizontally or vertically*/
  isHorizontal() {
    return this.current === "left" || this.current === "right";
  },
  isVertical() {
    return this.current === "top" || this.current === "bottom";
  },
});

const point = () => ({
  x: null,
  y: null,
  //function to reset the current x and y position
  reset(p) {
    this.x = p.x;
    this.y = p.y;
  },
  restrictRect(rect) {
  /*function to restrict the element position to the boundary of the rectangle element, in case when we dont have any space on neither way to flip left<->right,
    top<->bottom then we set the tooltip position to be inside the rectangle element boundary*/
    if (this.x < rect.left) this.x = rect.left;
    else if (this.x > rect.right) this.x = rect.right;
    if (this.y < rect.top) this.y = rect.top;
    else if (this.y > rect.bottom) this.y = rect.bottom;
  },
});
//function to calculate the x and y in relation with the placement defined by the user
const getPoint = (element, tooltip, placement, space) => {
  let recurCount = 0;
  const pt = point();
  /* this variable set the boundaries of the screen to the tooltip element stay on the screen
  for the left and top position we only need to set the space defined by the user,
  the document.body.clientWidth is needed to restrict the space in case of the page have scrollbar, 
  the right is equal to the client window width minus the tooltip clientWidth (inner width of the element in pixels) width addeed the space,
  the bottom position we only need to get the innerheigh of the window minus the height of the tooltip added the space defined by the user */
  const boundaries = {
    left: space,
    top: space,
    right: document.body.clientWidth - (tooltip.clientWidth + space),
    bottom: window.innerHeight - (tooltip.clientHeight + space),
  };
  //javascript function to return the size of the element and your relative position to the viewport (top left right and bottom) to be a placement reference for the tooltip
  const rectangle = element.getBoundingClientRect();

  return (function recursive(placement) {
    recurCount++;
    const pos = position(placement);
    switch (pos.current) {
      case "left":
        /*to set the element postion (x) to the left first get the left reference of the rectangle variable minus the width of the tooltip
        which gets the element to be placed at the side of the retangle reference and adding the space defined by the user,
        for the (y) position get the placemente of the top reference of the rectangle then substract the difference of the heigh of the retangle
        and the tooltip and divide by 2 to center the element  */
        pt.x = rectangle.left - (tooltip.offsetWidth + space);
        pt.y =
          rectangle.top + (element.offsetHeight - tooltip.offsetHeight) / 2;
        break;
      case "right":
        /*for the right position the (x) only the rectangle reference right plus the space defined by the user
        and the (y) is the same logic as the left position */
        pt.x = rectangle.right + space;
        pt.y =
          rectangle.top + (element.offsetHeight - tooltip.offsetHeight) / 2;
        break;
      case "top":
        /*to get the top position the (x) value get the rectangle left position refence plus the difference between
        the rectangle width minus the tooltip width and divide for 2 to center the position, and for the (y) position
        get the top reference and substract the width of the tooltip plus the space defined by the user*/
        pt.x = rectangle.left + (element.offsetWidth - tooltip.offsetWidth) / 2;
        pt.y = rectangle.top - (tooltip.offsetHeight + space);
        break;
      //default place element to bottom
      default:
        /*to get the x value substract the width of the reference element that is defined by variable rectangle minus the width 
      of the tooltip divided by 2 which give us the exact value that we need to center the tooltip*/
        pt.x = rectangle.left + (element.offsetWidth - tooltip.offsetWidth) / 2;
        //to get the y value just use the retangle bottom reference and add the space defined by the user
        pt.y = rectangle.bottom + space;
    }
    /*this if above is needed in case of the elemente cant flip neither side for example there in a button where there is
no space to the tooltip on the top or bottom to show the tooltip, so the recursive function will forever iterate
and throw an maximum call stack size exceeded, so we limit the recursive iteration to 2 iterations(maximum needed for the recursive to flip the position)
and if exceed these 2 iterations we return the current position without flipping */
    if (recurCount < 3)
      if (
        /*check the current position, in case of horizontal and the x is lesser than the bounderies defined 
        (element getting out of the screen on the left) or the x position is greater than the right boundary also getting out of the screen
        then we need to reset the position negating it to the other side left<->right and top<->bottom  */
        (pos.isHorizontal() &&
          (pt.x < boundaries.left || pt.x > boundaries.right)) || //the OR condition to set differentiate accordingly if the posistion will flip left<->right or top-bottom
        (pos.isVertical() &&
          (pt.y < boundaries.top || pt.y > boundaries.bottom))
      ) {
        //if the conditions match for the flip it will enter the recursive function and than call the negate to change the side and then call recursive again with the new position flipped
        pt.reset(recursive(pos.negate()));
      }

  
    pt.restrictRect(boundaries);
    //if there is space on the screen for the tooltip to show, then we dont need to flip the side, so it will stay in the default position
    return pt;
  })(placement);
};

function Tooltip({
  text,
  placement = "bottom",
  space = 35,
  children,
  disabled = 0,
  delay,
  background,
  color,
  element,
  trigger,
  extraContent,
  clickTooltip,
}) {
  const [show, setShow] = useState(0);
  /*set the initial state of the elements x and y to 0 and manipulate their value based on the handleMouseOver event and set the top(y)
  and left in this case but could be right to represent the (x) forming the cartesian plane of the tooltip element position, i used useRef hook
  over normal const to each time the page re-renders the object will not be rebuilt again */
  const posRef = useRef({ x: 0, y: 0 });
  const tooltipRef = useRef();
  //function passing event to get the child element reference by the currentTarget
  const handleMouseOver = (e) => {
    if (!clickTooltip) setShow(1);
    /*this function gets the current point of the x and y property and return this value to the posRef.current
      the getPoint needs the children element reference (e.currentTarget) and the reference of the tooltip(tooltipRef.current)
      and then the placement defined by the use to determine the position of the tooltip and the last parameter create a space
      between the tooltip and the element */
    posRef.current = getPoint(
      e.currentTarget,
      tooltipRef.current,
      placement,
      space
    );
  };
  const handleMouseOut = () => {
    if (!clickTooltip) setShow(0);
  };

  const handleClick = (e) => {
    posRef.current = getPoint(
      e.currentTarget,
      tooltipRef.current,
      placement,
      space
    );
    show ? setShow(0) : setShow(1);
  };

  return (
    /*so here we specify the children parameter which is an element (any element that we want to show the tooltip
    then added the React.cloneElement to be able to add props to an element by cloning it, the cloned element will be identical to the original 
    but with three new functions onMouseOver, onMouseOut, onClick
      */

    <>
      {disabled //if the prop disable condition exists then there is no need to clone the element
        ? children
        : React.cloneElement(children, {
            onMouseOver: handleMouseOver,
            onMouseOut: handleMouseOut,
            onClick: handleClick,
          })}
      {disabled || (
        //i have added a react dom portal to place a react component anywhere in the dom document
        <Portal>
          <StyledTooltip
            delay={delay}
            background={background}
            color={color}
            ref={tooltipRef}
            posRef={posRef}
            show={show}
          >
            {text}
            <p>
              Hovering at element: <strong>{element}</strong>{" "}
            </p>
            <p>
              This element was triggered by <strong>{trigger} </strong>
            </p>
            {extraContent && (
              <>
                <p>Loaded some extra content</p>
                <ul>
                  <li>You have choosen right!</li>
                </ul>
              </>
            )}
          </StyledTooltip>
        </Portal>
      )}
    </>
  );
}

export default Tooltip;
