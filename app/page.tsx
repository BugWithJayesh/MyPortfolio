import { Portfolio } from "./components/Portfolio";
import ScrollSequence from "./components/ScrollSequence";

export default function Home() {
  return (
    <ScrollSequence frameCount={300} imageFolder="/scroll-sequence">
      <Portfolio />
    </ScrollSequence>
  );
}
