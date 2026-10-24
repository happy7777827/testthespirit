import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StudyModule } from '../data/scriptureData';

interface ThrowableStudyDeckProps {
  items: StudyModule[];
  activeIndex: number;
  onActiveIndexChange: (newIndex: number) => void;
  onOpenStudy: (study: StudyModule) => void;
  throwTriggerCount: number;
}

// Deterministic physical offsets for stacked cards beneath the top sleeve
const STACK_OFFSETS = [
  { x: 0, y: 0, scale: 1, rot: 0 },
  { x: 10, y: -8, scale: 0.965, rot: 2.2 },
  { x: -12, y: -15, scale: 0.93, rot: -2.6 },
  { x: 14, y: -22, scale: 0.895, rot: 3.1 },
  { x: -9, y: -28, scale: 0.86, rot: -1.8 },
  { x: 6, y: -33, scale: 0.825, rot: 1.4 }
];

export function ThrowableStudyDeck({
  items,
  activeIndex,
  onActiveIndexChange,
  onOpenStudy,
  throwTriggerCount
}: ThrowableStudyDeckProps) {
  const deckRef = useRef<HTMLDivElement | null>(null);
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    dx: number;
    dy: number;
  }>({ isDragging: false, dx: 0, dy: 0 });

  const [throwingState, setThrowingState] = useState<{
    isThrowing: boolean;
    dir: 1 | -1;
  }>({ isThrowing: false, dir: 1 });

  const pointerStartRef = useRef<{ x: number; y: number; id: number | null }>({
    x: 0,
    y: 0,
    id: null
  });

  const triggerProgrammaticThrow = useCallback(
    (dir: 1 | -1 = 1) => {
      if (throwingState.isThrowing) return;
      setThrowingState({ isThrowing: true, dir });
      window.setTimeout(() => {
        const nextIdx =
          dir === 1
            ? (activeIndex + 1) % items.length
            : (activeIndex - 1 + items.length) % items.length;
        onActiveIndexChange(nextIdx);
        setThrowingState({ isThrowing: false, dir: 1 });
        setDragState({ isDragging: false, dx: 0, dy: 0 });
      }, 280);
    },
    [activeIndex, items.length, onActiveIndexChange, throwingState.isThrowing]
  );

  // Allow parent button ("THROW NEXT VOLUME") to trigger a throw
  const lastTriggerRef = useRef(throwTriggerCount);
  useEffect(() => {
    if (throwTriggerCount !== lastTriggerRef.current) {
      lastTriggerRef.current = throwTriggerCount;
      triggerProgrammaticThrow(1);
    }
  }, [throwTriggerCount, triggerProgrammaticThrow]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (throwingState.isThrowing) return;
    // Ignore if clicking directly on the 'Read Study' button inside the sleeve
    if ((e.target as HTMLElement).closest('[data-study-open-btn="true"]')) {
      return;
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    pointerStartRef.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
    setDragState({ isDragging: true, dx: 0, dy: 0 });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.isDragging || pointerStartRef.current.id !== e.pointerId) return;
    const dx = e.clientX - pointerStartRef.current.x;
    const dy = (e.clientY - pointerStartRef.current.y) * 0.35;
    setDragState({ isDragging: true, dx, dy });
  };

  const finishDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.isDragging || pointerStartRef.current.id !== e.pointerId) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    pointerStartRef.current.id = null;

    const deckWidth = deckRef.current?.offsetWidth || 380;
    const threshold = deckWidth * 0.1; // 1/10th of deck width per spec

    if (Math.abs(dragState.dx) > threshold) {
      const dir: 1 | -1 = dragState.dx >= 0 ? 1 : -1;
      setDragState({ isDragging: false, dx: dragState.dx, dy: dragState.dy });
      setThrowingState({ isThrowing: true, dir });
      window.setTimeout(() => {
        const nextIdx = (activeIndex + 1) % items.length;
        onActiveIndexChange(nextIdx);
        setThrowingState({ isThrowing: false, dir: 1 });
        setDragState({ isDragging: false, dx: 0, dy: 0 });
      }, 280);
    } else {
      setDragState({ isDragging: false, dx: 0, dy: 0 });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      triggerProgrammaticThrow(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      triggerProgrammaticThrow(-1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenStudy(items[activeIndex]);
    }
  };

  // Order cards relative to activeIndex so index 0 is on top of stack
  const orderedCards = items.map((_, idx) => {
    const stackPos = (idx - activeIndex + items.length) % items.length;
    return { item: items[idx], originalIdx: idx, stackPos };
  });

  // Sort back-to-front so top card (stackPos === 0) renders last on top
  orderedCards.sort((a, b) => b.stackPos - a.stackPos);

  return (
    <div className="w-full max-w-[440px] mx-auto select-none">
      {/* Interactive Square Deck Stage */}
      <div
        ref={deckRef}
        tabIndex={0}
        role="region"
        aria-label="Throwable Biblical Study Archive Deck. Use Left and Right arrow keys or drag to flip study sleeves."
        onKeyDown={handleKeyDown}
        style={{ touchAction: 'pan-y' }}
        className="relative w-full aspect-square focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E8913C]"
      >
        {orderedCards.map(({ item, originalIdx, stackPos }) => {
          const isTop = stackPos === 0;
          const preset = STACK_OFFSETS[Math.min(stackPos, STACK_OFFSETS.length - 1)];

          let transformStr = `translate3d(${preset.x}px, ${preset.y}px, 0) scale(${preset.scale}) rotate(${preset.rot}deg)`;
          let transitionStr =
            'transform 340ms cubic-bezier(0.16, 1, 0.3, 1), opacity 340ms cubic-bezier(0.16, 1, 0.3, 1)';
          let opacityVal = stackPos > 4 ? 0 : 1 - stackPos * 0.12;

          if (isTop) {
            opacityVal = 1;
            if (throwingState.isThrowing) {
              const throwX = throwingState.dir * 460;
              const throwRot = throwingState.dir * 18;
              transformStr = `translate3d(${throwX}px, -36px, 0) scale(1.03) rotate(${throwRot}deg)`;
              transitionStr =
                'transform 280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 280ms ease-out';
              opacityVal = 0;
            } else if (dragState.isDragging) {
              const rot = dragState.dx * 0.045;
              transformStr = `translate3d(${dragState.dx}px, ${dragState.dy}px, 0) scale(1.02) rotate(${rot}deg)`;
              transitionStr = 'none';
            }
          }

          return (
            <div
              key={item.id}
              onPointerDown={isTop ? handlePointerDown : undefined}
              onPointerMove={isTop ? handlePointerMove : undefined}
              onPointerUp={isTop ? finishDrag : undefined}
              onPointerCancel={isTop ? finishDrag : undefined}
              style={{
                transform: transformStr,
                transition: transitionStr,
                opacity: opacityVal,
                zIndex: items.length - stackPos,
                touchAction: 'pan-y'
              }}
              className={`absolute inset-4 bg-[#101317] hairline-border deck-card-shadow flex flex-col justify-between overflow-hidden ${
                isTop ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
              }`}
            >
              {/* Top Sleeve Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 hairline-b bg-[#0A0C0E]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
                  <span className="label-caps text-[#9EA5A8]">
                    ARCHIVE VOL. 0{originalIdx + 1}
                  </span>
                </div>
                <span className="label-caps text-[#E8913C]">{item.keyVerseRef}</span>
              </div>

              {/* Sleeve Artwork */}
              <div className="relative flex-1 overflow-hidden bg-[#0A0C0E]">
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top pointer-events-none"
                />
              </div>

              {/* Bottom Sleeve Information */}
              <div className="p-4 sm:p-5 bg-[#0A0C0E] hairline-t flex flex-col justify-between gap-2">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-syne font-bold text-lg sm:text-xl text-[#EDE7DC] leading-tight">
                    {item.title}
                  </h3>
                  <span className="label-caps text-[#2E6B72] shrink-0">{item.category}</span>
                </div>
                <p className="text-xs text-[#9EA5A8] line-clamp-2 leading-relaxed">
                  {item.cardSnippet}
                </p>
                <div className="pt-2 hairline-t flex items-center justify-between">
                  <span className="label-caps text-[#6C7378]">
                    {item.greekOrHebrewTerm.transliteration.split(' ')[0]}
                  </span>
                  <button
                    type="button"
                    data-study-open-btn="true"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenStudy(item);
                    }}
                    className="label-caps text-[#E8913C] hover:text-[#EDE7DC] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    EXAMINE STUDY →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hint Line & Progress Dots Beneath Deck */}
      <div className="mt-4 flex flex-col items-center gap-3">
        <div className="label-caps text-[#6C7378] text-center">
          THROW SLEEVE SIDEWAYS OR PRESS ← / → KEYS TO FLIP ARCHIVE
        </div>
        <div className="flex items-center gap-2.5" role="tablist" aria-label="Study Archive Volumes">
          {items.map((item, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Volume ${i + 1}: ${item.title}`}
                onClick={() => onActiveIndexChange(i)}
                className={`w-2 h-2 rounded-full transition-transform cursor-pointer ${
                  isActive
                    ? 'bg-[#E8913C] scale-125'
                    : 'bg-[#2E6B72] opacity-55 hover:opacity-100'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
