import Reveal from "./Reveal";
import ScrambleText from "./ScrambleText";
import SplitText from "./SplitText";

export default function SectionHead({
  kicker,
  heading,
  body,
}: {
  kicker: string;
  heading: string;
  body?: string;
}) {
  return (
    <Reveal className="mb-12 md:mb-14 max-w-2xl">
      <div className="mono text-[12px] text-signal mb-3">
        <ScrambleText text={kicker} />
      </div>
      <h2 className="display font-semibold text-[clamp(1.4rem,2.6vw,2rem)] leading-snug text-balance">
        <SplitText text={heading} inView stagger={0.008} />
      </h2>
      {body && <p className="text-mute mt-3 max-w-[56ch]">{body}</p>}
    </Reveal>
  );
}
