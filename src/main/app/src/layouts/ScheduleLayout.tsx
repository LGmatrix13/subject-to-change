import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { FALL, SPRING } from "../utils/constants";
import containerBackground from "/containerBackground.png";
import BaseLayout from "./BaseLayout";

interface ScheduleLayoutProps {
  children: React.ReactElement;
}

export default function ScheduleLayout(props: ScheduleLayoutProps) {
  return <BaseLayout title="Schedule">{props.children}</BaseLayout>;
}
