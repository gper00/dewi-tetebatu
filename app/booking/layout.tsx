import FooterSection from "@/components/footer-section"

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <FooterSection />
    </>
  )
}
