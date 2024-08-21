import PropTypes from 'prop-types';
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export default function ComboboxDemo({places, onchangefn,loading}) {
  console.log("the places were sent :"+ places);
  console.log( places);
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={!loading&&open} onOpenChange={setOpen} className="-w-full ">
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="-w-full -justify-between"
        >
          {value
            ? places.find((place) => place.name === value)?.name 
            : "Select place..."}
          <ChevronsUpDown className="-ml-2 -h-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="sm:-w-[calc(100vw-200px)] -w-[calc(100vw-100px)] -bg-white">
        <Command className=" -bg-white -w-full">
          <CommandInput placeholder="Search places..."/>
          <CommandList className="-bg-white -overflow-hidden -w-full">
          <CommandEmpty >No Places found.</CommandEmpty>
            <CommandGroup >
              {places.map((place) => (
                <CommandItem
                 className="-w-full"
                  key={place.id}
                  value={place.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    onchangefn("place",currentValue)
                  }}
                >
                  <Check
                    className={cn(
                      "-mr-2 -h-4 -w-4",
                      value === place.name ?"-opacity-100" : "-opacity-0"
                    )}
                  />
                  {place.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
         </Command>

      </PopoverContent>
    </Popover> 
  //   <Command>
  //   <CommandInput placeholder="Type a command or search..." />
  //   <CommandList>
  //     <CommandEmpty>No results found.</CommandEmpty>
  //     <CommandGroup heading="Suggestions">
  //       <CommandItem>Calendar</CommandItem>
  //       <CommandItem>Search Emoji</CommandItem>
  //       <CommandItem>Calculator</CommandItem>
  //     </CommandGroup>
  //     <CommandSeparator />
  //     <CommandGroup heading="Settings">
  //       <CommandItem>Profile</CommandItem>
  //       <CommandItem>Billing</CommandItem>
  //       <CommandItem>Settings</CommandItem>
  //     </CommandGroup>
  //   </CommandList>
  // </Command>
  
  )
}
ComboboxDemo.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
  })).isRequired,
};