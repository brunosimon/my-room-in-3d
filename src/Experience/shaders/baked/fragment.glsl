uniform sampler2D uBakedTexture;
uniform sampler2D uLightMapTexture;

uniform vec3 uLightTvColor;
uniform float uLightTvStrength;

uniform vec3 uLightDeskColor;
uniform float uLightDeskStrength;

uniform vec3 uLightPcColor;
uniform float uLightPcStrength;

varying vec2 vUv;

// #pragma glslify: blend = require(glsl-blend/add)
#pragma glslify: blend = require(glsl-blend/lighten)
// #pragma glslify: blend = require(glsl-blend/normal)
// #pragma glslify: blend = require(glsl-blend/screen)

void main()
{
    vec3 bakedColor = texture2D(uBakedTexture, vUv).rgb;
    vec3 lightMapColor = texture2D(uLightMapTexture, vUv).rgb;

    float lightTvStrength = lightMapColor.r * uLightTvStrength;
    bakedColor = blend(bakedColor, uLightTvColor, lightTvStrength);

    float lightPcStrength = lightMapColor.b * uLightPcStrength;
    bakedColor = blend(bakedColor, uLightPcColor, lightPcStrength);

    float lightDeskStrength = lightMapColor.g * uLightDeskStrength;
    bakedColor = blend(bakedColor, uLightDeskColor, lightDeskStrength);

    gl_FragColor = vec4(bakedColor, 1.0);
}