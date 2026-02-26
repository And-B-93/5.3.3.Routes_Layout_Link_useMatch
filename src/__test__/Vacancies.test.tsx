import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Vacancies from "../pages/Vacancies";
import { mockVacancies } from "../mocks/mockData";
import { beforeAll, describe, expect, it, vi } from "vitest";
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

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const testReducer = (
  state = {
    vacancies: mockVacancies,
    loading: false,
    totalPages: 1,
    page: 0,
    search: "",
    area: "",
    skills: [],
  },
) => state;

describe("Vacancies", () => {
  it("отображает список вакансий", () => {
    const store = configureStore({
      reducer: {
        fetch: testReducer,
      },
    });

    render(
      <Provider store={store}>
        <MantineProvider>
          <BrowserRouter>
            <Vacancies />
          </BrowserRouter>
        </MantineProvider>
      </Provider>,
    );

    expect(screen.getByText("Вакансия 1")).toBeInTheDocument();
    expect(screen.getByText("Вакансия 2")).toBeInTheDocument();
  });
});
