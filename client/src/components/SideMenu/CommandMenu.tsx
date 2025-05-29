import { Command } from 'cmdk'
import { useState, useEffect } from 'react'
import { FiPlus, FiEye, FiLink, FiPhone, FiLogOut } from 'react-icons/fi'

export default function CommandMenu({open, setOpen}: {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const [value, setvalue] = useState("");

  return (
    <Command.Dialog className='fixed inset-0 bg-stone-950/50'
         open={open} 
         onOpenChange={setOpen} 
         label="Global Command Menu">

        <div 
            className='bg-white rounded-lg shadow-xl border-stone-300 border overflow-hidden w-full max-w-lg mx-auto mt-12' 
            onClick={(e) => e.stopPropagation()}>
        <Command.Input 
            className='relative border-b border-stone-300 p-3 text-lg w-full placeholder:text-stone-400 focus:outline-none' 
            placeholder='What do you Need?'
            value={value}
            onValueChange={setvalue}
        />
        <Command.List className='p-3'>
            <Command.Empty>
                No results found for {" "}
                <span className='text-violet-400'>{value}</span>
            </Command.Empty>

            <Command.Group heading="Team" className="text-sm mb-3 text-stone-400">
                <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
                    <FiPlus />
                    Invite Member
                </Command.Item>
                <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
                    <FiEye />
                    See Org Chart
                </Command.Item>
            </Command.Group>

            <Command.Group
                heading="Integrations"
                className="text-sm text-stone-400 mb-3"
            >
                <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
                    <FiLink />
                    Link Services
                </Command.Item>
                <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
                    <FiPhone />
                    Contact Support
                </Command.Item>
            </Command.Group>

            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-50 hover:bg-stone-700 bg-stone-950 rounded items-center gap-2">
                <FiLogOut />Sign Out
            </Command.Item>
        </Command.List>
        </div>

    </Command.Dialog>
  )
}