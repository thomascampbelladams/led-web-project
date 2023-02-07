import { Animations } from "../Constants/Animations";

var exampleJsonPackage = {
    "Scenes": [
        {
            "Type": "horizontal marquee",
            "Content": "MERRY CHRISTMAS",
            "Font": "8x13B.bdf",
            "Color": 0xbababa,
            "AnimationDelay": 60
        },
        {
            "Type": "animation",
            "Content": Animations.dancingChristmasDudeAnimation(),
            "AnimationDelay": 100,
            "NumberOfTimesToRepeat": 10,
            "SceneToShowInBackground": false,
            "isTwoBitAnimation": false,
        },
        {
            "Type": "animation",
            "Content": Animations.fireworkAnimation(),
            "AnimationDelay": 100,
            "NumberOfTimesToRepeat": 60,
            "SceneToShowInBackground":
            {
                "Type": "text",
                "Content": "HAPPY HOLIDAYS",
                "Font": "8x13B.bdf",
                "Color": 0x989898,
                "CenteredVertically": true,
                "CenteredHorizontally": true
            },
            "isTwoBitAnimation": true
        },
        {
            "Type": "vertical marquee",
            "Content": "HAPPY THXGIVING",
            "Font": "8x13B.bdf",
            "Color": 0x989898,
            "AnimationDelay": 30
        },
        {
            "Type": "rainbow transition",
            "AnimationDelay": 1,
            "BlockHeight": 4,
            "BlockWidth": 4
        }
    ],
    "TimesToRepeat": 2
}