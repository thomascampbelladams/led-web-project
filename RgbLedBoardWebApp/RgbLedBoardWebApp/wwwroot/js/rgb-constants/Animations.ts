class Animations {
    private static colorsToCode = {
        "red": 0xff0000, //red
        "orange": 0xff7f00, //orange
        "yellow": 0xffff00, //yellow
        "green": 0x00ff00, //green
        "blue": 0x0000ff, //blue
        "indigo": 0x4b0082, //indigo
        "violet": 0x7F00FF, //violet
        "white": 0xFFFFFF
    };

    public static FireWorkAnimation(): number[][][] {
        return [
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 2, 0, 2, 0, 0, 0],
                [0, 0, 0, 0, 2, 0, 0, 0, 0],
                [0, 0, 0, 2, 0, 2, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 2, 0, 0, 0, 2, 0, 0],
                [0, 0, 0, 2, 0, 2, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 2, 0, 2, 0, 0, 0],
                [0, 0, 2, 0, 0, 0, 2, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 2, 0, 0, 0, 2, 0, 0],
                [0, 2, 0, 0, 0, 0, 0, 2, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 2, 0, 0, 0, 2, 0, 0],
                [0, 2, 0, 0, 0, 0, 0, 2, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 0, 0, 0, 2, 0],
                [0, 2, 0, 0, 0, 0, 0, 2, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 0, 0, 0, 2, 0],
                [0, 2, 0, 0, 0, 0, 0, 2, 0]
            ],
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 0, 0, 0, 2, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 0, 0, 0, 2, 0]
            ],
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
        ];
    }

    public static DancingSantaAnimation(): number[][][] {
        const firstFrame = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /* begin hat*/this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.red, /* end hat */ 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /* begin hat*/this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.red,/* end hat */ 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, /* begin hat*/this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.red, 0, this.colorsToCode.red, this.colorsToCode.red,/* end hat */0, 0, 0, 0],
            [0, /*begin hand*/this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white,/*end hand*/ 0, 0, 0, 0, 0, /* begin head*/this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.orange, this.colorsToCode.white, this.colorsToCode.white, 0, this.colorsToCode.red, this.colorsToCode.red,/* end head*/0, 0, 0, 0],
            [0, 0, /*begin hand*/this.colorsToCode.white, this.colorsToCode.white,/*end hand*/ 0, 0, 0, 0, 0, /* begin head*/0, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, 0, 0,/* end head*/0, 0, this.colorsToCode.green, 0, 0, 0],
            [0, 0, 0,/*begin arm*/ this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white,/*end arm*/ this.colorsToCode.green, this.colorsToCode.green, /* begin neck*/this.colorsToCode.white,/* end neck*/ this.colorsToCode.green, this.colorsToCode.green, /*begin arm*/ this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white,/* end arm*/ 0, 0],
            [0, 0, 0, 0,/*begin arm*/ this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.green,/*end arm begin body*/ this.colorsToCode.green, this.colorsToCode.green, this.colorsToCode.green, this.colorsToCode.green, this.colorsToCode.green, this.colorsToCode.green,/*begin arm end body*/ this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white,/* end arm*/ 0],
            [0, 0, 0, 0, 0, 0, 0, this.colorsToCode.green, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.yellow, this.colorsToCode.yellow, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.green, 0, 0, this.colorsToCode.white, this.colorsToCode.white, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, this.colorsToCode.green, this.colorsToCode.green, this.colorsToCode.green, this.colorsToCode.green, this.colorsToCode.green, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, this.colorsToCode.orange, this.colorsToCode.orange, this.colorsToCode.orange, this.colorsToCode.orange, this.colorsToCode.orange, 0, 0, 0, 0, this.colorsToCode.orange, this.colorsToCode.orange, this.colorsToCode.orange, this.colorsToCode.orange]
        ];
        const secondFrame = [
            [0, 0, 0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.orange, this.colorsToCode.white, this.colorsToCode.white, 0, 0, 0, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white],
            [0, 0, 0, 0, this.colorsToCode.green, 0, 0, 0, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, 0, 0, 0, 0, this.colorsToCode.white, this.colorsToCode.white, 0, 0],
            [0, 0, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.green, this.colorsToCode.green, this.colorsToCode.white, this.colorsToCode.green, this.colorsToCode.green, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, 0, 0, 0],
            [0, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.green, this.colorsToCode.green, this.colorsToCode.green, this.colorsToCode.green, this.colorsToCode.green, this.colorsToCode.green, this.colorsToCode.green, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, this.colorsToCode.white, 0, 0, 0, 0],
            [0, 0, this.colorsToCode.white, this.colorsToCode.white, 0, 0, this.colorsToCode.green, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.yellow, this.colorsToCode.yellow, this.colorsToCode.red, this.colorsToCode.red, this.colorsToCode.green, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, this.colorsToCode.green, this.colorsToCode.green, this.colorsToCode.green, this.colorsToCode.green, this.colorsToCode.green, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0, this.colorsToCode.red, this.colorsToCode.red, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, this.colorsToCode.orange, this.colorsToCode.orange, this.colorsToCode.orange, this.colorsToCode.orange, 0, 0, 0, 0, this.colorsToCode.orange, this.colorsToCode.orange, this.colorsToCode.orange, this.colorsToCode.orange, this.colorsToCode.orange, 0, 0, 0, 0, 0, 0]
        ];

        return [
            firstFrame,
            secondFrame,
            firstFrame,
            secondFrame,
            firstFrame,
            secondFrame
        ];
    }
}