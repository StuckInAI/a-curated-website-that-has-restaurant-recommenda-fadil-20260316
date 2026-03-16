import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero */}
      <section className="bg-gradient-to-b from-dark-800 to-dark-900 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">Our Philosophy</span>
            <div className="h-px w-8 bg-gold-500" />
          </div>
          <h1 className="text-5xl font-serif font-light text-white mb-6">The Art of Curation</h1>
          <p className="text-xl text-dark-300 leading-relaxed">
            In a world drowning in choice, we believe the most valuable thing we can offer
            is a thoughtful, rigorous, and honest point of view.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg prose-invert max-w-none">
          <div className="space-y-12">
            <div className="border-l-2 border-gold-500 pl-8">
              <h2 className="text-2xl font-serif text-white mb-4">Why we exist</h2>
              <p className="text-dark-300 leading-relaxed">
                The internet has given us infinite access to reviews, rankings, and recommendations —
                and in doing so, has made the signal-to-noise ratio nearly unbearable. Sponsored posts
                masquerade as honest opinions. Affiliate incentives distort recommendations. The loudest
                voices aren&apos;t always the most knowledgeable.
              </p>
              <p className="text-dark-300 leading-relaxed mt-4">
                We exist because there is a better way. We spend months with each item we recommend.
                We seek out the people who have dedicated their lives to understanding these categories.
                We have no commercial relationships with any brand we feature.
              </p>
            </div>

            <div className="border-l-2 border-gold-500 pl-8">
              <h2 className="text-2xl font-serif text-white mb-4">Our standards</h2>
              <p className="text-dark-300 leading-relaxed">
                Every item on this site meets three criteria: it must be exceptional at its
                primary function, it must justify its price against available alternatives, and
                it must have stood the test of time — or show every indication of doing so.
              </p>
              <p className="text-dark-300 leading-relaxed mt-4">
                We deliberately curate a small number of items per category. If we can&apos;t recommend
                it wholeheartedly, it doesn&apos;t appear here. We would rather show you ten things we
                believe in absolutely than a hundred things we are ambivalent about.
              </p>
            </div>

            <div className="border-l-2 border-gold-500 pl-8">
              <h2 className="text-2xl font-serif text-white mb-4">The categories we cover</h2>
              <p className="text-dark-300 leading-relaxed">
                Our five areas — fine dining, high-end audio, luxury watches, curated tech, and
                fine spirits — are not arbitrary. They are the domains where the difference
                between the merely good and the truly exceptional is most pronounced, and where
                the investment in quality pays the highest dividends in lived experience.
              </p>
              <p className="text-dark-300 leading-relaxed mt-4">
                A great meal engages every sense and creates memories that outlast almost any
                material possession. A superlative audio system transforms how you experience
                music for the rest of your life. A mechanical watch connects you to a tradition
                of human ingenuity that predates the industrial revolution.
              </p>
            </div>

            <div className="border-l-2 border-gold-500 pl-8">
              <h2 className="text-2xl font-serif text-white mb-4">What we are not</h2>
              <p className="text-dark-300 leading-relaxed">
                We are not a shopping aggregator. We are not an affiliate marketing operation.
                We do not accept payment for placement. We do not feature items we have not
                personally assessed, or that have not been extensively validated by the small
                community of genuine experts we trust.
              </p>
              <p className="text-dark-300 leading-relaxed mt-4">
                If you find an item here that you disagree with, we want to hear from you.
                Our recommendations are held opinions, not advertisements, and they are
                subject to revision in the face of compelling evidence.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 hover:border-gold-400/60 text-gold-400 hover:text-gold-300 px-8 py-3 rounded-full transition-all duration-200"
          >
            ← Back to recommendations
          </Link>
        </div>
      </section>
    </div>
  );
}
