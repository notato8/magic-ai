export function mulligan(player) {
    switch (Math.floor(Math.random() * 2)) {
        case 0:
            player.willMulligan = false;
            break;
        case 1:
            player.willMulligan = true;
            break;
    }
}

export function card(zone) {
    return Math.floor(Math.random() * zone.length);
}
