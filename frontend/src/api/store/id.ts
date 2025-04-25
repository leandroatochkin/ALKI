let storedId: string | null = null

export const setId = (id: string) => {
    storedId = id
}

export const getUserId = () => storedId
