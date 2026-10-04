import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-shell py-24 text-center">
      <h1 className="display-title">Página não encontrada</h1>
      <Link href="/" className="button-primary mt-8">Voltar para a loja</Link>
    </section>
  );
}
