import { Leaf, Users, MapPin } from 'lucide-react'

export default function AboutSection() {
  const features = [
    {
      icon: Leaf,
      title: 'Ramah Lingkungan',
      description: 'Komitmen pelestarian alam dan ekosistem Gunung Rinjani',
    },
    {
      icon: Users,
      title: 'Pemandu Lokal',
      description: 'Tim profesional yang mengenal setiap cerita dan tradisi desa',
    },
    {
      icon: MapPin,
      title: 'Lokasi Strategis',
      description: 'Ketinggian 700 MDPL dengan pemandangan alam yang spektakuler',
    },
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://jadesta.kemenparekraf.go.id/imgpost/112059.jpg"
                alt="Tetebatu Homestay"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div>
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">
              Sekilas Tentang Tetebatu
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Desa Wisata Tetebatu terletak di Kecamatan Sikur, Kabupaten Lombok Timur dengan ketinggian 700 meter di atas permukaan laut. Desa yang mewakili Indonesia di World Best Tourism Village UNWTO 2021 ini menawarkan pengalaman wisata autentik yang mencerminkan keaslian pedesaan dengan tradisi bertani, kearifan lokal gotong royong, dan budaya masyarakat yang masih kuat terjaga.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              Setiap kunjungan Anda berkontribusi langsung pada pemberdayaan ekonomi dan pelestarian budaya masyarakat lokal Tetebatu.
            </p>

            {/* Features Grid */}
            <div className="space-y-4">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-100">
                        <Icon className="h-6 w-6 text-emerald-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{feature.title}</h3>
                      <p className="text-slate-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
