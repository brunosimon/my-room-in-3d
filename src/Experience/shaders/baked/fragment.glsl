uniform sampler2D uBakedDayTexture;
uniform sampler2D uBakedNightTexture;
uniform sampler2D uBakedNeutralTexture;
uniform sampler2D uLightMapTexture;

uniform float uNightMix;
uniform float uNeutralMix;

uniform vec3 uLightTvColor;
uniform float uLightTvStrength;

uniform vec3 uLightDeskColor;
uniform float uLightDeskStrength;

uniform vec3 uLightPcColor;
uniform float uLightPcStrength;

varying vec2 vUv;

void main() {
    vec3 bakedDayColor = texture2D(uBakedDayTexture, vUv).rgb;
    vec3 bakedNightColor = texture2D(uBakedNightTexture, vUv).rgb;
    vec3 bakedNeutralColor = texture2D(uBakedNeutralTexture, vUv).rgb;

    vec3 bakedColor = mix(mix(bakedDayColor, bakedNightColor, uNightMix), bakedNeutralColor, uNeutralMix);
    vec3 lightMapColor = texture2D(uLightMapTexture, vUv).rgb;

    // Replace blend() with mix()
    bakedColor = mix(bakedColor, uLightTvColor, lightMapColor.r * uLightTvStrength);
    bakedColor = mix(bakedColor, uLightPcColor, lightMapColor.b * uLightPcStrength);
    bakedColor = mix(bakedColor, uLightDeskColor, lightMapColor.g * uLightDeskStrength);

    gl_FragColor = vec4(bakedColor, 1.0);
}