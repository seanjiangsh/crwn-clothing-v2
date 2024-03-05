import { SpinnerOverlay, SpinnerContainer } from "./Spinner.styles";

export default function Spinner() {
  return (
    <SpinnerOverlay data-testid="spinner">
      <SpinnerContainer />
    </SpinnerOverlay>
  );
}
