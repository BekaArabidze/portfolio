// Domain-warped fbm flow field in the site's accent palette over the dark base.
// Value-noise helper carried over from the original hero shader.
export const fbmFrag = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec3  uColorA; // purple
  uniform vec3  uColorB; // green
  uniform vec3  uColorC; // orange
  uniform vec3  uBase;   // near-black
  uniform vec2  uMouse;         // eased pointer, UV 0..1
  uniform float uMouseStrength; // 0..1 presence

  float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4  mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4  perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

  float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
  }

  float fbm(vec3 p){
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      v += amp * noise(p);
      p *= 2.02;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    // aspect-correct, centered coordinates (no stretch across viewports)
    vec2 p = vUv - 0.5;
    p.x *= uResolution.x / uResolution.y;
    p *= 2.2;

    // pointer into the same aspect-corrected, centered frame as p
    vec2 m = uMouse - 0.5;
    m.x *= uResolution.x / uResolution.y;
    m *= 2.2;

    float t = uTime * 0.06;

    // domain warp, biased subtly toward the cursor so the field leans with it
    vec2 lean = m * (0.10 * uMouseStrength);
    vec3 q = vec3(fbm(vec3(p + lean, t)), fbm(vec3(p + lean + 5.2, t)), 0.0);
    float f = fbm(vec3(p + q.xy * 1.6, t * 1.3));
    f = f * 1.15 + 0.1;

    // layer the accents by fbm bands
    vec3 col = uBase;
    col = mix(col, uColorA, smoothstep(0.15, 0.75, f));
    col = mix(col, uColorB, smoothstep(0.45, 0.95, f) * 0.9);
    col = mix(col, uColorC, smoothstep(0.70, 1.05, f) * 0.75);

    // keep it moody: pull overall toward the base a touch
    col = mix(uBase, col, 0.92);

    // radial vignette so edges settle into the page background
    float vig = smoothstep(1.25, 0.25, length(p));
    col = mix(uBase, col, vig);

    // soft cursor glow: a radial halo that lifts the local palette
    float d    = length(p - m);
    float glow = smoothstep(0.85, 0.0, d) * uMouseStrength;
    col += glow * 0.08 * (uColorA + uColorB);

    gl_FragColor = vec4(col, 1.0);
  }
`;
