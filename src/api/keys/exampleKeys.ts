export const exampleKeys = {
	all: ['exampleKeys'] as const,
	lists: () => [...exampleKeys.all, 'list'] as const,
	list: (search?: string, filters?: any) => [...exampleKeys.lists(), { search, filters }] as const,
	details: () => [...exampleKeys.all, 'detail'] as const,
	detail: (id: number) => [...exampleKeys.details(), id] as const
}
