"use client";

import { useEffect, useState } from "react";

export default function TypedRole({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          setText(word.slice(0, text.length + 1));
          if (text.length + 1 === word.length) setTimeout(() => setDel(true), 1100);
        } else {
          setText(word.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setDel(false);
            setI((v) => v + 1);
          }
        }
      },
      del ? 35 : 70
    );
    return () => clearTimeout(t);
  }, [text, del, i, words]);

  return (
    <span className="mono text-signal">
      {text}
      <span className="inline-block w-[7px] h-[1em] align-middle bg-signal/70 animate-blink ml-0.5" />
    </span>
  );
}
