export const getGreetingOfDay = (): string => {
  const myDate = new Date();
  const hrs = myDate.getHours();
  let greet = "";

  if (hrs < 12) {
    greet = "Good Morning ☀️";
  } else if (hrs >= 12 && hrs <= 17) {
    greet = "Good Afternoon 🌤️";
  } else if (hrs >= 17 && hrs <= 24) {
    greet = "Good Evening 🌙";
  }
  return greet;
};

export function formatAmount(
  x: string | number | null,
  _currency: boolean | string = true,
): string {
  if (x === null) {
    return "";
  }
  const getCurrency = () => {
    switch (true) {
      case _currency === true:
        return "₦";

      case typeof _currency === "string":
        return _currency;

      default:
        return "";
    }
  };

  const currency = getCurrency();
  let amount = `${x}`;
  const isComma = Boolean(amount.split(",").length);
  amount = isNaN(parseInt(amount[0], 10)) ? amount.slice(1) : amount;
  amount = isComma ? amount.split(",").join("") : amount;
  const intAmount = amount.split(".")?.[0];
  const decAmount = amount.split(".")?.[1];

  return parseInt(intAmount, 10) === 0
    ? `${currency}0.${decAmount ?? "00"}`
    : `${currency}${intAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${
        decAmount ? "." + decAmount : ""
      }`; //
}
