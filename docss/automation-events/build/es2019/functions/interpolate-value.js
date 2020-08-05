export const interpolateValue = (values, theoreticIndex) => {
    const lowerIndex = Math.floor(theoreticIndex);
    const upperIndex = Math.ceil(theoreticIndex);
    if (lowerIndex === upperIndex) {
        return values[lowerIndex];
    }
    return (1 - (theoreticIndex - lowerIndex)) * values[lowerIndex] + (1 - (upperIndex - theoreticIndex)) * values[upperIndex];
};
//# sourceMappingURL=/build/es2019/functions/interpolate-value.js.map