import { LedMatrix, LedMatrixInstance, FontInstance, GpioMapping, LedMatrixUtils, PixelMapperType, Font, LayoutUtils, Line, HorizontalAlignment, VerticalAlignment, MappedGlyph, RuntimeFlag } from 'rpi-led-matrix';
import { Utils } from "./Utils";
import TextScene from "../Models/TextScene";
import MarqueeScene from "../Models/MarqueeScene";
import AnimationScene from "../Models/AnimationScene";
import RainbowTransitionScene from "../Models/RainbowTransitionScene";
import LogHelper from "./Log-Helper";
import { resolve } from 'path';

export default class ScreenHelper {
    private Matrix: LedMatrixInstance;
    private Font: FontInstance;
    private logger: LogHelper;
    private backgroundColor: number;
    private cachedTextToLines: any;
    private matrixWidth = 64;
    private matrixHeight = 32;
    private currentFontName: string;
    private actionQueue: any[];
    public onActionQueueEmpty: () => void;

    constructor(fontname: string, fontfilename: string, logger: LogHelper, onActionQueueEmpty: () => void) {
        this.Matrix = new LedMatrix(
            {
                ...LedMatrix.defaultMatrixOptions(),
                rows: 32,
                cols: 64,
                hardwareMapping: GpioMapping.AdafruitHat,
                pwmBits: 7,
                showRefreshRate: true,
                pwmDitherBits: 1,
                pwmLsbNanoseconds: 50
            },
            {
                ...LedMatrix.defaultRuntimeOptions(),
                gpioSlowdown: 2
            });

        this.Font = new Font(fontname, `fonts/${fontfilename}`);
        this.currentFontName = fontname;
        this.Matrix.font(this.Font);
        this.logger = logger;
        this.cachedTextToLines = {};
        this.actionQueue = [];
        this.Matrix.afterSync(this.NextAction.bind(this));
        this.onActionQueueEmpty = onActionQueueEmpty;
    }

    private NextAction(){
        if (this.actionQueue.length > 0) {
            var action = this.actionQueue.shift();
            action();
        } else {
            this.onActionQueueEmpty();
        }
    }

    public runQueue(){
        this.NextAction();
    }

    public drawVerticallyCenteredText(lineText: string, color: number, doASync: boolean = true) {
        const lines = this.getLines(lineText, this.Font.name());

        this.changeForegroundColor(color);

        LayoutUtils.linesToMappedGlyphs(lines, this.Font.height(), this.matrixWidth, this.matrixHeight, HorizontalAlignment.Left, VerticalAlignment.Middle).map(glyph => {
            this.Matrix.drawText(glyph.char, glyph.x, glyph.y);
        });

        if(doASync) this.Matrix.sync();
    }

    public drawHorizCenteredText(lineText: string, color: number, doASync: boolean = true) {
        const lines = this.getLines(lineText, this.Font.name());

        this.changeForegroundColor(color);

        LayoutUtils.linesToMappedGlyphs(lines, this.Font.height(), this.matrixWidth, this.matrixHeight, HorizontalAlignment.Center, VerticalAlignment.Top).map(glyph => {
            this.Matrix.drawText(glyph.char, glyph.x, glyph.y);
        });
        
        if(doASync) this.Matrix.sync();
    }

    public drawCenteredText(lineText: string, color: number, doASync: boolean = true) {
        const lines = this.getLines(lineText, this.Font.name());

        this.changeForegroundColor(color);

        LayoutUtils.linesToMappedGlyphs(lines, this.Font.height(), this.matrixWidth, this.matrixHeight, HorizontalAlignment.Center, VerticalAlignment.Middle).map(glyph => {
            this.Matrix.drawText(glyph.char, glyph.x, glyph.y);
        });

        if(doASync) this.Matrix.sync();
    }

    public clearDisplay(inHowManySeconds: number = 0) {
        this.actionQueue.push(()=>{
            if(inHowManySeconds){
                Utils.wait(inHowManySeconds).then(() => {
                    this.Matrix.clear();
                    this.Matrix.sync();
                });
            } else {
                this.Matrix.clear();
                this.Matrix.sync();
            }
        });
    }

    private getLines(lineText: string, fontName: string) : Line[] {
        if (this.cachedTextToLines[fontName] && this.cachedTextToLines[fontName][lineText]) {
            return this.cachedTextToLines[fontName][lineText];
        } else {
            let ret = LayoutUtils.textToLines(this.Font, this.matrixWidth, lineText);

            if (!this.cachedTextToLines[fontName]) {
                this.cachedTextToLines[fontName] = {};
            }

            this.cachedTextToLines[fontName][lineText] = ret;

            return ret;
        }
    }

    public changeFont(fontname: string, fontfilename: string) {
        if (!this.currentFontName || this.currentFontName !== fontname) {
            this.Font = new Font(fontname, `fonts/${fontfilename}`);
            this.Matrix.font(this.Font);
            this.currentFontName = fontname;  
        }
    }

    private changeForegroundColor(color: number) {
        if (!this.backgroundColor || this.backgroundColor !== color) {
            this.Matrix.fgColor(color);
            this.backgroundColor = color;
        }
    }

    public verticalMarqueeText(lineText: string, color: number, animationDelay: number, runIndefinetly: boolean) {
        var yOffset = this.matrixHeight;
        var maxHeight = 0;
        const lines = this.getLines(lineText, this.Font.name());
        const glyphs = LayoutUtils.linesToMappedGlyphs(lines, this.Font.height(), this.matrixWidth, this.matrixHeight, HorizontalAlignment.Center, VerticalAlignment.Middle);

        glyphs.map(glyph => {
            maxHeight = glyph.y + this.Font.height();
        });

        this.changeForegroundColor(color);

        if (runIndefinetly) {
            while (true) {
                this.actionQueue.push(this.IncrementMarquee.bind(this, yOffset, runIndefinetly, maxHeight, glyphs, animationDelay, false, color));
                yOffset--;
            }
        } else {
            while (yOffset > -maxHeight) {
                this.actionQueue.push(this.IncrementMarquee.bind(this, yOffset, runIndefinetly, maxHeight, glyphs, animationDelay, false, color));
                yOffset--;
            }
        }
    }

    private IncrementMarquee(offset: number, isRunningIndefinetly: boolean, maxNumber: number, glyphs: MappedGlyph[], animationDelay: number, isHorizontal: boolean, color: number){
        this.changeForegroundColor(color);

        if(isRunningIndefinetly){
            if (offset < -maxNumber) {
                offset = maxNumber;
            }
        }

        this.Matrix.clear();
        
        for (let index = 0; index < glyphs.length; index++) {
            const glyph = glyphs[index];
            
            if (isHorizontal) {
                this.Matrix.drawText(glyph.char, glyph.x + offset, glyph.y);
            } else {
                this.Matrix.drawText(glyph.char, glyph.x, glyph.y + offset);
            }
        }

        Utils.wait(animationDelay).then(function(){
            this.Matrix.sync();
        }.bind(this));
    }

    public horizontalMarqueeText(lineText: string, color: number, animationDelay: number, runIndefinetly: boolean) {
        var xOffset = this.matrixWidth;
        var maxWidth = 0;
        const lines = this.getLines(lineText, this.Font.name());
        const glyphs = LayoutUtils.linesToMappedGlyphs(lines, this.Font.height(), this.matrixWidth, this.matrixHeight, HorizontalAlignment.Center, VerticalAlignment.Middle);
        glyphs.map(glyph => {
            if (maxWidth < glyph.x + 4) {
                maxWidth = glyph.x + 4;
            }
        });        

        if (runIndefinetly) {
            while (true) {
                this.actionQueue.push(this.IncrementMarquee.bind(this, xOffset, runIndefinetly, maxWidth, glyphs, animationDelay, true, color));
                xOffset--;
            }
        } else {
            while (xOffset > -maxWidth-5) {
                this.actionQueue.push(this.IncrementMarquee.bind(this, xOffset, runIndefinetly, maxWidth, glyphs, animationDelay, true, color));
                xOffset--;
            }
        }
    }

    drawSingleFrame(animationFrame: Array<Array<number>>, startX: number, startY: number, isTwoBitAnimation: boolean) {
        const maxColorValue = 0xFFFFFF;

        for (let j = 0; j < animationFrame.length; j++) {
            const animationRow = animationFrame[j];

            for (let k = 0; k < animationRow.length; k++) {
                const animationPixel = animationRow[k];

                if (isTwoBitAnimation) {
                    if (animationPixel == 2) {
                        let randColor = this.getRandomInt(maxColorValue);
                        this.changeForegroundColor(randColor);

                        this.Matrix.setPixel(startX + k, startY + j);
                    } else if (animationPixel == 1) {
                        this.changeForegroundColor(maxColorValue);

                        this.Matrix.setPixel(startX + k, startY + j);
                    } else {
                        this.changeForegroundColor(0);

                        this.Matrix.setPixel(startX + k, startY + j);
                    }
                } else {
                    this.changeForegroundColor(animationPixel);

                    this.Matrix.setPixel(startX + k, startY + j);
                }
            }
        }
    }

    getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    findAnimationFrameWidthAndHeight(animation: Array<Array<Array<number>>>) {
        var largestWidth = 0;
        var largestHeight = 0;

        for (let j = 0; j < animation.length; j++) {
            const animationFrame = animation[j];

            if (animationFrame.length > largestHeight) {
                largestHeight = animationFrame.length
            }

            for (let k = 0; k < animationFrame.length; k++) {
                const animationRow = animationFrame[k];

                if (animationRow.length > largestWidth) {
                    largestWidth = animationRow.length;
                }
            }
        }

        return {
            width: largestWidth,
            height: largestHeight
        };
    }

    public doAnimation(animation: Array<Array<Array<number>>>, animationDelay: number, numberOfTimesToShow: number, func: { (): void }, isTwoBitAnimation: boolean) {
        var widthAndHeight = this.findAnimationFrameWidthAndHeight(animation);
        var pixelSpriteWidth = widthAndHeight.width;
        var pixelSpriteHeight = widthAndHeight.height;
        var shown = 0;

        while (shown <= numberOfTimesToShow) {
            var randomXStart = Math.floor(Math.random() * ((this.matrixWidth - pixelSpriteWidth) - pixelSpriteWidth)) + pixelSpriteWidth;
            var randomYStart = Math.floor(Math.random() * ((this.matrixHeight - pixelSpriteHeight) - pixelSpriteHeight)) + pixelSpriteHeight;

            for (let index = 0; index < animation.length; index++) {
                const animationFrame = animation[index];

                this.actionQueue.push(this.SendSingleFrame.bind(this, animationFrame, randomXStart, randomYStart, isTwoBitAnimation, animationDelay));
            }

            this.actionQueue.push(this.clearSprite.bind(this, pixelSpriteWidth, pixelSpriteHeight, randomXStart, randomYStart, func, animationDelay));
            shown++;
        }
    }

    private clearSprite(pixelSpriteWidth: number, pixelSpriteHeight: number, randomXStart: number, randomYStart: number, func: { (): void }, animationDelay: number) {
        this.changeForegroundColor(0);

        for (let j = 0; j < pixelSpriteWidth; j++) {
            for (let k = 0; k < pixelSpriteHeight; k++) {
                this.Matrix.setPixel(randomXStart + j, randomYStart + k);
            }
        }

        func();

        Utils.wait(animationDelay).then(() => {
            this.Matrix.sync();
        });
    }

    private SendSingleFrame(animationFrame: number[][], randomXStart: number, randomYStart: number, isTwoBitAnimation: boolean, animationDelay: number) {
        this.drawSingleFrame(animationFrame, randomXStart, randomYStart, isTwoBitAnimation);

        Utils.wait(animationDelay).then(()=>{
            this.Matrix.sync();
        });
    }

    public TranslateScene(jsonObj: any) {
        switch (jsonObj["Type"]) {
            case "horizontal marquee":
            case "vertical marquee":
                return new MarqueeScene(jsonObj, this.logger);

            case "animation":
                return new AnimationScene(jsonObj, this.logger);

            case "rainbow transition":
                return new RainbowTransitionScene(jsonObj, this.logger);

            case "text":
                return new TextScene(jsonObj, this.logger);
        }
    }

    private IncreaseTransition(w: number, xOffset: number, row: number, animationDelay: number, color: number) {
        let newX: number = w + xOffset;

        this.changeForegroundColor(color);
        this.Matrix.setPixel(newX, row);

        if (animationDelay > 0) {
            Utils.wait(animationDelay).then(()=>{
                this.Matrix.sync();
            });
        } else {
            this.Matrix.sync();
        }
    }

    public rainbowTransition(animationDelay: number, heightOfColorBlock: number, widthOfColorBlock: number, func: { (): void }) {
        var row: number = 0;
        const colors: number[] = [
            0xff0000, //red
            0xff7f00, //orange
            0xffff00, //yellow
            0x00ff00, //green
            0x0000ff, //blue
            0x4b0082, //indigo
            0x7F00FF //violet
        ];
        var colorIndex: number = 0;
        var xOffset: number = 0;

        this.changeForegroundColor(colors[0]);
        while (xOffset < this.matrixWidth) {
            while (row < this.matrixHeight) {
                for (let w = 0; w < widthOfColorBlock; w++) {
                    this.actionQueue.push(this.IncreaseTransition.bind(this, w, xOffset, row, animationDelay, colors[colorIndex]));
                }

                row++;

                if (row % heightOfColorBlock == 0) {
                    colorIndex++;

                    if (colorIndex >= colors.length) {
                        colorIndex = 0;
                    }
                }
            }

            xOffset += widthOfColorBlock;
            row = 0;
        }

        xOffset = this.matrixWidth - widthOfColorBlock;
        row = this.matrixHeight;

        while (xOffset >= 0) {
            while (row >= 0) {
                for (let w = widthOfColorBlock; w >= 0; w--) {
                    this.actionQueue.push(this.decrementTransition.bind(this, w, xOffset, row, animationDelay));
                }

                row--;
            }

            xOffset -= widthOfColorBlock;
            row = this.matrixHeight;
        }

        func();
    }

    private decrementTransition(w: number, xOffset: number, row: number, animationDelay: number){
        this.changeForegroundColor(0);
        this.Matrix.setPixel(w + xOffset, row);

        if (animationDelay > 0) {
            Utils.wait(animationDelay).then(()=>{
                this.Matrix.sync();
            });
        } else {
            this.Matrix.sync();
        }
    }
}
