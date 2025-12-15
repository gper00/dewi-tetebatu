import Navbar from "@/components/navbar"
import FooterSection from "@/components/footer-section"
import LoginForm from "./login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 pt-24">
        <LoginForm />
      </main>
      <FooterSection />
    </div>
  )
}
