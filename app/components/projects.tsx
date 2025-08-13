/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React from "react";
import styled from "styled-components";
import projectsData from "../data/projects.json";

// Container for all projects
const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
`;

// Single project card
const ProjectCard = styled.div`
  background: rgba(1, 53, 48, 0.2);
  border-radius: 16px;
  padding: 1rem 1.5rem;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 107, 95, 0.5);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(0, 200, 184, 0.5);
  }
`;

// Project title
const Title = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #00c8b8;
`;

// Tech stack
const Tech = styled.p`
  margin: 0;
  font-size: 0.95rem;
  font-style: italic;
  color: #66b2aa;
`;

// Description
const Description = styled.p`
  font-size: 1rem;
  line-height: 1.4;
  color: #b6d7d1;
`;

// Links container
const Links = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 0.8rem;
`;

// Link button
const LinkButton = styled.a`
  text-decoration: none;
  color: #00c8b8;
  font-weight: 600;
  transition: all 0.25s ease;

  &:hover {
    color: #cde4e3;
    text-shadow: 0 0 8px #00c8b8;
  }
`;

// Optional project image
const ProjectImage = styled.img`
  margin-top: 0.5rem;
  border-radius: 12px;
  max-width: 100%;
  height: auto;
`;

export default function Projects() {
  return (
    <ProjectsList>
      {projectsData.map((project) => (
        <ProjectCard key={project.id}>
          <Title>{project.title}</Title>
          <Tech>{project.tech}</Tech>
          <Description>{project.description}</Description>
          {project.link && (
            <Links>
              <LinkButton href={project.link} target="_blank">
                View Project
              </LinkButton>
            </Links>
          )}
          {project.image && <ProjectImage src={project.image} alt={project.title} />}
        </ProjectCard>
      ))}
    </ProjectsList>
  );
}
