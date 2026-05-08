import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { signOut } from "@/auth"

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-foreground">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="z-10 flex flex-col items-center text-center">
        <div className="mb-6 h-20 w-20 rounded-full bg-primary/20 ring-1 ring-primary/40 flex items-center justify-center overflow-hidden">
          {session.user?.image ? (
            <img src={session.user.image} alt={session.user.name ?? ""} className="h-full w-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-primary">{session.user?.name?.charAt(0)}</span>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Welcome, {session.user?.name}</h1>
        <p className="mt-4 text-muted-foreground">Connected as {session.user?.email}</p>
        
        <div className="mt-10 flex gap-4">
          <form action={async () => {
            "use server"
            await signOut({ redirectTo: "/" })
          }}>
            <Button variant="outline">Sign Out</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
