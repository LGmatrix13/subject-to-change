import React from "react";
import BaseLayout from "./BaseLayout";

interface SearchLayoutProps {
  children: React.ReactElement;
}

export default function SearchLayout(props: SearchLayoutProps) {
  return <BaseLayout title="Search">{props.children}</BaseLayout>;
}
