'use client'
import { FC, useCallback, useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/Command"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Prisma, Thread } from "@prisma/client"
import { useRouter } from "next/navigation"
import { Users } from "lucide-react"
import debounce from "lodash.debounce"

interface SearchBarProps {
    
}
 
const SearchBar: FC<SearchBarProps> = () => {
    const [input, setInput] = useState<string>('')

   

    const {
        data: queryResults,
        refetch,
        isFetched,
        isFetching,
    } = useQuery({
        queryFn: async () => {
            if(!input) return []
            const {data} = await axios.get(`api/search?q=${input}`)
            return data as (Thread & {
                _count: Prisma.ThreadCountOutputType
            })[]
        },
        queryKey: ['search-query'],
        enabled: false,
    })
    //delay for search request  (async?? aparently needed)
    const request = debounce(async () => {
        refetch()
    }, 400)

    const debounceRequest = useCallback(() => {
        request()
    }, [])

    const router = useRouter()

    return (
    <Command className="relative rounded-lg border max-w-lg z-50 overflow-visible">
        <CommandInput 
            isLoading={isFetching}
            value={input}
            onValueChange={(text) => {
                setInput(text)
                debounceRequest()
            }}
            className="outline-none boreder-none focus:border-none focus:outline-none ring-0"
            placeholder="Search communities"
        />

        {input.length > 0 ? (
            <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
                {isFetched && <CommandEmpty>no results found.</CommandEmpty>}
                {(queryResults?.length ?? 0) > 0 ? (
                    <CommandGroup heading='Comunities'>
                        {queryResults?.map((thread) => (
                            <CommandItem onSelect={(e) => {
                                router.push(`/f/${e}`)
                                router.refresh()
                            }}
                            key={thread.id}
                            value={thread.name}>
                            <Users className='mr-2 h-4 w-4'/>
                            <a href={`/f/${thread.name}`}>f/{thread.name}</a>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                ): null}

            </CommandList>
        ): null}
            

        
    </Command>  
    )
}

export default SearchBar