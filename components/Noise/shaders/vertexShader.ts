import glslify from 'glslify';


export const vertex = () => {
    return glslify`
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;
    uniform float distanceFromCenter;
    float PI = 3.141592653589793238;

    void main() {
        vUv = uv;

        vPosition = position;
        gl_Position = projectionMatrix *  modelViewMatrix * vec4(vPosition,1.0);
    }
    `

}
