import type { Metadata } from "next";
import Walkthrough from "../../components/walkthrough";
export const metadata: Metadata = {
  title: "How Arrow works — Interactive walkthrough | The Arrow Arch",
  description:
    "Explore a sample request through planning, isolated work, independent verification and a local reviewable branch. Includes local setup instructions.",
};
export default function Demo() {
  return <Walkthrough />;
}
