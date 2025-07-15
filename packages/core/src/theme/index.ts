import { generateColors } from '@mantine/colors-generator'
import { type MantineColorsTuple } from '@mantine/core'
import type { ColorLiteral, HexColor, LikeC4Theme, ThemeColorValues } from '../types'
import { ElementColors } from './element'
import { RelationshipColors } from './relationships'

export const defaultTheme: LikeC4Theme = {
  elements: ElementColors,
  relationships: RelationshipColors,
  font: 'Arial',
  shadow: '#0a0a0a',
  sizes: {
    xs: {
      width: 180,
      height: 100,
    },
    sm: {
      width: 240,
      height: 135,
    },
    md: {
      width: 320,
      height: 180,
    },
    lg: {
      width: 420,
      height: 234,
    },
    xl: {
      width: 520,
      height: 290,
    },
  },
  spacing: {
    xs: 8, // 0.5rem
    sm: 10, // 0.625rem
    md: 16, // 1rem
    lg: 24, // 1.5rem = 16px + 8px
    xl: 32, // 2rem
  },
  /**
   * Text sizes for titles
   * https://typescale.com/
   *
   * Scale:  1.2
   * Base:   16px
   */
  textSizes: {
    xs: 13.33,
    sm: 16,
    md: 19.2,
    lg: 23.04,
    xl: 27.65,
  },
}

type ContrastedColors = [
  ColorLiteral,
  ColorLiteral
]

export function computeColorValues(color: ColorLiteral): ThemeColorValues {
  if (color.match(/^#([0-9a-f]{3}){1,2}$/i)) {
    const colors = generateColors(color)
    
    const fillColor = colors[6] as HexColor
    const strokeColor = colors[7] as HexColor
    
    // Select contrasted colors from palette for text and picto
    const constrastedColors = getContrastedColors(fillColor, colors)

    return {
      elements: {
        fill: fillColor,
        stroke: strokeColor,
        hiContrast: constrastedColors[0],
        loContrast: constrastedColors[1],
      },
      relationships: {
        lineColor: colors[4] as HexColor,
        labelColor: colors[3] as HexColor,
        labelBgColor: colors[9] as HexColor,
      },
    }
  } else {
    return {
      elements: defaultTheme.elements['primary'],
      relationships: defaultTheme.relationships['primary'],
    }
  }
}

// Convert hex string to RGB array
function hexToRgb(hex: string): [number, number, number] {
  // Remove '#' if present
  hex = hex.replace(/^#/, '');

  // Expand shorthand form (#abc → #aabbcc)
  if (hex.length === 3) {
    hex = hex.split('').map((char) => char + char).join('');
  }

  if (hex.length !== 6) {
    throw new Error(`Invalid hex color: "${hex}"`);
  }

  const num = parseInt(hex, 16);
  return [
    (num >> 16) & 255,
    (num >> 8) & 255,
    num & 255
  ];
}

// Calculate relative luminance of an RGB color
function getLuminance([r, g, b]: [number, number, number]): number {
  const toLinear = (value: number): number => {
    const v = value / 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  };

  const red = toLinear(r);
  const green = toLinear(g);
  const blue = toLinear(b);

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

// Calculate contrast ratio between two luminance values
function getContrastRatio(lum1: number, lum2: number): number {
  const [L1, L2] = lum1 >= lum2 ? [lum1, lum2] : [lum2, lum1];
  return (L1 + 0.05) / (L2 + 0.05);
}

// Determine the best text color from 'colors' based on 'refColor'
export function getContrastedColors(refColor: string, colors: MantineColorsTuple): ContrastedColors {
  const refColorRgb = hexToRgb(refColor);
  const lightColorRgb = hexToRgb(colors[0]);
  const darkColorRgb = hexToRgb(colors[9]);

  const refColorLuminance = getLuminance(refColorRgb);
  const lightColorLuminance = getLuminance(lightColorRgb);
  const darkColorLuminance = getLuminance(darkColorRgb);

  const contrastWithLight = getContrastRatio(refColorLuminance, lightColorLuminance);
  const contrastWithDark = getContrastRatio(refColorLuminance, darkColorLuminance);

  return contrastWithLight < contrastWithDark ? [colors[9] as HexColor, colors[8] as HexColor] : [colors[0] as HexColor, colors[1] as HexColor];
}

export { ElementColors, RelationshipColors }
