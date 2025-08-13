/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React from "react";
import styled from "styled-components";
import experienceData from "../data/experience.json";

// Grouping container
const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
`;

// Company card container
const CompanyCard = styled.div`
  position: relative;
  padding-left: 2rem;
  border-left: 2px dotted #00c8b8;
  margin-left: 1rem;
`;

// Single job node
const JobNode = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isLast",
})<{ isLast?: boolean }>`
  position: relative;
  padding: 0.8rem 0 0.8rem 1rem;
  margin-left: 0.5rem;

  &:before {
    content: '';
    position: absolute;
    left: -1.35rem;
    top: 0.8rem;
    width: 0.6rem;
    height: 0.6rem;
    background: #00c8b8;
    border-radius: 50%;
  }
`;


// Role title
const Role = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #00c8b8;
`;

// Company name
const Company = styled.h4`
  margin: 0.2rem 0;
  font-weight: 600;
  font-style: italic;
  color: #cde4e3;
`;

// Duration
const Duration = styled.p`
  font-size: 0.9rem;
  color: #66b2aa;
  margin: 0.2rem 0 0.5rem 0;
`;

// Description
const Description = styled.p`
  font-size: 1rem;
  line-height: 1.4;
  color: #b6d7d1;
`;

export default function Experience() {
  // Group experience by company
  const grouped = experienceData.reduce((acc: any, item) => {
    if (!acc[item.company]) acc[item.company] = [];
    acc[item.company].push(item);
    return acc;
  }, {});

  return (
    <ExperienceList>
      {Object.entries(grouped).map(([companyName, jobs]: any) => (
        <CompanyCard key={companyName}>
          <Company>{companyName}</Company>
          {jobs.map((job: any, idx: number) => (
            <JobNode key={job.id} isLast={idx === jobs.length - 1}>
              <Role>{job.role}</Role>
              <Duration>
                {job.startDate} — {job.endDate} ({job.location})
              </Duration>
              <Description>{job.description}</Description>
            </JobNode>
          ))}
        </CompanyCard>
      ))}
    </ExperienceList>
  );
}
