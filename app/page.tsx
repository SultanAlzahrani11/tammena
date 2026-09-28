import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'
import { AnalyticsPreview } from '@/components/landing/analytics-preview'
import { CtaSection } from '@/components/landing/cta-section'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AnalyticsPreview />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
