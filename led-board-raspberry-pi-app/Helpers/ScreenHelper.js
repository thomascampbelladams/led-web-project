"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var rpi_led_matrix_1 = require("rpi-led-matrix");
var Utils_1 = require("./Utils");
var TextScene_1 = require("../Models/TextScene");
var MarqueeScene_1 = require("../Models/MarqueeScene");
var AnimationScene_1 = require("../Models/AnimationScene");
var RainbowTransitionScene_1 = require("../Models/RainbowTransitionScene");
var ScreenHelper = /** @class */ (function () {
    function ScreenHelper(fontname, fontfilename, logger, onActionQueueEmpty) {
        this.matrixWidth = 64;
        this.matrixHeight = 32;
        this.Matrix = new rpi_led_matrix_1.LedMatrix(__assign(__assign({}, rpi_led_matrix_1.LedMatrix.defaultMatrixOptions()), { rows: 32, cols: 64, hardwareMapping: rpi_led_matrix_1.GpioMapping.AdafruitHat, pwmBits: 8}), __assign(__assign({}, rpi_led_matrix_1.LedMatrix.defaultRuntimeOptions()), { gpioSlowdown: 2 }));
        this.Font = new rpi_led_matrix_1.Font(fontname, "fonts/" + fontfilename);
        this.currentFontName = fontname;
        this.Matrix.font(this.Font);
        this.logger = logger;
        this.cachedTextToLines = {};
        this.actionQueue = [];
        this.Matrix.afterSync(this.NextAction.bind(this));
        this.onActionQueueEmpty = onActionQueueEmpty;
    }
    ScreenHelper.prototype.NextAction = function () {
        if (this.actionQueue.length > 0) {
            var action = this.actionQueue.shift();
            action();
        }
        else {
            this.onActionQueueEmpty();
        }
    };
    ScreenHelper.prototype.runQueue = function () {
        this.NextAction();
    };
    ScreenHelper.prototype.drawVerticallyCenteredText = function (lineText, color, doASync) {
        var _this = this;
        if (doASync === void 0) { doASync = true; }
        var lines = this.getLines(lineText, this.Font.name());
        this.changeForegroundColor(color);
        rpi_led_matrix_1.LayoutUtils.linesToMappedGlyphs(lines, this.Font.height(), this.matrixWidth, this.matrixHeight, rpi_led_matrix_1.HorizontalAlignment.Left, rpi_led_matrix_1.VerticalAlignment.Middle).map(function (glyph) {
            _this.Matrix.drawText(glyph.char, glyph.x, glyph.y);
        });
        if (doASync)
            this.Matrix.sync();
    };
    ScreenHelper.prototype.drawHorizCenteredText = function (lineText, color, doASync) {
        var _this = this;
        if (doASync === void 0) { doASync = true; }
        var lines = this.getLines(lineText, this.Font.name());
        this.changeForegroundColor(color);
        rpi_led_matrix_1.LayoutUtils.linesToMappedGlyphs(lines, this.Font.height(), this.matrixWidth, this.matrixHeight, rpi_led_matrix_1.HorizontalAlignment.Center, rpi_led_matrix_1.VerticalAlignment.Top).map(function (glyph) {
            _this.Matrix.drawText(glyph.char, glyph.x, glyph.y);
        });
        if (doASync)
            this.Matrix.sync();
    };
    ScreenHelper.prototype.drawCenteredText = function (lineText, color, doASync) {
        var _this = this;
        if (doASync === void 0) { doASync = true; }
        var lines = this.getLines(lineText, this.Font.name());
        this.changeForegroundColor(color);
        rpi_led_matrix_1.LayoutUtils.linesToMappedGlyphs(lines, this.Font.height(), this.matrixWidth, this.matrixHeight, rpi_led_matrix_1.HorizontalAlignment.Center, rpi_led_matrix_1.VerticalAlignment.Middle).map(function (glyph) {
            _this.Matrix.drawText(glyph.char, glyph.x, glyph.y);
        });
        if (doASync)
            this.Matrix.sync();
    };
    ScreenHelper.prototype.clearDisplay = function (inHowManySeconds) {
        var _this = this;
        if (inHowManySeconds === void 0) { inHowManySeconds = 0; }
        this.actionQueue.push(function () {
            if (inHowManySeconds) {
                Utils_1.Utils.wait(inHowManySeconds).then(function () {
                    _this.Matrix.clear();
                    _this.Matrix.sync();
                });
            }
            else {
                _this.Matrix.clear();
                _this.Matrix.sync();
            }
        });
    };
    ScreenHelper.prototype.getLines = function (lineText, fontName) {
        if (this.cachedTextToLines[fontName] && this.cachedTextToLines[fontName][lineText]) {
            return this.cachedTextToLines[fontName][lineText];
        }
        else {
            var ret = rpi_led_matrix_1.LayoutUtils.textToLines(this.Font, this.matrixWidth, lineText);
            if (!this.cachedTextToLines[fontName]) {
                this.cachedTextToLines[fontName] = {};
            }
            this.cachedTextToLines[fontName][lineText] = ret;
            return ret;
        }
    };
    ScreenHelper.prototype.changeFont = function (fontname, fontfilename) {
        if (!this.currentFontName || this.currentFontName !== fontname) {
            this.Font = new rpi_led_matrix_1.Font(fontname, "fonts/" + fontfilename);
            this.Matrix.font(this.Font);
            this.currentFontName = fontname;
        }
    };
    ScreenHelper.prototype.changeForegroundColor = function (color) {
        if (!this.backgroundColor || this.backgroundColor !== color) {
            this.Matrix.fgColor(color);
            this.backgroundColor = color;
        }
    };
    ScreenHelper.prototype.verticalMarqueeText = function (lineText, color, animationDelay, runIndefinetly) {
        var _this = this;
        var yOffset = this.matrixHeight;
        var maxHeight = 0;
        var lines = this.getLines(lineText, this.Font.name());
        var glyphs = rpi_led_matrix_1.LayoutUtils.linesToMappedGlyphs(lines, this.Font.height(), this.matrixWidth, this.matrixHeight, rpi_led_matrix_1.HorizontalAlignment.Center, rpi_led_matrix_1.VerticalAlignment.Middle);
        glyphs.map(function (glyph) {
            maxHeight = glyph.y + _this.Font.height();
        });
        this.changeForegroundColor(color);
        if (runIndefinetly) {
            while (true) {
                this.actionQueue.push(this.IncrementMarquee.bind(this, yOffset, runIndefinetly, maxHeight, glyphs, animationDelay, false, color));
                yOffset--;
            }
        }
        else {
            while (yOffset > -maxHeight) {
                this.actionQueue.push(this.IncrementMarquee.bind(this, yOffset, runIndefinetly, maxHeight, glyphs, animationDelay, false, color));
                yOffset--;
            }
        }
    };
    ScreenHelper.prototype.IncrementMarquee = function (offset, isRunningIndefinetly, maxNumber, glyphs, animationDelay, isHorizontal, color) {
        this.changeForegroundColor(color);
        if (isRunningIndefinetly) {
            if (offset < -maxNumber) {
                offset = maxNumber;
            }
        }
        this.Matrix.clear();
        for (var index = 0; index < glyphs.length; index++) {
            var glyph = glyphs[index];
            if (isHorizontal) {
                this.Matrix.drawText(glyph.char, glyph.x + offset, glyph.y);
            }
            else {
                this.Matrix.drawText(glyph.char, glyph.x, glyph.y + offset);
            }
        }
        Utils_1.Utils.wait(animationDelay).then(function () {
            this.Matrix.sync();
        }.bind(this));
    };
    ScreenHelper.prototype.horizontalMarqueeText = function (lineText, color, animationDelay, runIndefinetly) {
        var xOffset = this.matrixWidth;
        var maxWidth = 0;
        var lines = this.getLines(lineText, this.Font.name());
        var glyphs = rpi_led_matrix_1.LayoutUtils.linesToMappedGlyphs(lines, this.Font.height(), this.matrixWidth, this.matrixHeight, rpi_led_matrix_1.HorizontalAlignment.Center, rpi_led_matrix_1.VerticalAlignment.Middle);
        glyphs.map(function (glyph) {
            if (maxWidth < glyph.x + 4) {
                maxWidth = glyph.x + 4;
            }
        });
        if (runIndefinetly) {
            while (true) {
                this.actionQueue.push(this.IncrementMarquee.bind(this, xOffset, runIndefinetly, maxWidth, glyphs, animationDelay, true, color));
                xOffset--;
            }
        }
        else {
            while (xOffset > -maxWidth - 5) {
                this.actionQueue.push(this.IncrementMarquee.bind(this, xOffset, runIndefinetly, maxWidth, glyphs, animationDelay, true, color));
                xOffset--;
            }
        }
    };
    ScreenHelper.prototype.drawSingleFrame = function (animationFrame, startX, startY, isTwoBitAnimation) {
        var maxColorValue = 0xFFFFFF;
        for (var j = 0; j < animationFrame.length; j++) {
            var animationRow = animationFrame[j];
            for (var k = 0; k < animationRow.length; k++) {
                var animationPixel = animationRow[k];
                if (isTwoBitAnimation) {
                    if (animationPixel == 2) {
                        var randColor = this.getRandomInt(maxColorValue);
                        this.changeForegroundColor(randColor);
                        this.Matrix.setPixel(startX + k, startY + j);
                    }
                    else if (animationPixel == 1) {
                        this.changeForegroundColor(maxColorValue);
                        this.Matrix.setPixel(startX + k, startY + j);
                    }
                    else {
                        this.changeForegroundColor(0);
                        this.Matrix.setPixel(startX + k, startY + j);
                    }
                }
                else {
                    this.changeForegroundColor(animationPixel);
                    this.Matrix.setPixel(startX + k, startY + j);
                }
            }
        }
    };
    ScreenHelper.prototype.getRandomInt = function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    };
    ScreenHelper.prototype.findAnimationFrameWidthAndHeight = function (animation) {
        var largestWidth = 0;
        var largestHeight = 0;
        for (var j = 0; j < animation.length; j++) {
            var animationFrame = animation[j];
            if (animationFrame.length > largestHeight) {
                largestHeight = animationFrame.length;
            }
            for (var k = 0; k < animationFrame.length; k++) {
                var animationRow = animationFrame[k];
                if (animationRow.length > largestWidth) {
                    largestWidth = animationRow.length;
                }
            }
        }
        return {
            width: largestWidth,
            height: largestHeight
        };
    };
    ScreenHelper.prototype.doAnimation = function (animation, animationDelay, numberOfTimesToShow, func, isTwoBitAnimation) {
        var widthAndHeight = this.findAnimationFrameWidthAndHeight(animation);
        var pixelSpriteWidth = widthAndHeight.width;
        var pixelSpriteHeight = widthAndHeight.height;
        var shown = 0;
        while (shown <= numberOfTimesToShow) {
            var randomXStart = Math.floor(Math.random() * ((this.matrixWidth - pixelSpriteWidth) - pixelSpriteWidth)) + pixelSpriteWidth;
            var randomYStart = Math.floor(Math.random() * ((this.matrixHeight - pixelSpriteHeight) - pixelSpriteHeight)) + pixelSpriteHeight;
            for (var index = 0; index < animation.length; index++) {
                var animationFrame = animation[index];
                this.actionQueue.push(this.SendSingleFrame.bind(this, animationFrame, randomXStart, randomYStart, isTwoBitAnimation, animationDelay));
            }
            this.actionQueue.push(this.clearSprite.bind(this, pixelSpriteWidth, pixelSpriteHeight, randomXStart, randomYStart, func, animationDelay));
            shown++;
        }
    };
    ScreenHelper.prototype.clearSprite = function (pixelSpriteWidth, pixelSpriteHeight, randomXStart, randomYStart, func, animationDelay) {
        var _this = this;
        this.changeForegroundColor(0);
        for (var j = 0; j < pixelSpriteWidth; j++) {
            for (var k = 0; k < pixelSpriteHeight; k++) {
                this.Matrix.setPixel(randomXStart + j, randomYStart + k);
            }
        }
        func();
        Utils_1.Utils.wait(animationDelay).then(function () {
            _this.Matrix.sync();
        });
    };
    ScreenHelper.prototype.SendSingleFrame = function (animationFrame, randomXStart, randomYStart, isTwoBitAnimation, animationDelay) {
        var _this = this;
        this.drawSingleFrame(animationFrame, randomXStart, randomYStart, isTwoBitAnimation);
        Utils_1.Utils.wait(animationDelay).then(function () {
            _this.Matrix.sync();
        });
    };
    ScreenHelper.prototype.TranslateScene = function (jsonObj) {
        switch (jsonObj["Type"]) {
            case "horizontal marquee":
            case "vertical marquee":
                return new MarqueeScene_1["default"](jsonObj, this.logger);
            case "animation":
                return new AnimationScene_1["default"](jsonObj, this.logger);
            case "rainbow transition":
                return new RainbowTransitionScene_1["default"](jsonObj, this.logger);
            case "text":
                return new TextScene_1["default"](jsonObj, this.logger);
        }
    };
    ScreenHelper.prototype.IncreaseTransition = function (w, xOffset, row, animationDelay, color) {
        var _this = this;
        var newX = w + xOffset;
        this.changeForegroundColor(color);
        this.Matrix.setPixel(newX, row);
        if (animationDelay > 0) {
            Utils_1.Utils.wait(animationDelay).then(function () {
                _this.Matrix.sync();
            });
        }
        else {
            this.Matrix.sync();
        }
    };
    ScreenHelper.prototype.rainbowTransition = function (animationDelay, heightOfColorBlock, widthOfColorBlock, func) {
        var row = 0;
        var colors = [
            0xff0000,
            0xff7f00,
            0xffff00,
            0x00ff00,
            0x0000ff,
            0x4b0082,
            0x7F00FF //violet
        ];
        var colorIndex = 0;
        var xOffset = 0;
        this.changeForegroundColor(colors[0]);
        while (xOffset < this.matrixWidth) {
            while (row < this.matrixHeight) {
                for (var w = 0; w < widthOfColorBlock; w++) {
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
                for (var w = widthOfColorBlock; w >= 0; w--) {
                    this.actionQueue.push(this.decrementTransition.bind(this, w, xOffset, row, animationDelay));
                }
                row--;
            }
            xOffset -= widthOfColorBlock;
            row = this.matrixHeight;
        }
        func();
    };
    ScreenHelper.prototype.decrementTransition = function (w, xOffset, row, animationDelay) {
        var _this = this;
        this.changeForegroundColor(0);
        this.Matrix.setPixel(w + xOffset, row);
        if (animationDelay > 0) {
            Utils_1.Utils.wait(animationDelay).then(function () {
                _this.Matrix.sync();
            });
        }
        else {
            this.Matrix.sync();
        }
    };
    return ScreenHelper;
}());
exports["default"] = ScreenHelper;
