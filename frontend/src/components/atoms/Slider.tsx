import MuiSlider, { SliderProps as MuiSliderProps } from '@mui/material/Slider';

export type SliderProps = MuiSliderProps;

/**
 * Control deslizante para seleccionar un valor o rango basado en MUI `Slider`.
 */
export function Slider({ color = 'primary', ...props }: SliderProps) {
  return <MuiSlider color={color} {...props} />;
}

export default Slider;
