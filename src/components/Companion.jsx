import { useEffect, useState } from "react";
import { Heart, Sparkles, Utensils } from "lucide-react";

const messages = [
  "Pika? I mean... hi, Vijay!",
  "Your next idea has good energy.",
  "That project section looks electric.",
  "Keep going. I am watching the pixels.",
];

export default function Companion() {
  const [message, setMessage] = useState(messages[0]);
  const [mood, setMood] = useState("idle");
  const [energy, setEnergy] = useState(78);

  useEffect(() => {
    const timer = setTimeout(() => setMood("idle"), 1200);
    return () => clearTimeout(timer);
  }, [mood]);

  const interact = (nextMood, nextMessage, energyChange = 0) => {
    setMood(nextMood);
    setMessage(nextMessage);
    setEnergy((current) => Math.max(0, Math.min(100, current + energyChange)));
  };

  const greet = () => {
    const nextMessage = messages[Math.floor(Math.random() * messages.length)];
    interact("happy", nextMessage, 3);
  };

  return (
    <aside className="companion" aria-label="Interactive portfolio companion">
      <div className="companion__bubble" aria-live="polite">
        {message}
      </div>
      <div className={`companion__stage companion__stage--${mood}`}>
        <button
          className="companion__creature"
          type="button"
          onClick={greet}
          aria-label="Talk to your companion"
        >
          <span className="companion__ear companion__ear--left" />
          <span className="companion__ear companion__ear--right" />
          <span className="companion__tail" />
          <span className="companion__body">
            <span className="companion__eye companion__eye--left" />
            <span className="companion__eye companion__eye--right" />
            <span className="companion__blush companion__blush--left" />
            <span className="companion__blush companion__blush--right" />
            <span className="companion__mouth" />
            <span className="companion__belly" />
          </span>
        </button>
        <div className="companion__shadow" />
      </div>
      <div className="companion__footer">
        <div>
          <strong>Volt</strong>
          <span>your tiny co-pilot</span>
        </div>
        <div className="companion__energy" title={`${energy}% energy`}>
          <span style={{ width: `${energy}%` }} />
        </div>
      </div>
      <div className="companion__actions">
        <button
          type="button"
          onClick={() =>
            interact("happy", "A little snack. A lot of focus.", 8)
          }
          aria-label="Feed Volt"
          title="Feed Volt"
        >
          <Utensils size={14} />
        </button>
        <button
          type="button"
          onClick={() => interact("spark", "A burst of inspiration!", 12)}
          aria-label="Play with Volt"
          title="Play with Volt"
        >
          <Sparkles size={14} />
        </button>
        <button
          type="button"
          onClick={() => interact("love", "You are doing great, human.", 4)}
          aria-label="Pet Volt"
          title="Pet Volt"
        >
          <Heart size={14} />
        </button>
      </div>
    </aside>
  );
}
