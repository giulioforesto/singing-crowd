export const interceptConnections = (original, interceptor) => {
    original.connect = interceptor.connect.bind(interceptor);
    original.disconnect = interceptor.disconnect.bind(interceptor);
    return original;
};
//# sourceMappingURL=/build/es2019/helpers/intercept-connections.js.map