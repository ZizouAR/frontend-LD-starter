export const revamp = (obj: object | any, order: string[]): object => {
    const newObject: any = {};

    for (var i = 0; i < order.length; i++) {
        if (obj.hasOwnProperty(order[i])) {
            newObject[order[i]] = obj[order[i]];
        }
    }

    return newObject;
} 