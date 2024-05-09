import * as React from "react";
import { BadgeStyle } from "./style";

const BadgeComponent = ({ number = 0 }) => <BadgeStyle>{number}</BadgeStyle>;

export default BadgeComponent;
