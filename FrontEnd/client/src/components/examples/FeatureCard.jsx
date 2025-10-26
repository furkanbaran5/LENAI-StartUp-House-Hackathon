import FeatureCardComponent from '../FeatureCard'
import { Target } from 'lucide-react'

export default function FeatureCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <FeatureCardComponent
        icon={Target}
        title="Akıllı Hedefleme"
        description="Yapay zeka ile hedef kitlenizi analiz eder ve en uygun demografiyi belirler."
      />
    </div>
  )
}
