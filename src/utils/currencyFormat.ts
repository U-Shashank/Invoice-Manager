
const formatCurrency = ({ amount, currency }: { amount: number, currency: "INR" | "USD" | "EUR" }) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency
    }).format(amount)
}

export { formatCurrency }