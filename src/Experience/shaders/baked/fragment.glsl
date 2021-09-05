uniform sampler2D uBakedTexture;
uniform sampler2D uLightMapTexture;

uniform vec3 uLightTvColor;
uniform float uLightTvStrength;

uniform vec3 uLightDeskColor;
uniform float uLightDeskStrength;

uniform vec3 uLightPcColor;
uniform float uLightPcStrength;

varying vec2 vUv;

void main()
{
    vec3 bakedColor = texture2D(uBakedTexture, vUv).rgb;
    vec3 lightMapColor = texture2D(uLightMapTexture, vUv).rgb;

    float lightTvStrength = lightMapColor.r * uLightTvStrength;
    bakedColor = mix(bakedColor, uLightTvColor, lightTvStrength);

    float lightDeskStrength = lightMapColor.g * uLightDeskStrength;
    bakedColor = mix(bakedColor, uLightDeskColor, lightDeskStrength);

    float lightPcStrength = lightMapColor.b * uLightPcStrength;
    bakedColor = mix(bakedColor, uLightPcColor, lightPcStrength);

    gl_FragColor = vec4(bakedColor, 1.0);
}