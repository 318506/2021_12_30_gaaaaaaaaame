input.onPinPressed(TouchPin.P0, function () {
	
})
// 按A鍵 向左一格
input.onButtonPressed(Button.A, function () {
    主角.change(LedSpriteProperty.X, -1)
})
// 創建(發射)子彈
input.onButtonPressed(Button.AB, function () {
    // 定位到主角的位置
    子彈 = game.createSprite(主角.get(LedSpriteProperty.X), 主角.get(LedSpriteProperty.Y))
    // 往上跑
    for (let index = 0; index < 4; index++) {
        子彈.change(LedSpriteProperty.Y, -1)
        basic.pause(100)
    }
    // 跑到最上面後消失
    子彈.delete()
    // 子彈飛出去發出來的聲音
    soundExpression.giggle.play()
})
// 按B鍵 向右一格
input.onButtonPressed(Button.B, function () {
    主角.change(LedSpriteProperty.X, 1)
})
// 設定初始值(歸零)
let 子彈: game.LedSprite = null
let 主角: game.LedSprite = null
game.setScore(0)
主角 = game.createSprite(2, 4)
let 飛機 = game.createSprite(0, 0)
// 飛機碰到主角
//   →遊戲結束
basic.forever(function () {
    if (飛機.isTouching(主角)) {
        game.gameOver()
        basic.showString("GAMEOVER")
        basic.showString("SCORE")
        basic.showString("" + (game.score()))
    }
})
// 打到飛機→加分
basic.forever(function () {
    // 子彈被創建出來才有用
    if (子彈) {
        if (子彈.isTouching(飛機)) {
            game.addScore(1)
            // 飛機定位到原位
            // (左上角)
            飛機.set(LedSpriteProperty.X, 0)
            // 同上
            飛機.set(LedSpriteProperty.Y, 0)
        }
    }
})
// 飛機移動
basic.forever(function () {
    // 同下
    basic.pause(randint(75, 500))
    // 飛機向右跑
    飛機.change(LedSpriteProperty.X, 1)
    // 如果飛機到最右邊，飛機定位到下一行最左邊
    if (飛機.get(LedSpriteProperty.X) == 4) {
        // 讓他跑到第五格
        // (他會跑太快直接跳過第五格)
        basic.pause(randint(75, 500))
        飛機.set(LedSpriteProperty.X, 0)
        飛機.change(LedSpriteProperty.Y, 1)
    }
})
// 得分後的音效
basic.forever(function () {
    if (game.score() == 10) {
        music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
        game.pause()
        basic.showString("" + (game.score()))
        game.resume()
    }
    if (game.score() == 15) {
        game.pause()
        music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
        basic.showString("" + (game.score()))
        game.resume()
    }
})
// 背景音
control.inBackground(function () {
    music.startMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.ForeverInBackground)
})
