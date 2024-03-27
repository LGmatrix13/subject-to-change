import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { FALL, SPRING } from "../utils/constants";
import containerBackground from "/containerBackground.png";
import BaseLayout from "./BaseLayout";

interface SearchLayoutProps {
  children: React.ReactElement;
}

export default function SearchLayout(props: SearchLayoutProps) {
  return <BaseLayout title="Search">{props.children}</BaseLayout>;
}
