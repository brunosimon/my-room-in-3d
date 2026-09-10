// src/Experience/assets.js
const BASE_PATH = 'assets/' // no 'my-room-in-3d/', Loader will handle that

export default [
    {
        name: 'base',
        data: {},
        items: [
            { name: 'googleHomeLedMaskTexture', source: BASE_PATH + 'googleHomeLedMask.png', type: 'texture' },
            { name: 'googleHomeLedsModel', source: BASE_PATH + 'googleHomeLedsModel.glb', type: 'model' },
            { name: 'loupedeckButtonsModel', source: BASE_PATH + 'loupedeckButtonsModel.glb', type: 'model' },
            { name: 'topChairModel', source: BASE_PATH + 'topChairModel.glb', type: 'model' },
            { name: 'coffeeSteamModel', source: BASE_PATH + 'coffeeSteamModel.glb', type: 'model' },
            { name: 'elgatoLightModel', source: BASE_PATH + 'elgatoLightModel.glb', type: 'model' },
            { name: 'pcScreenModel', source: BASE_PATH + 'pcScreenModel.glb', type: 'model' },
            { name: 'macScreenModel', source: BASE_PATH + 'macScreenModel.glb', type: 'model' },
            { name: 'roomModel', source: BASE_PATH + 'roomModel.glb', type: 'model' },
            { name: 'threejsJourneyLogoTexture', source: BASE_PATH + 'threejsJourneyLogo.png', type: 'texture' },
            { name: 'bakedDayTexture', source: BASE_PATH + 'bakedDay.jpg', type: 'texture' },
            { name: 'bakedNightTexture', source: BASE_PATH + 'bakedNight.jpg', type: 'texture' },
            { name: 'bakedNeutralTexture', source: BASE_PATH + 'bakedNeutral.jpg', type: 'texture' },
            { name: 'lightMapTexture', source: BASE_PATH + 'lightMap.jpg', type: 'texture' }
        ]
    }
]