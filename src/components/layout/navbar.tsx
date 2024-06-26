'use client'

import Image from 'next/image'
import Link from 'next/link'
import MobileNavbar from './mobilenav'

function Navbar() {
	return (
		<>
			<MobileNavbar />
			<header className='hidden lg:px-32 items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-slate-800 md:flex'>
				<Link href={'/'} className='flex items-center gap-2'>
					<Image
						src='/logo.png'
						width={500}
						height={500}
						alt='logo image'
						className='w-[30px]'
					/>
					<h1 className='text-xl font-semibold text-gray-900 hover:opacity-90 dark:text-slate-200'>
						Automa
					</h1>
				</Link>
				<nav>
					<ul className='flex space-x-2 text-sm'>
						<li>
							<Link
								className='rounded uppercase p-2 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800'
								href='/'
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								className='rounded p-2 uppercase hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800'
								href='#'
							>
								About
							</Link>
						</li>
						<li>
							<Link
								className='rounded p-2 uppercase hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800'
								href='#'
							>
								Contact
							</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	)
}

export default Navbar
