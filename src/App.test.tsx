import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { expect, it, describe, beforeAll, vi } from "vitest";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { mockVacancies } from "./mocks/mockData";

// Мок ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Мок ky
vi.mock("ky", () => ({
  default: {
    get: vi.fn(() => ({
      json: vi.fn(() =>
        Promise.resolve({
          items: mockVacancies,
          found: mockVacancies.length,
          pages: 1,
          page: 0,
          per_page: 10,
        }),
      ),
    })),
  },
}));

// Мок matchMedia
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

// Создаем базовый store
const createStore = (customState = {}) => {
  const defaultState = {
    vacancies: mockVacancies,
    loading: false,
    error: null,
    total: mockVacancies.length,
    totalPages: 1,
    search: "",
    area: "",
    skills: [],
    page: 0,
    ...customState,
  };

  return configureStore({
    reducer: {
      fetch: (state = defaultState) => state,
    },
  });
};

const mockStore = createStore();
const mockStoreMoscow = createStore({
  vacancies: [mockVacancies[0]],
  area: "1",
});

describe("App component", function () {
  it("должен рендерить app с вакансиями", async () => {
    render(
      <Provider store={mockStore}>
        <MantineProvider>
          <App />
        </MantineProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Список вакансий/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/вакансия 1/i)).toBeInTheDocument();
      expect(screen.getByText(/вакансия 2/i)).toBeInTheDocument();
    });
  });

  it("при фильтрации по Москве отображается только вакансия 1", async () => {
    render(
      <Provider store={mockStoreMoscow}>
        <MantineProvider>
          <App />
        </MantineProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/вакансия 1/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/вакансия 2/i)).not.toBeInTheDocument();
  });
});
