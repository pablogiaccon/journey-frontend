export default function ErrorPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="text-center max-w-3xl w-full px-6 space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Página não encontrada!</p>
          <a href="/">Voltar para home!</a>
        </div>
      </div>
    </div>
  );
}
