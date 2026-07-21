import './Supporters.css';

import { useCallback, useEffect, useRef, useState } from 'react';

import iitImage from '../../../assets/home-page/supporters/iit.webp';
import parqtelImage from '../../../assets/home-page/supporters/parqtel.webp';
import poliImage from '../../../assets/logos/poli.webp';
import upeImage from '../../../assets/logos/upe.webp';

const supporters = [
  { name: 'Poli', image: poliImage, link: 'https://www.poli.br/', zoom: 110 },
  { name: 'UPE', image: upeImage, link: 'https://www.upe.br/', zoom: 105 },
  { name: 'IIT', image: iitImage, link: 'https://iit.upe.br/', zoom: 80 },
  { name: 'Parqtel', image: parqtelImage, link: 'https://parqtel.pe.gov.br/', zoom: 110 },
];

const REPEAT_COUNT = 6;
const AUTO_SCROLL_SPEED = 18;
const DRAG_THRESHOLD = 6;
const AUTOPLAY_RESUME_DELAY_MS = 3000;
const supportersSets = Array.from({ length: REPEAT_COUNT }, () => supporters);

const Supporters = () => {
  const trackRef = useRef(null);
  const groupRef = useRef(null);
  const animationFrameRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const lastTimestampRef = useRef(0);
  const offsetRef = useRef(0);
  const groupWidthRef = useRef(0);
  const autoplayBlockedUntilRef = useRef(0);
  const dragStateRef = useRef({
    pointerId: null,
    startX: 0,
    startOffset: 0,
    hasMoved: false,
  });
  const suppressClickRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const normalizeOffset = useCallback((offset) => {
    const groupWidth = groupWidthRef.current;

    if (groupWidth <= 0) {
      return 0;
    }

    return ((offset % groupWidth) + groupWidth) % groupWidth;
  }, []);

  const applyOffset = useCallback(
    (offset) => {
      const normalizedOffset = normalizeOffset(offset);

      offsetRef.current = normalizedOffset;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-normalizedOffset}px, 0, 0)`;
      }
    },
    [normalizeOffset]
  );

  const blockAutoplay = useCallback(() => {
    autoplayBlockedUntilRef.current = Date.now() + AUTOPLAY_RESUME_DELAY_MS;

    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = window.setTimeout(() => {
      autoplayBlockedUntilRef.current = 0;
      resumeTimeoutRef.current = null;
    }, AUTOPLAY_RESUME_DELAY_MS);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateReducedMotion = () => {
      reducedMotionRef.current = prefersReducedMotion.matches;
    };

    const updateMeasurements = () => {
      const nextGroupWidth = groupRef.current?.getBoundingClientRect().width ?? 0;

      if (nextGroupWidth > 0) {
        groupWidthRef.current = nextGroupWidth;
        applyOffset(offsetRef.current);
      }
    };

    updateReducedMotion();
    updateMeasurements();

    const resizeObserver = new ResizeObserver(updateMeasurements);

    if (groupRef.current) {
      resizeObserver.observe(groupRef.current);
    }

    prefersReducedMotion.addEventListener('change', updateReducedMotion);

    return () => {
      resizeObserver.disconnect();
      prefersReducedMotion.removeEventListener('change', updateReducedMotion);
    };
  }, [applyOffset]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const animate = (timestamp) => {
      const autoplayIsBlocked = Date.now() < autoplayBlockedUntilRef.current;

      if (
        !isDragging &&
        !reducedMotionRef.current &&
        groupWidthRef.current > 0 &&
        !autoplayIsBlocked
      ) {
        if (lastTimestampRef.current) {
          const deltaSeconds = (timestamp - lastTimestampRef.current) / 1000;
          applyOffset(offsetRef.current + AUTO_SCROLL_SPEED * deltaSeconds);
        }
      }

      lastTimestampRef.current = timestamp;
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging, applyOffset]);

  const handlePointerDown = (event) => {
    if (event.button !== 0 && event.pointerType !== 'touch') {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startOffset: offsetRef.current,
      hasMoved: false,
    };
  };

  const handlePointerMove = (event) => {
    if (dragStateRef.current.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragStateRef.current.startX;

    if (Math.abs(deltaX) >= DRAG_THRESHOLD) {
      dragStateRef.current.hasMoved = true;
    }

    if (dragStateRef.current.hasMoved) {
      if (!isDragging) {
        setIsDragging(true);

        if (event.currentTarget.setPointerCapture) {
          event.currentTarget.setPointerCapture(event.pointerId);
        }
      }

      event.preventDefault();
      applyOffset(dragStateRef.current.startOffset - deltaX);
    }
  };

  const finishPointerDrag = (event) => {
    if (dragStateRef.current.pointerId !== event.pointerId) {
      return;
    }

    if (event.currentTarget.releasePointerCapture) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch (error) {
        void error;
      }
    }

    if (dragStateRef.current.hasMoved) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);

      blockAutoplay();
    }

    dragStateRef.current.pointerId = null;
    dragStateRef.current.hasMoved = false;
    setIsDragging(false);
  };

  const handleClickCapture = (event) => {
    if (!suppressClickRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  return (
    <section className="supporters-section" aria-label="Apoiadores e parcerias">
      <div className="supporters-content">
        <p className="supporters-label">Apoiadores</p>

        <div
          className={`supporters-marquee${isDragging ? ' supporters-marquee--dragging' : ''}`}
          role="presentation"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPointerDrag}
          onPointerCancel={finishPointerDrag}
          onClickCapture={handleClickCapture}
        >
          <div className="supporters-track" ref={trackRef}>
            {supportersSets.map((supporterGroup, groupIndex) => (
              <div
                className="supporters-group"
                key={`group-${groupIndex}`}
                ref={groupIndex === 0 ? groupRef : undefined}
                aria-hidden={groupIndex !== 0}
              >
                {supporterGroup.map((supporter, index) => (
                  <a
                    key={`${supporter.name}-${groupIndex}-${index}`}
                    href={supporter.link}
                    className="supporter-card"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitar ${supporter.name}`}
                    draggable="false"
                    onDragStart={(event) => event.preventDefault()}
                    tabIndex={groupIndex === 0 ? 0 : -1}
                  >
                    <div
                      className="supporter-logo-frame"
                      style={{ '--supporter-zoom': supporter.zoom }}
                    >
                      <img
                        src={supporter.image}
                        alt={supporter.name}
                        className="supporter-logo"
                        loading="lazy"
                        draggable="false"
                        onDragStart={(event) => event.preventDefault()}
                      />
                    </div>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Supporters;
