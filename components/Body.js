import React from "react";
import TopImage from "./TopImage";
import Intro from "./Intro";
import Accordion from "./Accordion";
import Outro from "./Outro";
import Sign from "./Sign";

class Body extends React.Component {
  render() {
    return (
      <div>
        <TopImage></TopImage>
        <Intro></Intro>
        <Accordion></Accordion>
        <Outro></Outro>
        <Sign></Sign>
      </div>
    );
  }
}

export default Body;
