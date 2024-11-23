import React from 'react';
import Quiz from '../components/Quiz';

export default function Home() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Which Vitamins Should I Take? - Quiz</h1>
        <Quiz />
      </section>

      <section id="guide" className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose lg:prose-lg mx-auto">
          <div className="mb-8">
            <p className="text-lg">
              If you're wondering, <strong>"Which vitamins should I take?"</strong>, you're not alone! Choosing the right vitamins can be overwhelming with so many options available. From basic multivitamins to specialized supplements, finding the best vitamins for your needs requires careful consideration. But don't worry – we've got you covered! Our interactive <strong>Which Vitamins Should I Take? Quiz</strong> will help you narrow down your choices and find the ideal supplements for your health goals.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Take the "Which Vitamins Should I Take?" Quiz?</h2>
            <p>
              With countless supplements on the market, deciding on the right ones can feel overwhelming. Whether you need immune support, energy boosters, or specific nutrients, our <strong>Which Vitamins Should I Take? Quiz</strong> is designed to match you with supplements that fit your lifestyle, budget, and health requirements.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Factors Our Quiz Considers</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Health Goals:</strong> Immunity, energy, bone health, or heart health</li>
              <li><strong>Dietary Preferences:</strong> Vegan, vegetarian, or specific restrictions</li>
              <li><strong>Lifestyle:</strong> Activity level, stress, and sleep patterns</li>
              <li><strong>Budget:</strong> Find quality supplements within your price range</li>
              <li><strong>Form Preferences:</strong> Tablets, capsules, gummies, or liquids</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Vitamin Categories</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Best for Immunity:</strong> Vitamin C, D3, and Zinc combinations</li>
              <li><strong>Best for Energy:</strong> B-complex vitamins and Iron supplements</li>
              <li><strong>Best for Daily Health:</strong> Comprehensive multivitamins</li>
              <li><strong>Best for Specific Needs:</strong> Targeted supplements for unique requirements</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How the "Which Vitamins Should I Take?" Quiz Works</h2>
            <p>
              Taking our quiz is quick and easy! Simply answer a few questions about your health goals, dietary preferences, and budget, and we'll recommend the best vitamins for you. Our recommendations are based on scientific research and expert knowledge.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Expert Vitamin Selection Tips</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Quality Matters:</strong> Look for third-party tested supplements</li>
              <li><strong>Form Matters:</strong> Choose forms that you'll actually take regularly</li>
              <li><strong>Absorption:</strong> Consider bioavailability and proper combinations</li>
              <li><strong>Timing:</strong> Learn the best time to take each supplement</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Trust Our Vitamin Recommendations?</h2>
            <p>
              Our team consists of nutrition experts and health professionals who stay up-to-date with the latest research and supplement developments. We regularly update our <strong>Which Vitamins Should I Take? Quiz</strong> to include new products and scientific findings, ensuring you get the most current recommendations.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Find Your Perfect Vitamins?</h2>
            <p>
              Don't waste hours researching – let our <strong>Which Vitamins Should I Take? Quiz</strong> guide you to the right supplements. Whether you're just starting your health journey or looking to optimize your supplement routine, we'll help you make an informed decision.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}