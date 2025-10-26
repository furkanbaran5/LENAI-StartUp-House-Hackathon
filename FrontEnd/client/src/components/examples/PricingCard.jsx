import PricingCardComponent from '../PricingCard'

export default function PricingCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <PricingCardComponent
        name="Profesyonel Paket"
        price={50}
        features={[
          "10 Reklam Kampanyası",
          "7/24 Destek",
          "Gelişmiş AI Hedefleme"
        ]}
        popular={true}
        onPurchase={() => console.log('Purchase clicked')}
      />
    </div>
  )
}
