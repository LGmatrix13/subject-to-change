import React from "react";
import BaseLayout from "./BaseLayout";

interface SuggestedLayoutProps {
  children: React.ReactElement;
}

export default function SuggestedLayout(props: SuggestedLayoutProps) {
  return <BaseLayout title="Suggested">{props.children}</BaseLayout>;
}
