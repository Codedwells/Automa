import { cn } from '@/lib/utils'
import { ExternalLink, Menu, Settings, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const MobileNavbar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const modalRef = useRef<HTMLElement | null>(null)

	const handleClickOutside = (event: MouseEvent) => {
		if (
			isOpen &&
			modalRef.current &&
			!modalRef.current.contains(event.target as Node)
		) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	}, [isOpen])

	return (
		<header className='flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-slate-800 md:hidden'>
			<Link href={'/'} className='flex items-center gap-2'>
				<Image
					src='/logo.png'
					width={500}
					height={500}
					alt='logo image'
					className='w-[25px]'
				/>
				<h1 className='text-lg font-semibold tracking-tighter text-gray-900 hover:opacity-90 dark:text-slate-200'>
					Automa
				</h1>
			</Link>
			<span
				className={cn(
					'cursor-pointer select-none text-gray-500 hover:opacity-80 dark:text-slate-500'
				)}
			>
				<Menu onClick={() => setIsOpen((prev) => !prev)} />
			</span>
			{isOpen && (
				<div className='fixed bottom-0 left-0 right-0 top-0 z-10 overflow-hidden bg-black/40'></div>
			)}
			<nav
				ref={modalRef}
				className={cn(
					'transition-width z-20 hidden h-full w-0 flex-col overflow-y-auto rounded border border-gray-200 bg-background duration-300 dark:border-slate-800',
					{
						'fixed bottom-0 left-0 top-0 flex w-64 border-r py-4':
							isOpen
					}
				)}
			>
				<div className='flex items-center justify-between gap-2 px-4'>
					<h1 className='text-lg font-semibold tracking-tighter text-gray-900 hover:opacity-90 dark:text-slate-200'>
						Automa
					</h1>{' '}
					<X
						onClick={() => setIsOpen(false)}
						className='rounded-md border text-gray-700 dark:text-slate-400'
					/>
				</div>
                <hr className='my-4' />


				<ul className='px-4 flex flex-col space-y-4 font-[500] text-gray-700'>
					<li>
						<Link
							className='rounded p-2 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800'
							href='#'
						>
							About
						</Link>
					</li>
					<li>
						<Link
							className='rounded p-2 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800'
							href='#'
						>
							Contact
						</Link>
					</li>
				</ul>

			</nav>
		</header>
	)
}

export default MobileNavbar

export function SimpleMobileNav() {
	const [isOpen, setIsOpen] = useState(false)
	const navRef = useRef<HTMLDivElement | null>(null)

	function handleOutsideClick(e: MouseEvent) {
		if (
			isOpen &&
			navRef.current &&
			!navRef.current.contains(e.target as Node)
		) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleOutsideClick, true)

		return () => {
			document.removeEventListener('click', handleOutsideClick, true)
		}
	}, [isOpen])
	return (
		<header className='flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-slate-800 md:hidden'>
			<Link href={'/'} className='flex items-center gap-2'>
				<Image
					src='/logo.png'
					width={500}
					height={500}
					alt='logo image'
					className='w-[25px]'
				/>
				<h1 className='text-lg font-semibold tracking-tighter text-gray-900 hover:opacity-90 dark:text-slate-200'>
					SimplerDictionary
				</h1>
			</Link>

			<nav className='flex items-center font-[500] text-gray-700'>
				<button
					onClick={() => setIsOpen((prev) => !prev)}
					className='rounded-full bg-gray-100 p-1 dark:bg-slate-900 dark:text-slate-500'
				>
					<Settings />
				</button>
				{isOpen && (
					<div className='fixed bottom-0 left-0 right-0 top-0 z-10 overflow-hidden bg-black/40'></div>
				)}

				<div
					ref={navRef}
					className={cn(
						'fixed left-0 top-0 z-20 hidden h-full w-64  flex-col rounded-none rounded-r-lg border bg-background px-4 pb-12 pt-2 text-gray-700 shadow-none dark:text-slate-200',
						{ flex: isOpen }
					)}
				>
					<div className='flex items-center justify-between gap-2'>
						<h1 className='text-lg font-semibold tracking-tighter text-gray-900 hover:opacity-90 dark:text-slate-200'>
							SimplerDictionary
						</h1>{' '}
						<X
							onClick={() => setIsOpen(false)}
							className='rounded-md border text-gray-700 dark:text-slate-400'
						/>
					</div>
					<Link
						className='mt-4 rounded p-2 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800'
						href='/'
					>
						Home
					</Link>

					<Link
						className='rounded p-2 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800'
						href='/about'
					>
						About
					</Link>
					<Link
						className='rounded p-2 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800'
						href='/contact'
					>
						Contact
					</Link>
					<a
						target='_blank'
						className='flex items-center justify-between rounded p-2 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800'
						href='https://www.patreon.com/heducate'
					>
						Donate
					</a>
					<a
						href='https://simplerml.com/'
						target='_blank'
						className='flex items-center justify-between rounded p-2 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800'
					>
						<span>SimplerMl</span>
						<ExternalLink size={16} />
					</a>
					<a
						href='https://github.com/hassancs91/SimplerLLM'
						target='_blank'
						className='flex items-center justify-between rounded p-2 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800'
					>
						<span>SimplerLLM</span>
						<ExternalLink size={16} />
					</a>
					<a
						href='https://learnwithhasan.com/'
						target='_blank'
						className='flex items-center justify-between rounded p-2 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800'
					>
						<span>Author's Site</span>
						<ExternalLink size={16} />
					</a>
				</div>
			</nav>
		</header>
	)
}
