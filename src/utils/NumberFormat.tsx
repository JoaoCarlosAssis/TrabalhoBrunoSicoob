export default function formatoMonetario(value: number | undefined) {
  const amount = value?.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return amount
}
