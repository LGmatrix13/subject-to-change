import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { FALL, SPRING } from "../utils/constants";
import containerBackground from "/containerBackground.png";
import BaseLayout from "./BaseLayout";
import { useSearchParams } from "react-router-dom";

interface SearchLayoutProps {
  children: React.ReactElement;
}

export default function SearchLayout(props: SearchLayoutProps) {
  return <BaseLayout title="Search">{props.children}</BaseLayout>;
}
