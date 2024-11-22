import { exampleKeys } from '../keys/exampleKeys'

// eslint-disable-next-line import/prefer-default-export
export const getExampleQueryOptions = () => {
	return {
		queryKey: exampleKeys.lists(),
		queryFn: async () => {
			/*

      // Questa è la chiamata vera e propria che viene consumata
      const res = await getAuthorizationsParamsAuthorizationsparamsGroupIdGet({
        path: { groupId: Number(groupId) }
      })

      // Da inserire per gestire l'errore in maniera globale
      if (res.error) {
        // @ts-ignore
        throw new Error(res.error?.error_code ? res.error?.error_code : res.error?.message)
      }

      return res.data
       */
		},
		staleTime: 5000
	}
}
