"use client";

import { useEffect, useRef, useState } from "react";

type MovementKey = "w" | "a" | "s" | "d";

const movementKeys: MovementKey[] = ["w", "a", "s", "d"];
const idlePressedState: Record<MovementKey, boolean> = {
  w: false,
  a: false,
  s: false,
  d: false,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  if (target.isContentEditable) {
    return true;
  }

  const tagName = target.tagName;
  return tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT";
}

function applyBackgroundMotionVars(shiftX: number, depth: number) {
  const shiftY = depth * -36;
  const scale = 1 + depth * 0.2;
  const rotateY = shiftX * -0.018;
  const rotateX = depth * -3.2;
  const brightness = 1 + depth * 0.1;
  const opacity = 0.58 + Math.abs(depth) * 0.06;

  document.documentElement.style.setProperty("--lake-shift-x", `${shiftX}px`);
  document.documentElement.style.setProperty("--lake-shift-y", `${shiftY}px`);
  document.documentElement.style.setProperty("--lake-scale", `${scale}`);
  document.documentElement.style.setProperty("--lake-rotate-x", `${rotateX}deg`);
  document.documentElement.style.setProperty("--lake-rotate-y", `${rotateY}deg`);
  document.documentElement.style.setProperty("--lake-brightness", `${brightness}`);
  document.documentElement.style.setProperty("--lake-opacity", `${opacity}`);
}

export default function WasdHeroControls() {
  const [pressedKeys, setPressedKeys] = useState(idlePressedState);
  const pressedRef = useRef<Record<MovementKey, boolean>>(idlePressedState);
  const motionRef = useRef({
    shiftX: 0,
    depth: 0,
    rafId: 0,
    lastFrameAt: 0,
  });

  useEffect(() => {
    const motion = motionRef.current;

    applyBackgroundMotionVars(0, 0);

    const animate = (now: number) => {
      const dt =
        motion.lastFrameAt === 0 ? 0.016 : Math.min((now - motion.lastFrameAt) / 1000, 0.033);
      motion.lastFrameAt = now;

      const pressed = pressedRef.current;
      const horizontalInput = (pressed.a ? 1 : 0) - (pressed.d ? 1 : 0);
      const depthInput = (pressed.w ? 1 : 0) - (pressed.s ? 1 : 0);

      if (horizontalInput !== 0) {
        motion.shiftX = clamp(motion.shiftX + horizontalInput * 310 * dt, -220, 220);
      } else {
        motion.shiftX *= Math.exp(-8 * dt);
      }

      if (depthInput !== 0) {
        motion.depth = clamp(motion.depth + depthInput * 3.2 * dt, -1.4, 1.4);
      } else {
        motion.depth *= Math.exp(-7 * dt);
      }

      applyBackgroundMotionVars(motion.shiftX, motion.depth);
      motion.rafId = window.requestAnimationFrame(animate);
    };

    motionRef.current.rafId = window.requestAnimationFrame(animate);

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase() as MovementKey;
      if (!movementKeys.includes(key) || isEditableTarget(event.target)) {
        return;
      }

      event.preventDefault();

      setPressedKeys((current) => {
        if (current[key]) {
          return current;
        }

        const next = { ...current, [key]: true };
        pressedRef.current = next;
        return next;
      });
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase() as MovementKey;
      if (!movementKeys.includes(key)) {
        return;
      }

      event.preventDefault();

      setPressedKeys((current) => {
        if (!current[key]) {
          return current;
        }

        const next = { ...current, [key]: false };
        pressedRef.current = next;
        return next;
      });
    };

    const handleBlur = () => {
      setPressedKeys((current) => {
        if (!movementKeys.some((key) => current[key])) {
          return current;
        }

        pressedRef.current = idlePressedState;
        return idlePressedState;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
      window.cancelAnimationFrame(motion.rafId);
      motion.shiftX = 0;
      motion.depth = 0;
      motion.lastFrameAt = 0;
      applyBackgroundMotionVars(0, 0);
    };
  }, []);

  return (
    <div aria-hidden="true" className="wasd-cluster">
      <span className={`wasd-key wasd-key-w ${pressedKeys.w ? "is-active" : ""}`}>
        W
      </span>
      <span className={`wasd-key wasd-key-a ${pressedKeys.a ? "is-active" : ""}`}>
        A
      </span>
      <span className={`wasd-key wasd-key-s ${pressedKeys.s ? "is-active" : ""}`}>
        S
      </span>
      <span className={`wasd-key wasd-key-d ${pressedKeys.d ? "is-active" : ""}`}>
        D
      </span>
    </div>
  );
}
