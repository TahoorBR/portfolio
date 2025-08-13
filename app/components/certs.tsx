/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React from "react";
import styled from "styled-components";
import certsData from "../data/certs.json";

// TypeScript interfaces
interface Education {
  institution: string;
  degree: string;
  cgpa?: string;
  duration: string;
}

interface Certification {
  title: string;
  issuer: string;
  year?: string;
}

interface CertsData {
  education: Education[];
  certifications: Certification[];
  awards: string[];
}

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Bebas Neue', cursive;
  font-size: 2rem;
  color: #00c8b8;
  margin-bottom: 1rem;
`;

const Card = styled.div`
  background: rgba(1, 53, 48, 0.15);
  border-radius: 15px;
  padding: 1rem 1.5rem;
  border: 1px solid rgba(0, 107, 95, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

const ItemTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.3rem 0;
  color: #00c8b8;
`;

const ItemSubtitle = styled.p`
  margin: 0.2rem 0;
  color: #cde4e3;
  font-size: 0.95rem;
`;

export default function Certs() {
  const data = certsData as unknown as CertsData;

  return (
    <Container>
      <div>
        <SectionTitle>Education</SectionTitle>
        {data.education.map((edu, index) => (
          <Card key={index}>
            <ItemTitle>{edu.institution}</ItemTitle>
            <ItemSubtitle>{edu.degree} {edu.cgpa && `— CGPA: ${edu.cgpa}`}</ItemSubtitle>
            <ItemSubtitle>{edu.duration}</ItemSubtitle>
          </Card>
        ))}
      </div>

      <div>
        <SectionTitle>Certifications</SectionTitle>
        {data.certifications.map((cert, index) => (
          <Card key={index}>
            <ItemTitle>{cert.title}</ItemTitle>
            <ItemSubtitle>{cert.issuer}{cert.year && ` — ${cert.year}`}</ItemSubtitle>
          </Card>
        ))}
      </div>

      <div>
        <SectionTitle>Awards</SectionTitle>
        {data.awards.map((award, index) => (
          <Card key={index}>
            <ItemTitle>{award}</ItemTitle>
          </Card>
        ))}
      </div>
    </Container>
  );
}
