import React from "react";
import Tooltip from "../src/tooltip/Tooltip";
import { Input, Div, Button, H1, Select } from "./styled";
import { FaBeer } from "react-icons/fa";

export default function App() {
  return (
    <>
      <H1>Hover or Click the elements to see the tooltip.</H1>
      <Div>
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
      </Div>
      <Div>
        <Tooltip
          clickTooltip={false}
          element="Input"
          text="tooltip 2"
          placement="right"
          color="white"
          background="purple"
          trigger="Hover"
        >
          <Input placeholder="type your profession" />
        </Tooltip>
      </Div>

      <Div>
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
      </Div>
      <Div>
        <Tooltip
          clickTooltip={false}
          element="Dropdown"
          text="Choose your champion above"
          extraContent="true"
          color="white"
          background="black"
          position="top"
          trigger="Hover"
        >
          <Select name="cars" id="cars">
            <option value="volvo">Batman</option>
            <option value="saab">Superman</option>
            <option value="mercedes">Iron Man</option>
            <option value="audi">Star-Lord</option>
          </Select>
        </Tooltip>
      </Div>
      <Div>
        <Tooltip
          clickTooltip={false}
          element="Dropdown"
          text="Cold Beer"
          color="white"
          background="gold"
          placement="top"
          trigger="Hover"
        >
          <Div>
       
            Lets go for a <FaBeer />
          </Div>
        </Tooltip>
      </Div>
    </>
  );
}
