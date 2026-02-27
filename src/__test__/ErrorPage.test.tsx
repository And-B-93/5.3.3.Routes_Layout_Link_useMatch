import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { ErrorPage } from "../pages/ErrorPage";
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

describe("ErrorPage", () => {
  it("отображает сообщение об ошибке 404", () => {
    render(
      <MantineProvider>
        <BrowserRouter>
          <ErrorPage />
        </BrowserRouter>
      </MantineProvider>,
    );

    expect(
      screen.getByText(/Упс! Такой страницы не существует/i),
    ).toBeInTheDocument();

    expect(screen.getByText(/Давайте перейдём к началу/i)).toBeInTheDocument();
  });
});
