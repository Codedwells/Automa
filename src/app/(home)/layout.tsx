import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='flex flex-col max-w-screen min-h-screen antialiased '>
			<Navbar />
			{children}
            <Footer />
		</main>
	)
}

export default Layout
