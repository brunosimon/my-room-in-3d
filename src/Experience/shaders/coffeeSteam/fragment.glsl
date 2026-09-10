uniform float uTime;
uniform float uTimeFrequency;
uniform vec2 uUvFrequency;
uniform vec3 uColor;

varying vec2 vUv;

// --- Inline Perlin2D function (simple version) ---
float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }

float perlin2d(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main()
{
    vec2 uv = vUv * uUvFrequency;
    uv.y -= uTime * uTimeFrequency;

    float borderAlpha = min(vUv.x * 4.0, (1.0 - vUv.x) * 4.0);
    borderAlpha *= (1.0 - vUv.y);

    float perlin = perlin2d(uv);
    perlin *= borderAlpha * 0.6;
    perlin = min(perlin, 1.0);

    gl_FragColor = vec4(uColor, perlin);
}