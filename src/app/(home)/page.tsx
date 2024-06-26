"use client"

import { DropZone } from '@/components/dnd/drop-zone'

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<DropZone />
		</main>
	)
}
