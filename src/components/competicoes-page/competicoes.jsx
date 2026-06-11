import '../utils/global-cta.css';
import './competicoes.css';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import imgSAE20251 from '../../assets/competicoes-page/eletroquad2025/SAE1.webp';
import imgSAE20252 from '../../assets/competicoes-page/eletroquad2025/SAE2.webp';
import imgSAE20253 from '../../assets/competicoes-page/eletroquad2025/SAE3.webp';
import imgSAE20254 from '../../assets/competicoes-page/eletroquad2025/SAE4.webp';
import imgSAE20255 from '../../assets/competicoes-page/eletroquad2025/SAE5.webp';
import imgSAE20256 from '../../assets/competicoes-page/eletroquad2025/SAE6.webp';
import imgSAE20257 from '../../assets/competicoes-page/eletroquad2025/SAE7.webp';
import imgSAE20261 from '../../assets/competicoes-page/eletroquad2026/SAE1.webp';
import imgSAE20262 from '../../assets/competicoes-page/eletroquad2026/SAE2.webp';
import imgSAE20263 from '../../assets/competicoes-page/eletroquad2026/SAE3.webp';
import imgSAE20264 from '../../assets/competicoes-page/eletroquad2026/SAE4.webp';
import imgSAE20265 from '../../assets/competicoes-page/eletroquad2026/SAE5.webp';
import imgSAE20266 from '../../assets/competicoes-page/eletroquad2026/SAE6.webp';
import imgSAE20267 from '../../assets/competicoes-page/eletroquad2026/SAE7.webp';
import imgSuspense from '../../assets/competicoes-page/suspense.webp';
import { handleAnimationAndAction } from '../utils/animation-handler';

const competicoes = [
  {
    nome: 'Eletroquad SAE Brasil 2025',
    ano: '2025',
    descricao:
      'Estreamos com orgulho na principal competição nacional de drones autônomos. Representando Pernambuco e a POLI-UPE, validamos nossas soluções de engenharia aeroestrutural iniciais sob condições técnicas rigorosas, consolidando nossa base acadêmica e de desenvolvimento.',
    colocacao: ['6º Lugar Nacional', '1º Lugar Apresentação Oral', '2º Lugar Relatório Técnico'],
    imagens: [
      imgSAE20251,
      imgSAE20252,
      imgSAE20253,
      imgSAE20254,
      imgSAE20255,
      imgSAE20256,
      imgSAE20257,
    ],
    fichaMissao: {
      objetivo: 'Validar as soluções desenvolvidas no cenário competitivo nacional.',
      destaque: 'Apresentação técnica oral de alta pontuação.',
      tecnologia: 'Pixhawk 2.4.8 / Dronekit / Visão Computacional Clássica',
    },
  },
  {
    nome: 'Eletroquad SAE Brasil 2026',
    ano: '2026',
    descricao:
      "A Delta V demonstrou maturidade técnica com o Logan operando 100% autônomo. Completamos 2 missões e fomos a única equipe do Brasil a concluir o desafio de desacoplar o gancho com sucesso na missão 'Hang The Right Wire', projetando a POLI-UPE no topo do cenário nacional.",
    colocacao: [
      '4º Lugar Nacional',
      '1º Lugar Relatório Técnico',
      'Menção Honrosa: Hang the Right Wire',
    ],
    imagens: [
      imgSAE20261,
      imgSAE20262,
      imgSAE20263,
      imgSAE20264,
      imgSAE20265,
      imgSAE20266,
      imgSAE20267,
    ],
    fichaMissao: {
      objetivo: 'Navegação 100% autônoma embarcada com tomada de decisão.',
      destaque: 'Única equipe do Brasil a prender o gancho na fiação correta no desafio.',
      tecnologia: 'YOLO + Visão Clássica / RPI 5 / Pixhawk 6C PRO.',
    },
  },
  {
    nome: 'Eletroquad SAE Brasil 2027',
    ano: '2027',
    descricao:
      'Evoluímos nossos sistemas com base na experiência das edições passadas. Focamos no desenvolvimento da inteligência de navegação ativa otimizada para levar um protótipo robusto e competitivo, mirando as primeiras colocações do pódio.',
    colocacao: 'Participação Futura',
    imagens: [imgSuspense],
    fichaMissao: {
      objetivo: '---',
      destaque: '---',
      tecnologia: '---',
    },
  },
];

const DroneIcon = () => (
  <svg viewBox="0 0 64 64" className="drone-svg" width="36" height="36" fill="currentColor">
    <line
      x1="16"
      y1="16"
      x2="48"
      y2="48"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <line
      x1="48"
      y1="16"
      x2="16"
      y2="48"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />

    <circle cx="32" cy="32" r="8" fill="currentColor" />
    <circle cx="32" cy="32" r="5" fill="#ffffff" />

    <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2" fill="#ffffff" />
    <line x1="10" y1="16" x2="22" y2="16" stroke="currentColor" strokeWidth="2" />

    <circle cx="48" cy="16" r="6" stroke="currentColor" strokeWidth="2" fill="#ffffff" />
    <line x1="42" y1="16" x2="54" y2="16" stroke="currentColor" strokeWidth="2" />

    <circle cx="16" cy="48" r="6" stroke="currentColor" strokeWidth="2" fill="#ffffff" />
    <line x1="10" y1="48" x2="22" y2="48" stroke="currentColor" strokeWidth="2" />

    <circle cx="48" cy="48" r="6" stroke="currentColor" strokeWidth="2" fill="#ffffff" />
    <line x1="42" y1="48" x2="54" y2="48" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ImageSlider = ({ imagens, isActive }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);
  const minSwipeDistance = 50;

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagens.length);
  }, [imagens.length]);

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imagens.length) % imagens.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isActive && imagens.length > 1) {
      resetTimer();
      timerRef.current = setTimeout(nextImage, 5000);
    }
    return () => resetTimer();
  }, [currentIndex, isActive, imagens.length, nextImage]);

  const handleUserInteraction = (action) => {
    resetTimer();
    action();
  };

  const onTouchStart = (e) => {
    touchEndRef.current = null;
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const distance = touchStartRef.current - touchEndRef.current;

    if (distance > minSwipeDistance) {
      handleUserInteraction(nextImage);
    } else if (distance < -minSwipeDistance) {
      handleUserInteraction(prevImage);
    }

    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  return (
    <div
      className="card-image-slider"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {imagens.map((imagem, index) => (
        <img
          key={index}
          src={imagem}
          alt={`Competição imagem ${index + 1}`}
          className={`slider-image ${index === currentIndex ? 'active' : ''}`}
          loading="lazy"
          decoding="async"
        />
      ))}
      {imagens.length > 1 && (
        <>
          <button
            className="image-slider-arrow left"
            onClick={() => handleUserInteraction(prevImage)}
            aria-label="Imagem anterior"
          >
            ‹
          </button>
          <button
            className="image-slider-arrow right"
            onClick={() => handleUserInteraction(nextImage)}
            aria-label="Próxima imagem"
          >
            ›
          </button>
          <div className="image-slider-dots">
            {imagens.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleUserInteraction(() => goToImage(index))}
              ></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const getColocacaoClass = (colocacao) => {
  if (typeof colocacao !== 'string') return 'badge-standard';
  const text = colocacao.toLowerCase();
  if (text.includes('1º') || text.includes('primeiro')) return 'badge-gold';
  if (
    text.includes('2º') ||
    text.includes('segundo') ||
    text.includes('menção') ||
    text.includes('mencao')
  )
    return 'badge-silver';
  if (text.includes('participação') || text.includes('futura')) return 'badge-future';
  return 'badge-bronze';
};

const getColocacaoIcon = (colocacao) => {
  if (typeof colocacao !== 'string') return '';
  const text = colocacao.toLowerCase();
  if (text.includes('1º') || text.includes('primeiro')) return '🏆 ';
  if (text.includes('2º') || text.includes('segundo')) return '🥈 ';
  if (text.includes('menção') || text.includes('mencao')) return '🎖️ ';
  if (text.includes('participação') || text.includes('futura')) return '⏳ ';
  return '🥉 ';
};

const Competicoes = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState('none');
  const [isFlying, setIsFlying] = useState(false);
  const dragStartX = useRef(null);
  const dragMinDistance = 100;

  const handleContactClick = (e) => {
    handleAnimationAndAction(e, () => navigate('/contato'));
  };

  const goToSlide = (index) => {
    if (index === activeSlide || index < 0 || index >= competicoes.length) return;
    setDirection(index > activeSlide ? 'right' : 'left');
    setIsFlying(true);
    setActiveSlide(index);
  };

  useEffect(() => {
    if (isFlying) {
      const timer = setTimeout(() => {
        setIsFlying(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [activeSlide, isFlying]);

  const handlePrev = () => {
    if (activeSlide > 0) goToSlide(activeSlide - 1);
  };

  const handleNext = () => {
    if (activeSlide < competicoes.length - 1) goToSlide(activeSlide + 1);
  };

  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 75) {
      handleNext();
    } else if (diff < -75) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (dragStartX.current === null) return;
    const dragEndX = e.clientX;
    const diff = dragStartX.current - dragEndX;

    if (diff > dragMinDistance) {
      handleNext();
    } else if (diff < -dragMinDistance) {
      handlePrev();
    }
    dragStartX.current = null;
  };

  const handleMouseLeave = () => {
    dragStartX.current = null;
  };

  return (
    <section className="competicoes-section">
      <div className="competicoes-container">
        <div className="competicoes-header">
          <h1 className="competicoes-title">Nossa Jornada em Competições</h1>
          <div className="title-underline"></div>
          <p className="competicoes-subtitle">
            É no campo de provas que nosso conhecimento decola. Enfrentamos os maiores desafios da
            engenharia nacional para testar nossos limites, inovar e representar Pernambuco.
          </p>
        </div>

        <div className="drone-flight-navigator-container">
          <div className="flight-path-line"></div>

          <div
            className={`flying-drone-wrapper ${isFlying ? (direction === 'right' ? 'flying-right' : 'flying-left') : ''}`}
            style={{ left: `${(activeSlide / (competicoes.length - 1)) * 100}%` }}
          >
            <DroneIcon />
            <div className="drone-prop-glow"></div>
          </div>

          <div className="flight-nodes">
            {competicoes.map((comp, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`flight-node ${idx === activeSlide ? 'active' : ''}`}
              >
                <span className="node-dot"></span>
                <span className="node-label">{comp.ano}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          className="competicoes-slider-viewport"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="competicoes-slider-track"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {competicoes.map((competicao, index) => {
              const isFuture = competicao.ano === '2027';

              return (
                <div key={index} className="competicoes-slide-item">
                  <div className={`timeline-card ${isFuture ? 'future-item-card' : ''}`}>
                    <div className="card-imagem-wrapper">
                      <ImageSlider imagens={competicao.imagens} isActive={index === activeSlide} />
                    </div>
                    <div className="card-info">
                      <div className="card-header-row">
                        <span className="card-ano-capsule">{competicao.ano}</span>
                        <h2 className="card-nome">{competicao.nome}</h2>
                      </div>

                      <div className="card-colocacoes-container">
                        {Array.isArray(competicao.colocacao) ? (
                          competicao.colocacao.map((item, idx) => (
                            <span
                              key={idx}
                              className={`card-colocacao-premium ${getColocacaoClass(item)}`}
                            >
                              {getColocacaoIcon(item)}
                              {item}
                            </span>
                          ))
                        ) : (
                          <span
                            className={`card-colocacao-premium ${getColocacaoClass(competicao.colocacao)}`}
                          >
                            {getColocacaoIcon(competicao.colocacao)}
                            {competicao.colocacao}
                          </span>
                        )}
                      </div>

                      <p className="card-descricao">{competicao.descricao}</p>

                      <div className="card-specs-grid">
                        <div className="spec-block">
                          <span className="spec-label">Objetivo da Missão</span>
                          <span className="spec-val">{competicao.fichaMissao.objetivo}</span>
                        </div>
                        <div className="spec-block">
                          <span className="spec-label">Destaque Operacional</span>
                          <span className="spec-val">{competicao.fichaMissao.destaque}</span>
                        </div>
                        <div className="spec-block">
                          <span className="spec-label">Hardware & Software</span>
                          <span className="spec-val">{competicao.fichaMissao.tecnologia}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {activeSlide > 0 && (
            <button
              className="slider-nav-btn left"
              onClick={handlePrev}
              aria-label="Slide anterior"
            >
              ‹
            </button>
          )}
          {activeSlide < competicoes.length - 1 && (
            <button
              className="slider-nav-btn right"
              onClick={handleNext}
              aria-label="Próximo slide"
            >
              ›
            </button>
          )}
        </div>

        <div className="global-cta-dark">
          <div className="cta-glow"></div>
          <h2 className="cta-title">Apoie nossa equipe na próxima competição!</h2>
          <p className="cta-desc">
            Sua marca pode voar conosco. Fale com a gente e saiba como sua marca pode fazer parte
            dessa jornada.
          </p>
          <button onClick={handleContactClick} className="cta-button-glow">
            <span className="button-text">Seja um Patrocinador</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Competicoes;
