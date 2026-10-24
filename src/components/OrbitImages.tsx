// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useMotionTemplate
} from 'motion/react';

function generateEllipsePath(cx: number, cy: number, rx: number, ry: number) {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
}

function generateCirclePath(cx: number, cy: number, r: number) {
  return generateEllipsePath(cx, cy, r, r);
}

function OrbitItem({
  item,
  index,
  totalItems,
  pathValue,
  itemSizeValue,
  rotationValue,
  progress,
  fill,
  scaleStrength,
  focalPoint = 50
}) {
  const itemOffset = fill ? (index / totalItems) * 100 : 0;
  const offsetPercentage = useTransform(
    progress,
    (p) => (((p + itemOffset) % 100) + 100) % 100
  );
  const offsetDistance = useTransform(offsetPercentage, (p) => `${p}%`);

  const itemScale = useTransform(() => {
    const rawPos = offsetPercentage.get();
    const strength = scaleStrength ? scaleStrength.get() : 0;
    let dist = Math.abs(rawPos - focalPoint);
    if (dist > 50) dist = 100 - dist;
    let targetScale = 1;
    if (dist < 20) {
      const ratio = dist / 20;
      const cosCurve = (Math.cos(ratio * Math.PI) + 1) / 2;
      targetScale = 0.65 + cosCurve * 0.35;
    } else {
      targetScale = 0.65;
    }
    return 1 - strength * (1 - targetScale);
  });

  const offsetPath = useMotionTemplate`path("${pathValue}")`;

  return (
    <motion.div
      className="orbit-item"
      style={{
        width: itemSizeValue,
        height: itemSizeValue,
        offsetPath,
        offsetRotate: '0deg',
        offsetAnchor: 'center center',
        offsetDistance,
        scale: itemScale,
        zIndex: useTransform(itemScale, (s) => Math.round(s * 100)),
        pointerEvents: 'auto'
      }}
    >
      <motion.div
        style={{
          transform: useTransform(rotationValue, (r) => `rotate(${-r}deg)`),
          width: '100%',
          height: '100%'
        }}
      >
        {item}
      </motion.div>
    </motion.div>
  );
}

interface OrbitImagesProps {
  images?: string[];
  labels?: string[];
  altPrefix?: string;
  shape?: 'ellipse' | 'circle';
  baseWidth?: number;
  radiusX?: number;
  radiusY?: number;
  rotation?: number;
  duration?: number;
  itemSize?: number;
  direction?: 'normal' | 'reverse';
  fill?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  showPath?: boolean;
  easing?: string;
  paused?: boolean;
  centerContent?: React.ReactNode;
  responsive?: boolean;
  progressOverride?: any;
  radiusXOverride?: any;
  radiusYOverride?: any;
  itemSizeOverride?: any;
  rotationOverride?: any;
  translateXOverride?: any;
  focusStrength?: any;
  onSelectIndex?: (index: number) => void;
}

export default function OrbitImages({
  images = [],
  labels = [],
  altPrefix = 'Orbiting study image',
  shape = 'ellipse',
  baseWidth = 1400,
  radiusX = 700,
  radiusY = 170,
  rotation = -8,
  duration = 40,
  itemSize = 64,
  direction = 'normal',
  fill = true,
  width = 100,
  height = 100,
  className = '',
  showPath = false,
  easing = 'linear',
  paused = false,
  centerContent,
  responsive = false,
  progressOverride,
  radiusXOverride,
  radiusYOverride,
  itemSizeOverride,
  rotationOverride,
  translateXOverride,
  focusStrength,
  onSelectIndex
}: OrbitImagesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const designCenterX = baseWidth / 2;
  const designCenterY = baseWidth / 2;

  const fallbackRx = useMotionValue(radiusX);
  const fallbackRy = useMotionValue(radiusY);
  const fallbackSize = useMotionValue(itemSize);
  const fallbackRot = useMotionValue(rotation);
  const fallbackTx = useMotionValue(0);

  const currentRadiusX = radiusXOverride || fallbackRx;
  const currentRadiusY = radiusYOverride || fallbackRy;
  const currentItemSize = itemSizeOverride || fallbackSize;
  const currentRotation = rotationOverride || fallbackRot;
  const currentTranslateX = translateXOverride || fallbackTx;

  const pathValue = useTransform([currentRadiusX, currentRadiusY], ([rx, ry]) => {
    if (shape === 'circle') return generateCirclePath(designCenterX, designCenterY, rx);
    return generateEllipsePath(designCenterX, designCenterY, rx, ry);
  });

  useEffect(() => {
    if (!responsive || !containerRef.current) return;
    const updateScale = () => {
      if (containerRef.current) {
        setScale(containerRef.current.clientWidth / baseWidth);
      }
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [responsive, baseWidth]);

  const internalProgress = useMotionValue(0);
  useEffect(() => {
    if (paused || progressOverride) return;
    const controls = animate(internalProgress, direction === 'reverse' ? -100 : 100, {
      duration,
      ease: easing,
      repeat: Infinity,
      repeatType: 'loop'
    });
    return () => controls.stop();
  }, [internalProgress, duration, easing, direction, paused, progressOverride]);

  const activeProgress = progressOverride || internalProgress;
  const containerWidth = responsive ? '100%' : typeof width === 'number' ? width : '100%';
  const containerHeight = responsive
    ? 'auto'
    : typeof height === 'number'
    ? height
    : typeof width === 'number'
    ? width
    : 'auto';

  const items = images.map((src: string, index: number) => (
    <motion.div
      key={src + index}
      onClick={() => onSelectIndex && onSelectIndex(index)}
      whileHover={{ scale: 1.15 }}
      transition={{ duration: 0.25 }}
      className="relative w-full h-full rounded-full cursor-pointer group flex items-center justify-center"
      style={{ pointerEvents: 'auto' }}
      title={labels[index] || `${altPrefix} ${index + 1}`}
    >
      <img
        src={src}
        alt={labels[index] || `${altPrefix} ${index + 1}`}
        draggable={false}
        referrerPolicy="no-referrer"
        className="orbit-image select-none drop-shadow-[0_16px_28px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:scale-105"
      />
      {labels[index] && (
        <div className="pointer-events-none absolute -bottom-7 inset-x-0 py-1 px-2 text-center opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
          <span className="font-syne font-bold text-[11px] sm:text-[12px] uppercase tracking-wider text-[#0A0C0E] bg-[#EDE7DC]/95 backdrop-blur-sm px-3 py-1 rounded-full border border-[rgba(10,12,14,0.18)] shadow-md inline-block">
            {labels[index]}
          </span>
        </div>
      )}
    </motion.div>
  ));

  return (
    <div
      ref={containerRef}
      className={`orbit-container ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight,
        aspectRatio: responsive ? '1 / 1' : undefined
      }}
    >
      <div
        className={
          responsive
            ? 'orbit-scaling-container orbit-scaling-container--responsive'
            : 'orbit-scaling-container'
        }
        style={{
          width: responsive ? baseWidth : '100%',
          height: responsive ? baseWidth : '100%',
          transform: responsive ? `translate(-50%, -50%) scale(${scale})` : undefined
        }}
      >
        <motion.div
          className="orbit-rotation-wrapper"
          style={{ rotate: currentRotation, x: currentTranslateX }}
        >
          {items.map((item: React.ReactNode, index: number) => (
            <OrbitItem
              key={index}
              item={item}
              index={index}
              totalItems={items.length}
              pathValue={pathValue}
              itemSizeValue={currentItemSize}
              rotationValue={currentRotation}
              progress={activeProgress}
              fill={fill}
              scaleStrength={focusStrength}
              focalPoint={50}
            />
          ))}
        </motion.div>
      </div>
      {centerContent && <div className="orbit-center-content">{centerContent}</div>}
    </div>
  );
}
