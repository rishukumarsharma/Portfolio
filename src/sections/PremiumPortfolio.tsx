import { PremiumNav } from '../components/layout';
import { PremiumHero } from './PremiumHero';
import { PremiumContact } from './PremiumContact';
import { PremiumFooter } from './PremiumFooter';
import { About, Work } from './index';

export const PremiumPortfolio = () => {
    return (
        <div className="bg-neutral-950">
            <PremiumNav />
            <PremiumHero />

            {/* Add spacing for fixed nav */}
            <div id="work" className="scroll-mt-20">
                <Work />
            </div>

            <div id="about" className="scroll-mt-20">
                <About />
            </div>

            <div id="services" className="scroll-mt-20 py-24 bg-neutral-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-neutral-50 mb-12 text-center">Services</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {['UX Design', 'Development', 'Consulting'].map((service) => (
                            <div
                                key={service}
                                className="p-8 bg-neutral-800 rounded-xl border border-neutral-700 hover:border-accent-500/50 transition-colors"
                            >
                                <h3 className="text-xl font-semibold text-neutral-50 mb-2">{service}</h3>
                                <p className="text-neutral-400">Creating exceptional digital experiences.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div id="contact" className="scroll-mt-20">
                <PremiumContact />
            </div>

            <PremiumFooter />
        </div>
    );
};

export default PremiumPortfolio;
