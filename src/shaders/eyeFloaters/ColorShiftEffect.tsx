import React, { forwardRef, useMemo } from 'react';
import { Uniform, Vector3 } from 'three';
import { Effect } from 'postprocessing';

const fragmentShader = `
uniform float uAmount;
uniform vec3 uColor;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  outputColor = inputColor + vec4(uColor, 0.0) * uAmount;
}
`;

class ColorShiftEffectImpl extends Effect {
  constructor({ color = new Vector3(1, 0, 0), amount = 0.5 } = {}) {
    super('ColorShiftEffect', fragmentShader, {
      uniforms: new Map([
        ['uColor', new Uniform(color)],
        ['uAmount', new Uniform(amount)]
      ]),
    });
  }

  set amount(amount: any) {
    (this.uniforms.get('uAmount') as Uniform).value = amount;
  }

  set color(color: any) {
    (this.uniforms.get('uColor') as Uniform).value = color;
  }
}

export const ColorShiftEffect = forwardRef(({ color, amount }: { color: any, amount: any }, ref) => {
    const effect = useMemo(() => new ColorShiftEffectImpl({ color, amount }), [color, amount]);
    return <primitive ref={ref} object={effect} dispose={null} />;
  });
