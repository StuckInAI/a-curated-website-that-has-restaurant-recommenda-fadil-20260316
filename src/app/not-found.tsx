import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-6">✨</div>
        <h1 className="text-4xl font-serif text-white mb-4">Page not found</h1>
        <p className="text-dark-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-dark-900 font-semibold px-8 py-3 rounded-full transition-all"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
