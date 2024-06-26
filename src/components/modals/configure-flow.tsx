import {
	Credenza,
	CredenzaBody,
	CredenzaClose,
	CredenzaContent,
	CredenzaDescription,
	CredenzaFooter,
	CredenzaHeader,
	CredenzaTitle,
	CredenzaTrigger
} from '@/components/ui/credenza'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

type ConfigureFlowProps = {
	children: React.ReactNode
	image: string
	id: string
	name: string
}

export default function ConfigureFlow({
	children,
	image,
	id,
	name
}: ConfigureFlowProps) {
	return (
		<Credenza>
			<CredenzaTrigger asChild>{children}</CredenzaTrigger>
			<CredenzaContent>
				<CredenzaHeader className='flex flex-row items-center gap-2'>
					<Image
						src={image}
						alt='logo'
						width={210}
						height={210}
						draggable={false}
						className='w-[3rem] select-none rounded-full border-2 hover:border-gray-400 hover:opacity-80'
					/>
					<div>
						<CredenzaTitle className='capitalize'>
							{name}
						</CredenzaTitle>
						<CredenzaDescription>
							Configure your workflow here.
						</CredenzaDescription>
					</div>
				</CredenzaHeader>
				<CredenzaBody>
					<div className='flex mt-4 items-center gap-2'>
						<Input placeholder='https://api.myapp.com/api/v1/resource' />
						<Button>Add</Button>
					</div>
					<div className='mt-4'>
						<h1 className='text-lg font-semibold text-blue-950'>
							Endpoints
						</h1>
						<p className='text-xs text-muted-foreground'>
							Here are the configured endpoints for this workflow.
						</p>
					</div>
				</CredenzaBody>
			</CredenzaContent>
		</Credenza>
	)
}
