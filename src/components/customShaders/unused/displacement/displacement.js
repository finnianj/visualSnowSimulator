import displacementVertexShader from './vertex.glsl'
import displacementFragmentShader from './fragment.glsl'

export const DisplacementShader = {
  uniforms:
  {
      tDiffuse: { value: null },
      uTime: { value: null },
      uNormalMap: { value: null }
  },
  vertexShader: displacementVertexShader,
  fragmentShader: displacementFragmentShader,
}
