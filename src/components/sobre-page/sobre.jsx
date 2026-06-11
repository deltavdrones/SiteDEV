import './sobre.css';

import React, { useState } from 'react';

//import fluxogramaImage from '../../assets/sobre-page/fluxograma.webp';
import amanda from '../../assets/sobre-page/membros/amanda.webp';
import angel from '../../assets/sobre-page/membros/angel.webp';
import benny from '../../assets/sobre-page/membros/benny.webp';
import carol from '../../assets/sobre-page/membros/carol.webp';
import danielle from '../../assets/sobre-page/membros/danielle.webp';
import eliton from '../../assets/sobre-page/membros/eliton.webp';
import george from '../../assets/sobre-page/membros/george.webp';
import gilvan from '../../assets/sobre-page/membros/gilvan.webp';
import isabella from '../../assets/sobre-page/membros/isabella.webp';
import jp from '../../assets/sobre-page/membros/jp.webp';
import leonardo from '../../assets/sobre-page/membros/leonardo.webp';
import luana from '../../assets/sobre-page/membros/luana.webp';
import lucas from '../../assets/sobre-page/membros/lucas.webp';
import pedro from '../../assets/sobre-page/membros/pedro.webp';
import soares from '../../assets/sobre-page/membros/soares.webp';
import victor from '../../assets/sobre-page/membros/victor.webp';
import teamImage from '../../assets/sobre-page/sobre.webp';

const teamMembers = [
  // Orientação e Capitania
  { name: 'George Azevedo', role: 'Orientador', photo: george, depts: ['lideranca'] },
  { name: 'Angel Ayala', role: 'Coorientador', photo: angel, depts: ['lideranca'] },
  { name: 'Carolyne Almeida', role: 'Capitã', photo: carol, depts: ['lideranca'] },
  { name: 'Eliton Sena', role: 'Líder Operacional', photo: eliton, depts: ['lideranca'] },

  // Software e Navegação (e subsetores)
  {
    name: 'Ana Beatriz',
    role: 'Líder de Software & Navegação',
    photo: benny,
    depts: ['software'],
  },
  {
    name: 'Danielle Stephany',
    role: 'Líder de Visão Computacional',
    photo: danielle,
    depts: ['visao'],
  },
  {
    name: 'Isabella Vitória ',
    role: 'Membro de Visão Computacional',
    photo: isabella,
    depts: ['visao'],
  },
  {
    name: 'Pedro Gabriel',
    role: 'Líder de Controle',
    photo: pedro,
    depts: ['controle'],
  },
  {
    name: 'Leonardo Henrique',
    role: 'Membro de Controle',
    photo: leonardo,
    depts: ['controle'],
  },

  // Sistemas e Sensores
  {
    name: 'Gilvan Neto',
    role: 'Líder de Sistemas e Sensores',
    photo: gilvan,
    depts: ['sistemas'],
  },
  {
    name: 'Luana Almeida',
    role: 'Membro de Sistemas e Sensores\n Membro de Controle',
    photo: luana,
    depts: ['sistemas', 'controle'],
  },
  {
    name: 'Lucas Chaves',
    role: 'Membro de Sistemas e Sensores',
    photo: lucas,
    depts: ['sistemas'],
  },
  {
    name: 'Victor Pinheiro',
    role: 'Membro de Sistemas e Sensores',
    photo: victor,
    depts: ['sistemas'],
  },

  // Estrutura e Desempenho
  {
    name: 'João Pedro',
    role: 'Líder de Estrutura e Desempenho',
    photo: jp,
    depts: ['estruturas'],
  },
  {
    name: 'Arthur Soares',
    role: 'Membro de Estrutura e Desempenho',
    photo: soares,
    depts: ['estruturas'],
  },

  // Marketing
  { name: 'Amanda Gabriellen', role: 'Líder de Marketing', photo: amanda, depts: ['marketing'] },
];

const departments = [
  { id: 'all', name: 'Todos' },
  { id: 'lideranca', name: 'Orientação & Capitania' },
  { id: 'estruturas', name: 'Estrutura & Desempenho' },
  { id: 'sistemas', name: 'Sistemas & Sensores' },
  { id: 'software', name: 'Software & Navegação' },
  { id: 'marketing', name: 'Marketing' },
];

const subDepartments = {
  software: [
    { id: 'controle', name: 'Controle' },
    { id: 'visao', name: 'Visão Computacional' },
    //{ id: 'planejamento', name: 'Planejamento de Rota' },
    //{ id: 'mapeamento', name: 'Mapeamento e Localização' },
  ],
};

const Sobre = () => {
  const [selectedDept, setSelectedDept] = useState('all');

  const filteredMembers =
    selectedDept === 'all'
      ? teamMembers
      : teamMembers.filter((member) => member.depts.includes(selectedDept));

  return (
    <section className="sobre-section">
      <div className="sobre-container">
        <div className="sobre-intro-grid">
          <div className="sobre-text-content">
            <h1 className="sobre-title">NOSSA HISTÓRIA</h1>
            <p className="sobre-description">
              A DeltaV Drones é um projeto de extensão universitária pela Universidade de
              Pernambuco. Formada por estudantes de graduação em Engenharia, o principal desafio é o
              desenvolvimento de soluções de ponta para drones autônomos, visando a inovação e o
              aprendizado prático no campo da robótica e inteligência artificial.
            </p>
            <p className="sobre-description">
              Acreditamos no poder da colaboração para transformar teoria em realidade e inspirar a
              próxima geração de engenheiros e cientistas. A equipe conta com pessoas apaixonadas
              por tecnologia e multidisciplinaridade.
            </p>
          </div>
          <div className="sobre-image-wrapper">
            <img
              src={teamImage}
              alt="Equipe DeltaV"
              className="sobre-image"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        {/* TODO: Atualizar a estrutura da equipe no draw.io e colocar o fluxograma atualizado aqui
        <div id="estrutura" className="team-structure-section">
          <h2 className="structure-title">ESTRUTURA DA EQUIPE</h2>
          <div className="flowchart-container">
            <img
              src={fluxogramaImage}
              alt="Fluxograma da equipe DeltaV"
              className="flowchart-image"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        */}
        <div className="team-members-section">
          <h2 className="members-title">CONHEÇA NOSSOS MEMBROS</h2>

          <div className="dept-filter-container">
            {departments.map((dept) => {
              const isMainActive = selectedDept === dept.id;
              const isSubActive = subDepartments[dept.id]?.some((sub) => sub.id === selectedDept);

              return (
                <button
                  key={dept.id}
                  className={`dept-filter-btn ${isMainActive || isSubActive ? 'active' : ''}`}
                  onClick={() => setSelectedDept(dept.id)}
                >
                  {dept.name}
                </button>
              );
            })}
          </div>

          {(selectedDept === 'software' ||
            subDepartments['software'].some((sub) => sub.id === selectedDept)) && (
            <div className="dept-filter-container sub-dept-container">
              {subDepartments['software'].map((sub) => (
                <button
                  key={sub.id}
                  className={`dept-filter-btn sub-dept-filter-btn ${selectedDept === sub.id ? 'active' : ''}`}
                  onClick={() => setSelectedDept(sub.id)}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}

          <div className="members-grid">
            {filteredMembers.map((member) => (
              <div key={member.name} className="member-card fade-in">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={`Foto de ${member.name}`}
                    className="member-photo"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="member-photo-placeholder"></div>
                )}
                <h3 className="member-name">{member.name}</h3>
                <div className="member-role">
                  {member.role.split('\n').map((line, i, arr) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sobre;
