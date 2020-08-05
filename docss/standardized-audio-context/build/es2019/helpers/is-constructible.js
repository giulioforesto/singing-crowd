const handler = {
    construct() {
        return handler;
    }
};
export const isConstructible = (constructible) => {
    try {
        const proxy = new Proxy(constructible, handler);
        new proxy(); // tslint:disable-line:no-unused-expression
    }
    catch {
        return false;
    }
    return true;
};
//# sourceMappingURL=/build/es2019/helpers/is-constructible.js.map