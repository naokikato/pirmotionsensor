/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="" block="RIPモーションセンサ"
namespace IMLmotionsensor {

    //% block
    //% block="動いた %pin"
    //% weight=100   
    export function ismove(pin: DigitalPin): boolean {
        pins.setPull(pin, PinPullMode.PullNone)

        if (pins.digitalReadPin(pin) == 1)
        {
            return true
        }
        else
        {
            return false
        }
    }
}
