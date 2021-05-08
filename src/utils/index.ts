export const getLocale = (amount: number): string => {
    return amount ? amount.toLocaleString("th-TH") : "0";
};