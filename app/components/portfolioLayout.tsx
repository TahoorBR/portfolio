"use client";

import styled, { keyframes } from "styled-components";
import Chatbot from "./chatbot";
import Experience from "./experience";
import { useState, useEffect, useRef } from "react";
import { FiMail } from "react-icons/fi";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import BackgroundParticles from "./backgroundParticles";
import Projects from "./projects";
import Skills from "./skills";
import Certs from "./certs";
import AboutMe from "./aboutMe";

const Container = styled.main`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  padding: 3rem 3rem;
  height: 85vh;
  max-width: 1200px;
  margin: 3rem auto 3rem auto;
  background: linear-gradient(135deg, #0b1216, #142024);
  border-radius: 28px;
  box-shadow:
    0 8px 30px rgba(1, 53, 48, 0.6),
    inset 0 0 80px rgba(1, 53, 48, 0.5);
  color: #cde4e3;
  font-family: 'Bebas Neue', cursive;
  user-select: none;
`;

const GlassCard = styled.section`
  background: rgba(1, 53, 48, 0.15);
  border-radius: 24px;
  box-shadow:
    0 8px 32px rgba(0, 107, 95, 0.3),
    inset 0 0 60px rgba(1, 53, 48, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1.5px solid rgba(0, 107, 95, 0.65);
  padding: 2rem 2.5rem;
  color: #cde4e3;
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
`;

const LeftCard = styled(GlassCard)`
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: space-between;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Name = styled.h2`
  font-size: 2rem;
  color: #00c8b8;
  margin: 0;
`;

const Role = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

const Location = styled.p`
  font-size: 1rem;
  color: #a0f0e0;
  margin: 0;
`;

const Education = styled.p`
  font-size: 0.95rem;
  color: #a0f0e0;
  margin: 0;
`;

const Bio = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-top: 0.5rem;
`;

const LinksGlassCard = styled(GlassCard)`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.6rem 1.5rem;
  display: flex;
  gap: 1.5rem;
  z-index: 100;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: rgba(1, 53, 48, 0.25);
  border-radius: 18px;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1.5px solid rgba(0, 107, 95, 0.65);
`;

const LinkButton = styled.a<{ platform?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #007663;
  color: #cde4e3;
  font-size: 1.5rem;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 0 8px #007663;

  &:hover {
    transform: scale(1.25);
    ${(props) => {
      switch (props.platform) {
        case "email":
          return `
            background: #f44336;
            color: #fff;
            box-shadow: 0 0 16px #f44336, 0 0 32px #f44336;
          `;
        case "linkedin":
          return `
            background: #0077b5;
            color: #fff;
            box-shadow: 0 0 16px #0077b5, 0 0 32px #0077b5;
          `;
        case "github":
          return `
            background: #24292f;
            color: #fff;
            box-shadow: 0 0 16px #24292f, 0 0 32px #24292f;
          `;
        case "upwork":
          return `
            background: #6fda44;
            color: #111;
            box-shadow: 0 0 16px #6fda44, 0 0 32px #6fda44;
          `;
        default:
          return `
            background: #00c8b8;
            color: #111;
            box-shadow: 0 0 16px #00c8b8, 0 0 32px #00c8b8;
          `;
      }
    }}
  }
`;




const Spacer = styled.div`
  flex-grow: 1;
`;

const RightCard = styled(GlassCard)`
  flex: 0 0 60%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const PageSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.button<{ $active?: boolean }>`
  font-family: 'Bebas Neue', cursive;
  background: transparent;
  border: 2px solid ${({ $active }) => ($active ? "#00c8b8" : "#007663")};
  color: ${({ $active }) => ($active ? "#00c8b8" : "#007663")};
  padding: 0.2rem 0.8rem;
  font-size: 1.1rem;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.25s ease;
  user-select: none;

  &:hover {
    background: #007663;
    color: #cde4e3;
    border-color: #00c8b8;
  }
`;

const Section = styled.section<{ $offsetY: number }>`
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 2rem 1rem;
  border-radius: 20px;
  color: #b6d7d1;
  transform: translateY(${(props) => props.$offsetY * 0.3}px);
  transition: transform 0.2s ease;

  h2 {
    font-family: 'Bebas Neue', cursive;
    font-weight: 700;
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #00c8b8;
    text-shadow: 0 0 12px #007663;
  }
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: #007663 transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #007663;
    border-radius: 10px;
    border: 2px solid transparent;
  }
`;

export default function PortfolioLayout() {
  const [page, setPage] = useState<"experience" | "projects" | "skills" | "certs" | "aboutMe">("experience");
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    if (scrollRef.current) {
      setScrollOffset(scrollRef.current.scrollTop);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", onScroll);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", onScroll);
      }
    };
  }, []);

  const renderSection = () => {
    switch (page) {
      case "experience":
        return (
          <Section $offsetY={scrollOffset} key="experience">
            <Experience />
          </Section>
        );
        case "projects":
        return (
            <Section $offsetY={scrollOffset} key="projects">
            <Projects />
            </Section>
        );
        case "skills":
        return (
            <Section $offsetY={scrollOffset} key="skills">
            <Skills />
            </Section>
        );
        case "certs":
        return (
            <Section $offsetY={scrollOffset} key="certs">
            <Certs />
            </Section>
        );
      case "aboutMe":
        return (
          <Section $offsetY={scrollOffset} key="aboutMe">
            <AboutMe/>
          </Section>
        );
      default:
        return null;
    }
  };

  return (
    <>
    <BackgroundParticles />
    <Container>
      <LeftCard>
        <InfoContainer>
          <Name>Muhammad Tahoor Bin Rauf</Name>
          <Role>AI Engineer</Role>
          <Location>Islamabad, Pakistan</Location>
          <Education>BSc Artificial Intelligence</Education>
          <Bio>
            AI engineer with hands-on experience in model development and deep learning,
            actively building expertise in Generative AI, Langchain, Agentic AI, and Computer Vision.
            Passionate about intelligent systems leveraging LLMs, AI agents, and emerging AI tech.
          </Bio>
        </InfoContainer>

        <Spacer />
        <Chatbot />
      </LeftCard>

      <RightCard>
        <PageSelector>
          {["experience", "projects", "skills", "certs", "aboutMe"].map((p) => (
            <Button
              key={p}
              $active={page === p}
              onClick={() => {
                setPage(p as any);
                if (scrollRef.current) scrollRef.current.scrollTop = 0;
              }}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Button>
          ))}
        </PageSelector>

        <ScrollArea ref={scrollRef}>
          {renderSection()}
        </ScrollArea>
      </RightCard>

        <LinksGlassCard>
            <LinkButton platform="email" href="mailto:mtahoorbinrauf@gmail.com" target="_blank">
                <FiMail />
            </LinkButton>
            <LinkButton platform="linkedin" href="https://linkedin.com/in/m-tahoor-bin-rauf" target="_blank">
                <FaLinkedinIn />
            </LinkButton>
            <LinkButton platform="github" href="https://github.com/tahoorbr" target="_blank">
                <FaGithub />
            </LinkButton>
            <LinkButton platform="upwork" href="https://www.upwork.com/freelancers/~01f6079a84857bdd7f?" target="_blank">
                <SiUpwork />
            </LinkButton>
        </LinksGlassCard>

    </Container>
    </>

  );
}
