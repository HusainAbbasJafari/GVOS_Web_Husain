const LengthFormatter = ({ length, showDecimals = false }) => {
    const formatLength = (value) => {
        return new Intl.NumberFormat('en-US', {
            useGrouping: true,
            minimumFractionDigits: showDecimals ? 2 : 0,
            maximumFractionDigits: showDecimals ? 2 : 0,
        }).format(Number(value));
    };
    return <>{formatLength(length)}</>;
};

export default LengthFormatter;