import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "../Button";

describe("Button component", () => {
  const user = userEvent.setup();

  it("renders the base button when nothing is passed", () => {
    render(<Button />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    // const styles = getComputedStyle(button);
    // console.log({ backgroundColor: styles.backgroundColor });
    expect(button).toHaveAttribute("button-type", "");
  });

  it("renders the google-sign-in button type", () => {
    render(<Button buttonType="google-sign-in" />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("button-type", "google-sign-in");
  });

  it("renders the inverted button type", () => {
    render(<Button buttonType="inverted" />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("button-type", "inverted");
  });

  it("renders a loading spinner when isLoading is true", () => {
    render(<Button isLoading>Loading button</Button>);
    const spinner = screen.getByTestId("button-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("calls the onClick handler when clicked", async () => {
    const onClickMock = vi.fn();
    render(<Button onClick={onClickMock} />);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });
});
