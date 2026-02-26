import { render, screen } from "@testing-library/react";
import { VacancyCard } from "../components/VacancyCard";
import { mockVacancy } from "../mocks/mockData"; // один объект вакансии
import { beforeAll, describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@testing-library/jest-dom";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe("VacancyCard", () => {
  it('отображает название, зарплату и кнопку "Смотреть вакансию"', () => {
    render(
      <MantineProvider>
        <BrowserRouter>
          <VacancyCard vacancy={mockVacancy} />
        </BrowserRouter>
      </MantineProvider>,
    );

    expect(screen.getByText(mockVacancy.name)).toBeInTheDocument();

    expect(screen.getByText(/1000.*2000.*RUR/)).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /смотреть вакансию/i }),
    ).toBeInTheDocument();
  });

  it("показывает полное описание, если showDescription=true", () => {
    const vacancyWithDescription = {
      ...mockVacancy,
      description: "Подробное описание вакансии",
    };
    render(
      <MantineProvider>
        <BrowserRouter>
          <VacancyCard
            vacancy={vacancyWithDescription}
            showDescription={true}
          />
        </BrowserRouter>
      </MantineProvider>,
    );

    expect(screen.getByText(/описание вакансии/i)).toBeInTheDocument();
  });
});
