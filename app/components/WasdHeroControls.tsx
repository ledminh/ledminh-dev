"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

type MovementKey = "w" | "a" | "s" | "d" | "arrowup" | "arrowdown";

const movementKeys: MovementKey[] = ["w", "a", "s", "d", "arrowup", "arrowdown"];
const idlePressedState: Record<MovementKey, boolean> = {
  w: false,
  a: false,
  s: false,
  d: false,
  arrowup: false,
  arrowdown: false,
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

function applyBackgroundMotionVars(shiftX: number, vertical: number, zoom: number) {
  const shiftY = vertical + zoom * -18;
  const scale = 1 + zoom * 0.22;
  const rotateY = shiftX * -0.015;
  const rotateX = vertical * -0.012 + zoom * -2.2;
  const brightness = clamp(1 + zoom * 0.08 + Math.abs(vertical) * 0.00028, 0.9, 1.22);
  const opacity = clamp(0.58 + Math.abs(zoom) * 0.06 + Math.abs(vertical) * 0.00022, 0.58, 0.82);

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
    vertical: 0,
    zoom: 0,
    rafId: 0,
    lastFrameAt: 0,
  });

  const setKey = useCallback((key: MovementKey, value: boolean) => {
    setPressedKeys((current) => {
      if (current[key] === value) return current;
      const next = { ...current, [key]: value };
      pressedRef.current = next;
      return next;
    });
  }, []);

  const releaseAll = useCallback(() => {
    setPressedKeys((current) => {
      if (!movementKeys.some((key) => current[key])) return current;
      pressedRef.current = idlePressedState;
      return idlePressedState;
    });
  }, []);

  const pressPointerKey = useCallback(
    (key: MovementKey, event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      setKey(key, true);
    },
    [setKey],
  );

  const releasePointerKey = useCallback(
    (key: MovementKey, event: React.PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      setKey(key, false);
    },
    [setKey],
  );

  useEffect(() => {
    const motion = motionRef.current;

    applyBackgroundMotionVars(0, 0, 0);
    const shouldDisableKeyboardControls =
      window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (shouldDisableKeyboardControls) {
      return;
    }

    const animate = (now: number) => {
      const dt =
        motion.lastFrameAt === 0 ? 0.016 : Math.min((now - motion.lastFrameAt) / 1000, 0.033);
      motion.lastFrameAt = now;

      const pressed = pressedRef.current;
      const horizontalInput = (pressed.a ? 1 : 0) - (pressed.d ? 1 : 0);
      const verticalInput = (pressed.arrowup ? 1 : 0) - (pressed.arrowdown ? 1 : 0);
      const zoomInput = (pressed.w ? 1 : 0) - (pressed.s ? 1 : 0);

      if (horizontalInput !== 0) {
        motion.shiftX = clamp(motion.shiftX + horizontalInput * 310 * dt, -220, 220);
      } else {
        motion.shiftX *= Math.exp(-8 * dt);
      }

      if (verticalInput !== 0) {
        motion.vertical = clamp(motion.vertical + verticalInput * 240 * dt, -140, 140);
      } else {
        motion.vertical *= Math.exp(-8 * dt);
      }

      if (zoomInput !== 0) {
        motion.zoom = clamp(motion.zoom + zoomInput * 2.5 * dt, -1.1, 1.1);
      } else {
        motion.zoom *= Math.exp(-7.5 * dt);
      }

      applyBackgroundMotionVars(motion.shiftX, motion.vertical, motion.zoom);
      motion.rafId = window.requestAnimationFrame(animate);
    };

    motionRef.current.rafId = window.requestAnimationFrame(animate);

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase() as MovementKey;
      if (!movementKeys.includes(key) || isEditableTarget(event.target)) {
        return;
      }

      event.preventDefault();
      setKey(key, true);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase() as MovementKey;
      if (!movementKeys.includes(key)) {
        return;
      }

      event.preventDefault();
      setKey(key, false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", releaseAll);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", releaseAll);
      window.cancelAnimationFrame(motion.rafId);
      motion.shiftX = 0;
      motion.vertical = 0;
      motion.zoom = 0;
      motion.lastFrameAt = 0;
      applyBackgroundMotionVars(0, 0, 0);
    };
  }, [setKey, releaseAll]);

  return (
    <>
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
      <div className="arrow-cluster">
        <button
          type="button"
          className={`wasd-key arrow-key arrow-key-up ${pressedKeys.arrowup ? "is-active" : ""}`}
          aria-label="Move up"
          onPointerDown={(event) => pressPointerKey("arrowup", event)}
          onPointerUp={(event) => releasePointerKey("arrowup", event)}
          onPointerCancel={() => setKey("arrowup", false)}
          onLostPointerCapture={() => setKey("arrowup", false)}
        >
          <ArrowUp aria-hidden="true" size={14} strokeWidth={2.6} />
        </button>
        <button
          type="button"
          className={`wasd-key arrow-key arrow-key-down ${pressedKeys.arrowdown ? "is-active" : ""}`}
          aria-label="Move down"
          onPointerDown={(event) => pressPointerKey("arrowdown", event)}
          onPointerUp={(event) => releasePointerKey("arrowdown", event)}
          onPointerCancel={() => setKey("arrowdown", false)}
          onLostPointerCapture={() => setKey("arrowdown", false)}
        >
          <ArrowDown aria-hidden="true" size={14} strokeWidth={2.6} />
        </button>
      </div>
    </>
  );
}
