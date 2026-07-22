"use client";
import React, { useEffect, useRef } from 'react';

interface ScrollSequenceProps {
  frameCount?: number;
  imageFolder?: string;
  imagePrefix?: string;
  imageExtension?: string;
  children?: React.ReactNode;
}

const ScrollSequence: React.FC<ScrollSequenceProps> = ({
  frameCount = 300,
  imageFolder = '/scroll-sequence',
  imagePrefix = 'ezgif-frame-',
  imageExtension = 'jpg',
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const imagesRef = useRef<Record<number, HTMLImageElement>>({});
  const loadedArrayRef = useRef<number[]>([]);
  
  const requestRef = useRef<number>();
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);

  // Progressive Preloading
  useEffect(() => {
    let isCancelled = false;
    imagesRef.current = {};
    loadedArrayRef.current = [];

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        const paddedIndex = (index + 1).toString().padStart(3, '0');
        img.src = `${imageFolder}/${imagePrefix}${paddedIndex}.${imageExtension}`;
        
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[index] = img;
            loadedArrayRef.current.push(index);
            loadedArrayRef.current.sort((a, b) => a - b);
            resolve();
          }
        };
        img.onerror = () => {
          console.log(`Failed to load image: ${img.src}`);
          resolve();
        };
      });
    };

    const loadImages = async () => {
      // Preload initial batch
      const initialBatch = Math.min(10, frameCount);
      const initialPromises = [];
      
      for (let i = 0; i < initialBatch; i++) {
        initialPromises.push(loadImage(i));
      }
      
      await Promise.all(initialPromises);
      
      // Progressively load rest
      if (!isCancelled) {
        for (let i = initialBatch; i < frameCount; i++) {
          if (isCancelled) break;
          await loadImage(i);
        }
      }
    };
    
    loadImages();
    
    return () => {
      isCancelled = true;
    };
  }, [frameCount, imageFolder, imagePrefix, imageExtension]);

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const getClosestLoadedFrame = (target: number) => {
    const arr = loadedArrayRef.current;
    if (arr.length === 0) return -1;
    
    if (imagesRef.current[target]) return target;
    
    return arr.reduce((prev, curr) => {
      return Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev;
    });
  };

  // Scroll mapping across container height
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const maxScroll = rect.height - viewportHeight;
      let progress = 0;
      
      if (maxScroll > 0) {
        progress = -rect.top / maxScroll;
      }
      
      // Clamp progress between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      
      const target = Math.min(frameCount - 1, Math.floor(progress * frameCount));
      console.log(`Scroll progress: ${progress.toFixed(4)}, target frame: ${target}`);
      targetFrameRef.current = target;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [frameCount]);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const renderFrame = (frameIndex: number) => {
      const closestIndex = getClosestLoadedFrame(frameIndex);
      if (closestIndex === -1) return;
      
      const img = imagesRef.current[closestIndex];
      if (!img || img.naturalWidth === 0) return;
      
      const ratio = window.devicePixelRatio || 1;
      const canvasWidth = canvas.clientWidth * ratio;
      const canvasHeight = canvas.clientHeight * ratio;
      
      if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
      }
      
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const drawLoop = () => {
      currentFrameRef.current = lerp(currentFrameRef.current, targetFrameRef.current, 0.08);
      
      if (Math.abs(targetFrameRef.current - currentFrameRef.current) < 0.01) {
        currentFrameRef.current = targetFrameRef.current;
      }
      
      const roundedFrame = Math.round(currentFrameRef.current);
      console.log(`Current frame: ${roundedFrame}, Target: ${targetFrameRef.current}`);
      renderFrame(roundedFrame);
      
      requestRef.current = requestAnimationFrame(drawLoop);
    };
    
    requestRef.current = requestAnimationFrame(drawLoop);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [frameCount]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'relative',
        width: '100%'
      }}
    >
      {/* Sticky Canvas Layer */}
      <div 
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          marginBottom: '-100vh',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Relative Portfolio Content Layer */}
      <div 
        style={{ 
          position: 'relative', 
          zIndex: 1 
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollSequence;
