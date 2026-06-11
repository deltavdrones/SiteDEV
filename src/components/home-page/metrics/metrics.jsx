import './metrics.css';

import { useEffect, useState } from 'react';

import imgAutonomo from '../../../assets/home-page/metrics/autonomo.webp';
import imgM2 from '../../../assets/home-page/metrics/m2.webp';
import imgPodio from '../../../assets/home-page/metrics/podio.webp';
import imgRelatorio from '../../../assets/home-page/metrics/relatorio.webp';

const metricsData = [
  {
    number: '4º',
    title: 'Lugar Geral Nacional',
    subtitle: 'Entre as 27 equipes participantes de todo o Brasil',
    mediaType: 'image',
    mediaUrl: imgPodio,
    hoverImage: imgPodio,
    mediaCaption:
      'Nossa equipe celebrando o 4º Lugar Geral Nacional na Eletroquad SAE Brasil 2026!',
  },
  {
    number: '100%',
    title: 'Voo Autônomo',
    subtitle: 'Tomada de decisão embarcada no Projeto Logan',
    mediaType: 'image',
    mediaUrl: imgAutonomo,
    hoverImage: imgAutonomo,
    mediaCaption:
      'Visão do drone em um voo autônomo com tomada de decisão computacional embarcada.',
  },
  {
    number: '1º',
    title: 'Relatório Técnico',
    subtitle: 'Desenvolvido inteiramente pelos membros da equipe',
    mediaType: 'image',
    mediaUrl: imgRelatorio,
    hoverImage: imgRelatorio,
    mediaCaption:
      'Nosso relatório técnico oficial avaliado pelos juízes da comissão técnica e premiado em 1º lugar nacional.',
  },
  {
    number: 'Único',
    title: 'Time do Brasil',
    subtitle: "A concluir o desafio 'Hang The Right Wire' proposto pela Axia Energia",
    mediaType: 'image',
    mediaUrl: imgM2,
    hoverImage: imgM2,
    mediaCaption:
      'Nosso drone Logan realizando a missão Hang The Right Wire proposta pela Axia Energia.',
  },
];

const Metrics = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const openLightbox = (metric) => {
    if (metric.mediaUrl) {
      setSelectedMedia(metric);
    }
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    if (selectedMedia) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMedia]);

  return (
    <section className="metrics-section">
      <div className="metrics-container">
        <div className="metrics-header">
          <span className="metrics-tag">Resultados que Comprovam</span>
          <h2 className="metrics-main-title">NOSSO IMPACTO EM NÚMEROS</h2>
          <p className="metrics-source-text">
            Conquistas obtidas durante a competição nacional{' '}
            <strong>Eletroquad Axia Energia SAE Brasil 2026</strong>.
          </p>
        </div>
        <div className="metrics-grid">
          {metricsData.map((metric, index) => (
            <div
              key={index}
              className={`metric-card card-highlighted ${metric.mediaUrl ? 'has-media' : ''}`}
              onClick={() => openLightbox(metric)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(metric);
                }
              }}
              aria-label={`Ver mídia para ${metric.title}`}
            >
              {metric.hoverImage && (
                <div
                  className="metric-hover-bg"
                  style={{ backgroundImage: `url(${metric.hoverImage})` }}
                />
              )}

              <div className="metric-card-content">
                <div className="metric-number-wrapper">
                  <span className="metric-number">{metric.number}</span>
                </div>
                <h3 className="metric-title">{metric.title}</h3>
                <p className="metric-subtitle">{metric.subtitle}</p>

                {metric.mediaUrl && (
                  <div className="metric-card-footer">
                    <span className="footer-action-text">Clique para ver</span>
                    <span className="footer-action-icon">→</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMedia && (
        <div className="metrics-lightbox-overlay" onClick={closeLightbox}>
          <div className="metrics-lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="metrics-lightbox-close"
              onClick={closeLightbox}
              aria-label="Fechar modal"
            >
              &times;
            </button>
            <div className="metrics-lightbox-content">
              {selectedMedia.mediaType === 'video' ? (
                <div className="video-player-wrapper">
                  <video
                    className="metrics-lightbox-video"
                    src={selectedMedia.mediaUrl}
                    controls
                    autoPlay
                    playsInline
                  />
                </div>
              ) : (
                <div className="image-viewer-wrapper">
                  <img
                    className="metrics-lightbox-image"
                    src={selectedMedia.mediaUrl}
                    alt={selectedMedia.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
              <div className="metrics-lightbox-caption">
                <span className="lightbox-caption-tag">
                  {selectedMedia.number} {selectedMedia.title}
                </span>
                <p className="lightbox-caption-text">{selectedMedia.mediaCaption}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Metrics;
