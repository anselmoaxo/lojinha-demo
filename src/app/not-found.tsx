import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell py-24 text-center">
      <h1 className="type-title">Página não encontrada</h1>
      <Link href="/" className="btn btn-cacau mt-8">Voltar para a loja</Link>
    </section>
  );
}
