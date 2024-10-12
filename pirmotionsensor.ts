/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="" block="PIRモーションセンサ"
namespace IML_motionsensor {

    const MOTION_EVENT_ID = 1001
    const MOTIONED = 1
    let datapin = DigitalPin.P0
    let beforestatus = false
    let motionstatus = false

    //% block
    //% block="モーションセンサのピンを%pinに設定する "
    //% weight=100   
    export function setPin(pin: DigitalPin) {
        datapin = pin
        pins.setPull(datapin, PinPullMode.PullNone)
    }

    //% block
    //% block="動いた"
    //% weight=99  
    export function isMove(): boolean {
        return motionstatus
    }

    //% blockId=turn_button_off block="なにかが動いたとき"
    //% weight=90   
    export function Motioned(handler: () => void): void {
        control.onEvent(MOTION_EVENT_ID, MOTIONED, handler)
    }

    basic.forever(function () 
    {
        if (pins.digitalReadPin(datapin) == 1)
        {
            motionstatus = true;
            if( beforestatus == false )
            {
                beforestatus = true;
                // 検知しなかった後から検知した時にイベントを発生
                control.raiseEvent(MOTION_EVENT_ID, MOTIONED)
            }
        }
        else
        {
            motionstatus = false;
            beforestatus = false;
        }
    })
}
