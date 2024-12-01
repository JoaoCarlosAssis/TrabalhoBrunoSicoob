export default function FormatDate(inputDate: string) {
  if (!inputDate) return null; // Verifica se o input é válido

  const date = new Date(inputDate); // Cria um objeto Date com o input

  const year = date.getFullYear(); // Obtém o ano
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Obtém o mês (adicionando zero à esquerda se necessário)
  const day = String(date.getDate()).padStart(2, "0"); // Obtém o dia (adicionando zero à esquerda se necessário)

  return `${year}-${month}-${day}`; // Retorna no formato yyyy-mm-dd
}
