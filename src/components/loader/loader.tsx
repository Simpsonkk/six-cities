import { CSSProperties } from 'react';
import { SpinnerDotted } from 'spinners-react';

function Loader(): JSX.Element {
  const spinnerStyles: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return <SpinnerDotted color="#4481c3" style={spinnerStyles} size={100} />;
}

export default Loader;
