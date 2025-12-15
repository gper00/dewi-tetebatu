import Navbar from "@/components/navbar"
import FooterSection from "@/components/footer-section"
import RegisterForm from "./register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 pt-24">
        <RegisterForm />
      </main>
      <FooterSection />
    </div>
  )
}
