/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React from "react";
import styled from "styled-components";
import aboutMeData from "../data/aboutMe.json";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  max-width: 800px;
  margin: auto;
`;


const Title = styled.h2`
  font-size: 1.5rem;
  color: #cde4e3;
  font-weight: normal;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  color: #e0f7f4;
  line-height: 1.6;
`;

const ContactLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  a {
    color: #00c8b8;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function AboutMe() {
  const data = aboutMeData;

  return (
    <Container>
      <Title>{data.title}</Title>
      <Paragraph>{data.summary}</Paragraph>
      <Paragraph>{data.focus}</Paragraph>
      <Paragraph>{data.hobbies}</Paragraph>

      <ContactLinks>
        <a href={`mailto:${data.contact.email}`}>Email</a>
        <a href={data.contact.linkedin} target="_blank">LinkedIn</a>
        <a href={data.contact.github} target="_blank">GitHub</a>
        <a href={`tel:${data.contact.phone}`}>Phone</a>
      </ContactLinks>
    </Container>
  );
}
