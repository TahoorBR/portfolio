/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useMemo } from "react";
import styled from "styled-components";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

import skillsData from "../data/skills.json";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const CategoryTitle = styled.h3`
  font-family: 'Bebas Neue', cursive;
  font-size: 1.8rem;
  color: #00c8b8;
  text-align: center;
  margin-bottom: 1rem;
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 420px;
  max-height: 420px;
  background: rgba(1, 53, 48, 0.15);
  border-radius: 20px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 107, 95, 0.5);
`;

const ChartContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 300px;
  @media (max-width: 480px) {
    height: 250px;
  }
`;

function balanceSkills(skills: Skill[], targetCount = 5): Skill[] {
  if (skills.length >= targetCount) return skills;
  const lastLevel = skills[skills.length - 1]?.level || 70;
  const missing = targetCount - skills.length;
  return [
    ...skills,
    ...Array(missing)
      .fill(null)
      .map((_, i) => ({ name: `Extra Skill ${i + 1}`, level: lastLevel })),
  ];
}

export default function Skills() {
  const balancedData: SkillCategory[] = useMemo(
    () =>
      (skillsData as SkillCategory[]).map((category) => ({
        ...category,
        skills: balanceSkills(category.skills),
      })),
    []
  );

  // Plugin to draw values at each point
// Plugin to draw values at each point without overlapping the labels
const drawPointValuesPlugin = {
  id: 'drawPointValues',
  afterDatasetsDraw(chart: any) {
    const ctx = chart.ctx;
    const meta = chart.getDatasetMeta(0);
    const centerY = chart.chartArea.top + chart.chartArea.height / 2;
    const centerX = chart.chartArea.left + chart.chartArea.width / 2;

    meta.data.forEach((point: any, index: number) => {
      const value = chart.data.datasets[0].data[index];
      const angle = Math.atan2(point.y - centerY, point.x - centerX);

      ctx.save();
      ctx.fillStyle = '#00c8b8';
      ctx.font = 'bold 11px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Push the label outwards from the point based on its angle
      const offset = 14; 
      const x = point.x + offset * Math.cos(angle);
      const y = point.y + offset * Math.sin(angle);

      ctx.fillText(value, x, y);
      ctx.restore();
    });
  },
};

  return (
    <SkillsContainer>
      {balancedData.map((category) => {
        const data = {
          labels: category.skills.map((s: Skill) => s.name),
          datasets: [
            {
              label: category.category,
              data: category.skills.map((s: Skill) => s.level),
              backgroundColor: "rgba(0, 200, 184, 0.3)",
              borderColor: "#00c8b8",
              borderWidth: 2,
              pointBackgroundColor: "#00c8b8",
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "#00c8b8",
            },
          ],
        };

        const options: ChartOptions<"radar"> = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              min: 0,
              max: 100,
              ticks: { display: false }, // remove the 20/40/60/80/100 ticks
              grid: { color: "rgba(0, 200, 184, 0.15)" },
              angleLines: { color: "rgba(0, 200, 184, 0.25)" },
              pointLabels: { color: "#cde4e3", font: { size: 11 } },
            },
          },
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
          },
        };

        return (
          <ChartWrapper key={category.category}>
            <CategoryTitle>{category.category}</CategoryTitle>
            <ChartContainer>
              <Radar data={data} options={options} plugins={[drawPointValuesPlugin]} />
            </ChartContainer>
          </ChartWrapper>
        );
      })}
    </SkillsContainer>
  );
}
