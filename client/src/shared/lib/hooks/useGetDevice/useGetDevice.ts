export interface useGetDeviceSchema {
    device: string;
    timezone: string;
}

function getDevice(): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const txt = 'fingerprint';
    if (ctx) {
        ctx.textBaseline = 'top';
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069';
        ctx.fillText(txt, 2, 15);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillText(txt, 4, 17);
    }
    const b64 = canvas.toDataURL().replace('data:image/png;base64,', '');
    const bin = atob(b64);
    const crc = bin.split('').map((char) => {
        return char.charCodeAt(0);
    }).reduce((a, b) => {
        return a + b;
    }, 0);

    const navigatorInfo = navigator.userAgent + navigator.language + navigator.platform;
    const deviceHash = crc + navigatorInfo;

    return deviceHash;
}

function getTimezone(): string {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return timezone;
}

export function useGetDevice(): useGetDeviceSchema {
    const device = getDevice();
    const timezone = getTimezone();

    return {
        device,
        timezone,
    };
}
