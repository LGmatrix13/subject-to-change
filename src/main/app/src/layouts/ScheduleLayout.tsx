import React from "react";
import BaseLayout from "./BaseLayout";

interface ScheduleLayoutProps {
  children: React.ReactElement;
}

export default function ScheduleLayout(props: ScheduleLayoutProps) {
  return <BaseLayout title="Schedule">{props.children}</BaseLayout>;
}
