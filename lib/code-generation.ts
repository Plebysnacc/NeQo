import QRCode from "qrcode";
import {toDataURL as DmcToDataUrl} from '@bwip-js/react-native';
import bwip from '@bwip-js/browser'

export async function createQRCode(text: string, canvas: HTMLElement | null) {
  if (!canvas) return;
  const dataUrl = await QRCode.toDataURL(text, {
      margin: 0,
      errorCorrectionLevel: "medium"
    });
    await QRCode.toCanvas(canvas, text, {
      margin: 0,
      width: 164
    });
    return dataUrl;
}

export async function createDmc(text: string, canvas: HTMLCanvasElement) {
  if(!canvas || text === "") return;
  bwip.toCanvas(canvas, {
    bcid:        'datamatrix',
    text:        text,
    scale:       window.devicePixelRatio,
    height:      164,
    includetext: false,
    textxalign:  'center'
  })

  return DmcToDataUrl({
    bcid:        'datamatrix',
    text:        text,
    scale:       window.devicePixelRatio,
    includetext: false,
  })
}